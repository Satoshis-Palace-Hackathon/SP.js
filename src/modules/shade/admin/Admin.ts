import { SecretNetworkClient } from "secretjs";

import { Contract, ContractFactory, ContractInfo } from "../../shared/contract";
import { ExecuteMsg, InstantiateMsg, QueryMsg, QueryMsgResponse } from "./types";



export class Admin extends Contract<ExecuteMsg, QueryMsg, QueryMsgResponse> {
	constructor(routerInfo: ContractInfo, secretjs: SecretNetworkClient) {
		super(routerInfo.address, routerInfo.code_hash, secretjs);
	}
}

export class AdminFactory extends ContractFactory {

	async createAdminContract(initMsg: InstantiateMsg, contractWasm: Buffer): Promise<Admin> {
		const contractInfo: ContractInfo = await this.createContract<InstantiateMsg>(initMsg, contractWasm)

		return new Admin(contractInfo, this.secretjs);
	}
}