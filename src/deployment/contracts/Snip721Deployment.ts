import { SecretNetworkClient } from "secretjs";
import { Deployment } from "../Deployment"
import { ContractInfo } from "../../modules/shared/contract/types";
import { readContractCode } from "../../modules/shared";
import { InstantiateMsg } from "../../modules/snip721/types";
import { Snip721, Snip721Factory } from "../../modules/snip721/Snip721";
import { SNIP721_CONTRACT_CODE_PATH, SNIP721_INFO_FILE_PATH } from "./constants";

import { contractInfo as snip721Info } from '../artifacts/snip721-info';

export interface Snip721DeploymentOptions {
	updateCurrent?: boolean, //Assumes false if not passed
}

export class Snip721Deployment extends Deployment<Snip721, Snip721Factory> {

	constructor(secretjs: SecretNetworkClient) {
		super(secretjs, new Snip721Factory(secretjs));
	}

	public async deployContract(options: Snip721DeploymentOptions): Promise<Snip721> {
		const contractWasm = readContractCode(SNIP721_CONTRACT_CODE_PATH);

		const initMsg: InstantiateMsg = {
			entropy: 'fghnsdfgjnhsfgjmnsfgjhnxcvghjnsfhjnfdbhg',
			name: 'TEST',
			symbol: 'TST'
		};

		const snip721: Snip721 = await this.contractFactory.createSnip721(initMsg, contractWasm);

		if (options.updateCurrent) {
			this.writeContractInfo(SNIP721_INFO_FILE_PATH, snip721.getContractInfo());
		}
		return snip721;
	}

	public getCurrentDeployment(): Snip721 {
		return new Snip721(snip721Info, this.secretjs);
	}

}