import { SecretNetworkClient, TxResponse } from "secretjs";

import { Contract, ContractFactory, ContractInfo } from "../../shared/contract";
import { Create_a_m_m_pair_msg, ExecuteMsg, InitMsg, List_a_m_m_pairs_msg, List_a_m_m_pairs_response, QueryMsg, QueryResponse } from "./types";
import { FactoryPairs, queryFactoryPairs } from "@shadeprotocol/shadejs";



export class Factory extends Contract<ExecuteMsg, QueryMsg, QueryResponse> {
	constructor(factoryInfo: ContractInfo, secretjs: SecretNetworkClient) {
		super(factoryInfo.address, factoryInfo.code_hash, secretjs);
	}

	async create_amm_pair(token1: ContractInfo, token2: ContractInfo, lp_token_decimals: number): Promise<TxResponse> {
		const msg: Create_a_m_m_pair_msg = {
			create_a_m_m_pair: {
				entropy: await Contract.generateEntropy(),
				lp_token_decimals,
				pair: [
					{
						custom_token: {
							contract_addr: token1.address,
							token_code_hash: token1.code_hash
						}
					},
					{
						custom_token: {
							contract_addr: token2.address,
							token_code_hash: token2.code_hash
						}
					}
				],
			}
		}
		const gas_limit = 400_000
		return this.execute(msg, gas_limit)
	}

	async list_amm_pairs(limit: number = 10, start: number = 0): Promise<List_a_m_m_pairs_response> {
		const query: List_a_m_m_pairs_msg = {
			list_a_m_m_pairs: {
				pagination: {
					limit,
					start
				}
			}
		}
		return (await this.query(query)) as List_a_m_m_pairs_response
	}

	async queryFactoryPairs(limit: number = 200, start: number = 0): Promise<FactoryPairs> {
		return queryFactoryPairs({
			contractAddress: this.getContractAddress(),
			codeHash: this.getContractCodeHash(),
			startingIndex: start,
			limit,
			lcdEndpoint: this.getLCDEndpoint(),
			chainId: this.getChainId()
		})
	}
}

export class FactoryFactory extends ContractFactory {

	async createFactoryContract(initMsg: InitMsg, contractWasm: Buffer): Promise<Factory> {
		const contractInfo: ContractInfo = await this.createContract<InitMsg>(initMsg, contractWasm)

		return new Factory(contractInfo, this.secretjs);
	}
}