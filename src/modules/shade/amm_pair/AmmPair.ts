import { SecretNetworkClient, TxResponse } from "secretjs";

import { Addr, Contract, ContractFactory, ContractInfo } from "../../shared/contract";
import { Add_liquidity_to_a_m_m_contract_msg, ExecuteMsg, Get_pair_info_msg, Get_pair_info_response, InitMsg, QueryMsg, QueryMsgResponse } from "./types";
import { TokenPair } from "../common_types";
import { PairConfig, PairInfo, TokensConfig, parsePairInfo, queryPairConfig } from "@shadeprotocol/shadejs";
import { Snip20 } from "../../snip20";

export class AmmPair extends Contract<ExecuteMsg, QueryMsg, QueryMsgResponse> {
	constructor(ammPairInfo: ContractInfo, secretjs: SecretNetworkClient) {
		super(ammPairInfo.address, ammPairInfo.code_hash, secretjs);
	}

	async get_pair_info(): Promise<Get_pair_info_response> {
		const query: Get_pair_info_msg = {
			get_pair_info: {}
		}
		return (await this.query(query)) as Get_pair_info_response
	}

	async getTokenPair(): Promise<TokenPair> {
		const pair_info = await this.get_pair_info()
		return pair_info.get_pair_info.pair
	}

	async getSnip20s(): Promise<Snip20[]> {
		const tokenPair = await this.getTokenPair();
		return Promise.all(tokenPair.map(async (tokenType) => {
			if ('custom_token' in tokenType) {
				// Create a new Snip20 instance for the custom token
				return new Snip20({
					address: tokenType.custom_token.contract_addr,
					code_hash: tokenType.custom_token.token_code_hash,
				}, this.getSecretjs());
			} else if ('native_token' in tokenType) {
				// Placeholder for handling native tokens if necessary
				// For now, throw an error as per the requirement
				throw new Error("Native tokens are not supported in this context.");
			} else {
				throw new Error("Unexpected token type encountered.");
			}
		}));
	}

	async getTokensMap(): Promise<Map<Addr, Snip20>> {
		const snip20s = await this.getSnip20s()
		const snip20Map = new Map<Addr, Snip20>()
		for (let snip20 of snip20s) {
			snip20Map.set(snip20.getContractAddress(), snip20)
		}
		return snip20Map
	}

	async getTokensConfig(): Promise<TokensConfig> {
		const snip20s = await this.getSnip20s();
		let tokensConfig: TokensConfig = []; // Assuming TokensConfig is an array type
		for (let snip20 of snip20s) { // Use for-of for iterating over array elements
			const tokenConfig = {
				tokenContractAddress: snip20.getContractAddress(),
				decimals: await snip20.decimals()
			};
			tokensConfig.push(tokenConfig);
		}
		return tokensConfig;
	}

	async add_liquidity(amount1: string, amount2: string): Promise<TxResponse> {
		const msg: Add_liquidity_to_a_m_m_contract_msg = {
			add_liquidity_to_a_m_m_contract: {
				deposit: {
					amount_0: amount1,
					amount_1: amount2,
					pair: await this.getTokenPair()
				},
				execute_sslp_virtual_swap: false,
				expected_return: undefined,
				staking: false
			}
		}
		const gas_limit = 270_000
		return this.execute(msg, gas_limit)
	}

	async queryPairConfig(): Promise<PairConfig> {
		return queryPairConfig({
			contractAddress: this.getContractAddress(),
			codeHash: this.getContractCodeHash(),
			lcdEndpoint: this.getLCDEndpoint(),
			chainId: this.getChainId()
		})
	}

	async pairInfo(): Promise<PairInfo> {
		const pairinfoResponse = await this.get_pair_info()
		return parsePairInfo(pairinfoResponse as any)
	}
}

export class AmmPairFactory extends ContractFactory {

	async createAmmPairContract(initMsg: InitMsg, contractWasm: Buffer): Promise<AmmPair> {
		const contractInfo: ContractInfo = await this.createContract<InitMsg>(initMsg, contractWasm)

		return new AmmPair(contractInfo, this.secretjs);
	}
}