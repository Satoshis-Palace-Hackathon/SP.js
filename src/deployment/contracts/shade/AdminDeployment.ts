import { SecretNetworkClient } from "secretjs";
import { CodeInfo } from "../../../modules/shared/contract/types";
import { Contract, readContractCode } from "../../../modules/shared";
import { ADMIN_CONTRACT_CODE_PATH, ADMIN_INFO_FILE_PATH } from "../constants";
import { Deployment } from "../../../deployment/Deployment";
import { Admin, AdminFactory } from "../../../modules/shade/admin/Admin";
import { InstantiateMsg } from "../../../modules/shade/admin/types";
import { contractInfo as AdminContractInfo } from "../../artifacts/shade/admin-info"

export interface AdminDeploymentOptions {
	updateCurrent?: boolean, //Assumes false if not passed
}

export class AdminDeployment extends Deployment<Admin, AdminFactory> {
	constructor(secretjs: SecretNetworkClient) {
		super(secretjs, new AdminFactory(secretjs));
	}

	public async deployContract(options: AdminDeploymentOptions): Promise<Admin> {
		const contractWasm = readContractCode(ADMIN_CONTRACT_CODE_PATH);

		const initMsg: InstantiateMsg = {};

		const admin: Admin = await this.contractFactory.createAdminContract(initMsg, contractWasm);

		if (options.updateCurrent) {
			this.writeContractInfo(ADMIN_INFO_FILE_PATH, admin.getContractInfo());
		}
		return admin;
	}

	public getCurrentDeployment(): Admin {
		return new Admin(AdminContractInfo, this.secretjs);
	}

	public static async uploadAMMPairCode(secretjs: SecretNetworkClient): Promise<CodeInfo> {
		const contractWasm = readContractCode(ADMIN_INFO_FILE_PATH);
		return await Contract.upload_contract(secretjs, contractWasm);
	}
}