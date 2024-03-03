import { Addr, Uint128 } from "../shared/contract/types";

export interface Pagination {
	limit: number;
	start: number;
	[k: string]: unknown;
}

/**
 * @minItems 2
 * @maxItems 2
 */
export type TokenPair = [TokenType, TokenType];
export type TokenType =
	| {
		custom_token: {
			contract_addr: Addr;
			token_code_hash: string;
			[k: string]: unknown;
		};
	}
	| {
		native_token: {
			denom: string;
			[k: string]: unknown;
		};
	};

export interface Fee {
	denom: number;
	nom: number;
	[k: string]: unknown;
}

/**
 * Represents the address of an exchange and the pair that it manages
 */
export interface AMMPair {
	/**
	 * Address of the contract that manages the exchange.
	 */
	address: Addr;
	code_hash: string;
	/**
	 * Used to enable or disable the AMMPair
	 */
	enabled: boolean;
	/**
	 * The pair that the contract manages.
	 */
	pair: TokenPair;
	[k: string]: unknown;
}

/**
 * Info needed to instantiate a contract.
 */
export interface ContractInstantiationInfo {
	code_hash: string;
	id: number;
	[k: string]: unknown;
}
export interface StakingContractInit {
	contract_info: ContractInstantiationInfo;
	custom_label?: string | null;
	daily_reward_amount: Uint128;
	reward_token: TokenType;
	valid_to: Uint128;
	[k: string]: unknown;
}
export interface TokenAmount {
	amount: Uint128;
	token: TokenType;
	[k: string]: unknown;
}
export interface SwapResult {
	return_amount: Uint128;
	[k: string]: unknown;
}
