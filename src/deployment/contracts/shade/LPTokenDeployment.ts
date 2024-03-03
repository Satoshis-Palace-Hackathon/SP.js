import { SecretNetworkClient } from "secretjs";
import { CodeInfo } from "../../../modules/shared/contract/types";
import { Contract, readContractCode } from "../../../modules/shared";
import { LP_TOKEN_CONTRACT_CODE_PATH } from "./../constants";

export class LPTokenDeployment {
	public static async uploadLPTokenCode(secretjs: SecretNetworkClient): Promise<CodeInfo> {
		const contractWasm = readContractCode(LP_TOKEN_CONTRACT_CODE_PATH);
		return await Contract.upload_contract(secretjs, contractWasm);
	}
}