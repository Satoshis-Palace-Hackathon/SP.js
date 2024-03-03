import { SecretNetworkClient } from "secretjs";
import { ContractInfo } from "../../../modules/shared/contract/types";
import { Contract, readContractCode } from "../../../modules/shared";
import { ROUTER_INFO_FILE_PATH, ROUTER_CONTRACT_CODE_PATH } from "../constants";
import { contractInfo as routerInfo } from '../../artifacts/shade/router-info';
import { Deployment } from "../../../deployment/Deployment";
import { Router, RouterFactory } from "../../../modules/shade";
import { InitMsg } from "../../../modules/shade/router/types";


export interface RouterDeploymentOptions {
	admin_auth: ContractInfo,
	api_key?: string,
	updateCurrent?: boolean, //Assumes false if not passed
}

export class RouterDeployment extends Deployment<Router, RouterFactory> {
	constructor(secretjs: SecretNetworkClient) {
		super(secretjs, new RouterFactory(secretjs));
	}

	public async deployContract(options: RouterDeploymentOptions): Promise<Router> {
		const initMsg: InitMsg = {
			admin_auth: options.admin_auth,
			entropy: await Contract.generateEntropy(),
			prng_seed: await Contract.generateEntropy()
		}; // Initialize your InstantiateMsg here

		const contractWasm = readContractCode(ROUTER_CONTRACT_CODE_PATH);
		const router: Router = await this.contractFactory.createRouterContract(initMsg, contractWasm);
		if (options.updateCurrent) {
			this.writeContractInfo(ROUTER_INFO_FILE_PATH, router.getContractInfo());
		}
		return router;
	}

	public getCurrentDeployment(): Router {
		return new Router(routerInfo, this.secretjs);
	}
}