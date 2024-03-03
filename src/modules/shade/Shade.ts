import { SecretNetworkClient, TxResponse } from "secretjs";
import { AmmPair, Factory, Router } from ".";
import { Addr, ContractInfo } from "../shared";
import { AMMPair as ShadeAMMPair } from "./common_types";
import { BatchPairsConfig, BatchPairsInfo, Contract, Route, TokensConfig, batchQueryPairsConfig, batchQueryPairsInfo, getPossiblePaths, getRoutes } from "@shadeprotocol/shadejs";
import BigNumber from 'bignumber.js';
import { Snip20 } from "../snip20";
import { Hop } from "./router/types";

export interface ShadeInitOptions {
	routerInfo: ContractInfo;
	factoryInfo: ContractInfo;
	batchQueryRouterInfo: ContractInfo;
	secretjs: SecretNetworkClient;
	shouldRegisterFactoryPairs?: boolean; // Assumes false
}

export class Shade {
	private factory: Factory;
	private router: Router;
	private batchQueryRouterInfo;
	private amm_pairs?: AmmPair[];
	private secretjs: SecretNetworkClient;

	private constructor(routerInfo: ContractInfo, factoryInfo: ContractInfo, batchQueryRouterInfo: ContractInfo, secretjs: SecretNetworkClient) {
		this.factory = new Factory(factoryInfo, secretjs)
		this.router = new Router(routerInfo, secretjs)
		this.batchQueryRouterInfo = batchQueryRouterInfo;
		this.secretjs = secretjs
	}

	static async init(options: ShadeInitOptions): Promise<Shade> {
		let instance = new Shade(options.routerInfo, options.factoryInfo, options.batchQueryRouterInfo, options.secretjs)

		await instance.set_amm_pairs();

		if (options.shouldRegisterFactoryPairs) {
			await instance.register_factory_pairs_with_router();
		}
		return instance
	}

	/////////////////// GETTERS ///////////////////
	public getFactory(): Factory {
		return this.factory
	}

	public getRouter(): Router {
		return this.router
	}

	public getAmmPairs(): AmmPair[] {
		if (!this.amm_pairs || this.amm_pairs.length === 0) {
			console.error("AMM pairs are not set.");
			throw new Error("AMM pairs are not set.");
		}
		return this.amm_pairs
	}


	/////////////////// BATCH QUERIES ///////////////////
	async getPossiblePaths(token1: Addr, token2: Addr, maxHops = 4): Promise<string[][]> {
		const pairs = await this.batchQueryPairsInfo()
		return getPossiblePaths({
			inputTokenContractAddress: token1,
			outputTokenContractAddress: token2,
			maxHops,
			pairs
		})
	}

	async getRoutes(inputTokenContractAddress: Addr, outputTokenContractAddress: Addr, inputTokenAmount: BigNumber, maxHops = 4): Promise<Route[]> {
		const pairs = await this.batchQueryPairsInfo()
		const tokens: TokensConfig = await this.getTokensConfig()
		return getRoutes({
			inputTokenAmount,
			inputTokenContractAddress,
			outputTokenContractAddress,
			maxHops,
			pairs,
			tokens,
		})
	}
	/////////////////// ACTIONS ///////////////////
	async swap(route: Route, recipient?: Addr): Promise<TxResponse> {
		const inputSnip20 = await this.getInputSnip20(route)
		const path = this.getPath(route)
		const gasLimit = 750_000 * route.gasMultiplier
		return this.getRouter().swap(
			inputSnip20,
			route.inputAmount.toString(),
			route.quoteOutputAmount.toString(),
			path,
			recipient,
			gasLimit
		)
	}

	/////////////////// PRIVATE METHODS ///////////////////
	private async register_factory_pairs_with_router(): Promise<TxResponse[]> {
		const responses: TxResponse[] = [];
		// Fetch all AMM pairs from the factory
		const response = await this.factory.list_amm_pairs();
		const ammPairs = response.list_a_m_m_pairs.amm_pairs;

		for (const pair of ammPairs) {
			// Iterate through each pair to find custom tokens
			for (const token of pair.pair) {
				if ('custom_token' in token) {
					// Convert to ContractInfo and register
					const contractInfo: ContractInfo = {
						address: token.custom_token.contract_addr,
						code_hash: token.custom_token.token_code_hash
					};
					const txResponse = await this.router.register_snip20(contractInfo);
					responses.push(txResponse);
				} else if ('native_token' in token) {
					// Log native tokens for now
					console.log(`Ignoring native token: ${token.native_token.denom}`);
				}
			}
		}
		return responses;
	}

	private async set_amm_pairs() {
		const response = await this.factory.list_amm_pairs();
		const ammPairs: ShadeAMMPair[] = response.list_a_m_m_pairs.amm_pairs;

		this.amm_pairs = ammPairs.map(ammPairInfo => {
			return new AmmPair({
				address: ammPairInfo.address,
				code_hash: ammPairInfo.code_hash
			}, this.secretjs);
		});
	}

	private async batchQueryPairsInfo(): Promise<BatchPairsInfo> {
		const pairsContracts = this.getPairsContracts();

		// Call the batchQueryPairsInfo function
		try {
			const batchQueryResult = await batchQueryPairsInfo({
				queryRouterContractAddress: this.batchQueryRouterInfo.address,
				queryRouterCodeHash: this.batchQueryRouterInfo.code_hash,
				lcdEndpoint: this.getLCDEndpoint(),
				chainId: this.getChainId(),
				pairsContracts,
			});

			// Process the batch query results as needed
			return batchQueryResult;
		} catch (error) {
			console.error("Failed to batch query pairs info:", error);
			throw error; // Rethrow or handle error as appropriate
		}
	}

