import { SecretNetworkClient } from "secretjs";
import { CodeInfo, ContractInfo } from "../../../modules/shared/contract/types";
import { Contract, readContractCode } from "../../../modules/shared";
import { FACTORY_INFO_FILE_PATH, FACTORY_CONTRACT_CODE_PATH } from "../constants";
import { contractInfo as factoryInfo } from '../../artifacts/shade/factory-info';
import { Deployment } from "../../../deployment/Deployment";
import { FactoryFactory, Factory } from "../../../modules/shade/factory/Factory";
import { InitMsg } from "../../../modules/shade/factory/types";
import { LPTokenDeployment } from "./LPTokenDeployment";
import { AmmPairDeployment } from "./AmmPairDeployment";

export interface FactoryDeploymentOptions {
	admin_auth: ContractInfo,
	api_key?: string,
	updateCurrent?: boolean, //Assumes false if not passed
}

export class FactoryDeployment extends Deployment<Factory, FactoryFactory> {
	constructor(secretjs: SecretNetworkClient) {
		super(secretjs, new FactoryFactory(secretjs));
	}

	public async deployContract(options: FactoryDeploymentOptions): Promise<Factory> {
		const lp_token: CodeInfo = await LPTokenDeployment.uploadLPTokenCode(this.secretjs)
		const amm_pair: CodeInfo = await AmmPairDeployment.uploadAMMPairCode(this.secretjs)


		const initMsg: InitMsg = {
			admin_auth: options.admin_auth,
			amm_settings: {
				lp_fee: {
					denom: 100,
					nom: 1
				},
				shade_dao_address: {
					code_hash: this.secretjs.address, // Hopfully they dont notice this is not a contract
					address: this.secretjs.address
				},
				shade_dao_fee: {
					denom: 100,
					nom: 1
				}
			},
			api_key: options.api_key ? options.api_key : "",
			lp_token_contract: {
				code_hash: lp_token.contractCodeHash,
				id: parseInt(lp_token.codeId)
			},
			pair_contract: {
				code_hash: amm_pair.contractCodeHash,
				id: parseInt(amm_pair.codeId)
			},
			prng_seed: await Contract.generateEntropy()
		}; // Initialize your InstantiateMsg here

		const contractWasm = readContractCode(FACTORY_CONTRACT_CODE_PATH);
		const factory: Factory = await this.contractFactory.createFactoryContract(initMsg, contractWasm);
		if (options.updateCurrent) {
			this.writeContractInfo(FACTORY_INFO_FILE_PATH, factory.getContractInfo());
		}
		return factory;
	}

	public getCurrentDeployment(): Factory {
		return new Factory(factoryInfo, this.secretjs);
	}
}