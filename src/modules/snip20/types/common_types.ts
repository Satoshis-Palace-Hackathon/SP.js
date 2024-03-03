export interface PermitParamsFor_TokenPermissions {
	allowed_tokens: string[];
	chain_id: string;
	permissions: TokenPermissions[];
	permit_name: string;
	[k: string]: unknown;
}

export type TokenPermissions = "allowance" | "balance" | "history" | "owner";

export type ContractStatusLevel = "normal_run" | "stop_all_but_redeems" | "stop_all";
