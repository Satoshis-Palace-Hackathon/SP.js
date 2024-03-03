import { SecretNetworkClient } from "secretjs";
import { Deployment } from "../Deployment"
import { CodeInfo, ContractInfo } from "../../modules/shared/contract/types";
import { Contract, readContractCode } from "../../modules/shared";
import { InstantiateMsg } from "../../modules/snip20/types";
import { Snip20, Snip20Factory } from "../../modules/snip20/Snip20";
import { SNIP20_CONTRACT_CODE_PATH, SNIP20_INFO_FILE_PATH } from "./constants";

import { contractInfo as snip20Info } from '../artifacts/snip20-info';

export interface Snip20DeploymentOptions {
	updateCurrent?: boolean, //Assumes false if not passed
}

export class Snip20Deployment extends Deployment<Snip20, Snip20Factory> {
	contractWasm: Buffer = readContractCode(SNIP20_CONTRACT_CODE_PATH);
	constructor(secretjs: SecretNetworkClient) {
		super(secretjs, new Snip20Factory(secretjs));
	}

	public async deployContract(options: Snip20DeploymentOptions): Promise<Snip20> {
		const initMsg: InstantiateMsg = await this.getInitMsg()
		const snip20: Snip20 = await this.contractFactory.createSnip20(initMsg, this.contractWasm);

		if (options.updateCurrent) {
			this.writeContractInfo(SNIP20_INFO_FILE_PATH, snip20.getContractInfo());
		}
		return snip20;
	}

	public async deploySnip20AndMints(num: number): Promise<Snip20[]> {
		const snip20s: Snip20[] = [];
		let initMsg: InstantiateMsg;

		for (let i = 0; i < num; i++) {
			initMsg = await this.getInitMsg(); // Assuming this method generates a new initMsg for each contract

			// For the first contract, upload the Wasm and instantiate
			if (i === 0) {
				const snip20: Snip20 = await this.contractFactory.createSnip20(initMsg, this.contractWasm);
				snip20s.push(snip20);
			} else {
				// For subsequent contracts, reuse the last uploaded code
				const contractInfo: ContractInfo = await this.contractFactory.instantiateFromLastCode<InstantiateMsg>(initMsg);
				const snip20 = new Snip20(contractInfo, this.secretjs)
				snip20s.push(snip20);
			}
		}

		return snip20s;
	}

	public getCurrentDeployment(): Snip20 {
		return new Snip20(snip20Info, this.secretjs);
	}

	public async uploadSnip20Code(): Promise<CodeInfo> {
		const contractWasm = readContractCode(SNIP20_CONTRACT_CODE_PATH);
		return await Contract.upload_contract(this.secretjs, contractWasm);
	}

	private async getInitMsg(): Promise<InstantiateMsg> {
		const initMsg: InstantiateMsg = {
			name: 'USD',
			symbol: 'USD',
			decimals: 18,
			prng_seed: await Contract.generateEntropy(),
			admin: null,
			initial_balances: null,
			config: {
				public_total_supply: true,
				enable_mint: true,
				enable_burn: true,
			},
			supported_denoms: null
		};
		return initMsg
	}
}