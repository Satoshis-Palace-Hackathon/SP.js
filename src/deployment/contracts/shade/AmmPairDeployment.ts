import { SecretNetworkClient } from "secretjs";
import { CodeInfo, ContractInfo } from "../../../modules/shared/contract/types";
import { Contract, readContractCode } from "../../../modules/shared";
import { AMM_PAIR_INFO_FILE_PATH, AMM_PAIR_CONTRACT_CODE_PATH } from "../constants";
import { contractInfo as ammPairInfo } from '../../artifacts/shade/amm_pair-info';
import { Deployment } from "../../../deployment/Deployment";
import { AmmPair, AmmPairFactory } from "../../../modules/shade/amm_pair/AmmPair";
import { InitMsg } from "../../../modules/shade/amm_pair/types";
import { LPTokenDeployment } from "./LPTokenDeployment";

export interface AmmPairDeploymentOptions {
	token1: ContractInfo,
	token2: ContractInfo,
	admin_auth: ContractInfo,
	updateCurrent?: boolean, //Assumes false if not passed
}

export class AmmPairDeployment extends Deployment<AmmPair, AmmPairFactory> {
	constructor(secretjs: SecretNetworkClient) {
		super(secretjs, new AmmPairFactory(secretjs));
	}

	public async deployContract(options: AmmPairDeploymentOptions): Promise<AmmPair> {
		const contractWasm = readContractCode(AMM_PAIR_CONTRACT_CODE_PATH);
		const lp_token: CodeInfo = await LPTokenDeployment.uploadLPTokenCode(this.secretjs)


		const initMsg: InitMsg = {
			custom_fee: {
				lp_fee: {
					denom: 0,
					nom: 0
				},
				shade_dao_fee: {
					denom: 0,
					nom: 0
				}
			},
			admin_auth: options.admin_auth,
			entropy: await Contract.generateEntropy(),
			lp_token_contract: {
				code_hash: lp_token.contractCodeHash,
				id: parseInt(lp_token.codeId),
			},
			lp_token_decimals: 18,
			pair: [
				{
					custom_token: {
						contract_addr: options.token1.address,
						token_code_hash: options.token1.code_hash
					}
				},
				{
					custom_token: {
						contract_addr: options.token2.address,
						token_code_hash: options.token2.code_hash
					}
				}
			],
			prng_seed: await Contract.generateEntropy()
		}; // Initialize your InstantiateMsg here

		const ammPair: AmmPair = await this.contractFactory.createAmmPairContract(initMsg, contractWasm);

		if (options.updateCurrent) {
			this.writeContractInfo(AMM_PAIR_INFO_FILE_PATH, ammPair.getContractInfo());
		}
		return ammPair;
	}

	public getCurrentDeployment(): AmmPair {
		return new AmmPair(ammPairInfo, this.secretjs);
	}

	public static async uploadAMMPairCode(secretjs: SecretNetworkClient): Promise<CodeInfo> {
		const contractWasm = readContractCode(AMM_PAIR_CONTRACT_CODE_PATH);
		return await Contract.upload_contract(secretjs, contractWasm);
	}
}