	private async batchQueryPairsConfig(): Promise<BatchPairsConfig> {
		const pairsContracts = this.getPairsContracts();

		// Prepare parameters for the batch query
		const params = {
			queryRouterContractAddress: this.router.getContractAddress(),
			queryRouterCodeHash: this.router.getContractCodeHash(),
			lcdEndpoint: this.getLCDEndpoint(),
			chainId: this.getChainId(),
			pairsContracts,
		};

		// Call the batchQueryPairsConfig function and handle the response
		try {
			const batchQueryResult: BatchPairsConfig = await batchQueryPairsConfig(params);
			// Process the batch query results as needed
			return batchQueryResult;
		} catch (error) {
			console.error("Failed to batch query pairs config:", error);
			throw error; // Rethrow or handle error as appropriate
		}
	}

	private async getTokensConfig(): Promise<TokensConfig> {
		if (!this.amm_pairs) {
			throw new Error("AMM pairs not set");
		}

		// Kind of awkward way of making a set in TS
		// Use a Map to keep track of unique token configurations by their address.
		const uniqueTokensMap = new Map<string, any>();

		for (const ammPair of this.amm_pairs) {
			const tokensConfig = await ammPair.getTokensConfig();
			for (const tokenConfig of tokensConfig) {
				// Use tokenContractAddress as the key for uniqueness.
				if (!uniqueTokensMap.has(tokenConfig.tokenContractAddress)) {
					uniqueTokensMap.set(tokenConfig.tokenContractAddress, tokenConfig);
				}
			}
		}

		// Convert the Map values to an array, which will contain only unique token configurations.
		return Array.from(uniqueTokensMap.values());
	}

	private async getSnip20s(): Promise<Snip20[]> {
		const uniqueSnip20Map = await this.getSnip20s()
		// Convert the Map values to an array, containing only unique Snip20 instances.
		return Array.from(uniqueSnip20Map.values());
	}

	private async getSnip20sMap(): Promise<Map<Addr, Snip20>> {
		if (!this.amm_pairs) {
			throw new Error("AMM pairs not set");
		}

		// Use a Map to ensure uniqueness of Snip20 instances based on their address.
		const uniqueSnip20Map = new Map<Addr, Snip20>();

		for (const ammPair of this.amm_pairs) {
			const snip20s = await ammPair.getSnip20s();
			for (const snip20 of snip20s) {
				const address = snip20.getContractAddress(); // Assuming getAddress() returns the unique address of the Snip20
				if (!uniqueSnip20Map.has(address)) {
					uniqueSnip20Map.set(address, snip20);
				}
			}
		}
		return uniqueSnip20Map
	}

	private getHopsMap(): Map<Addr, Hop> {
		const hopsMap = new Map<Addr, Hop>();

		if (!this.amm_pairs) {
			throw new Error("AMM pairs not set");
		}

		for (const ammPair of this.amm_pairs) {
			const addr = ammPair.getContractAddress();
			const contractInfo = ammPair.getContractInfo();

			const hop: Hop = {
				addr: contractInfo.address,
				code_hash: contractInfo.code_hash,
			};
			hopsMap.set(addr, hop);
		}

		return hopsMap;
	}

	private getPath(route: Route): Hop[] {
		const hopsMap = this.getHopsMap();
		const path: Hop[] = [];

		for (const addr of route.path) {
			const hop = hopsMap.get(addr);
			if (!hop) {
				throw new Error(`Hop not found for address: ${addr}`);
			}
			path.push(hop);
		}

		return path;
	}

	private async getInputSnip20(route: Route): Promise<Snip20> {
		const snip20sMap = await this.getSnip20sMap()
		const inputSnip20: Snip20 | undefined = snip20sMap.get(route.inputTokenContractAddress);
		if (!inputSnip20) {
			throw new Error(`SNIP20 with address ${route.inputTokenContractAddress} not found.`);
		}
		return inputSnip20
	}

	private getPairsContracts(): Contract[] {
		if (!this.amm_pairs || this.amm_pairs.length === 0) {
			console.error("AMM pairs are not set.");
			throw new Error("AMM pairs are not set.");
		}

		return this.amm_pairs.map(ammPair => ({
			address: ammPair.getContractAddress(),
			codeHash: ammPair.getContractCodeHash(),
		}));
	}

	/////////////////// PROTECTED METHODS ///////////////////

	/**
	 * Retrieves the LCD (Light Client Daemon) endpoint from the `secretjs` object.
	 * The LCD endpoint is used for interacting with the blockchain, enabling actions such as querying data and submitting transactions.
	 * This method is private and intended for internal use within the class.
	 * @returns {string} The URL of the LCD endpoint.
	 */
	protected getLCDEndpoint(): string {
		return (this.secretjs as any).url;
	}

	/**
	 * Fetches the chain ID from the `secretjs` object.
	 * The chain ID is a unique identifier for the blockchain network, ensuring transactions are signed and submitted to the correct network.
	 * This method is private and designed for use within the class to obtain blockchain-specific configuration details.
	 * @returns {string} The chain ID of the blockchain.
	 */
	protected getChainId(): string {
		return (this.secretjs as any).chainId;
	}
}