export type ExecuteAnswer =
	| Mint_nft_answer
	| Batch_mint_nft_answer
	| Mint_nft_clones_answer
	| Set_metadata_answer
	| Set_royalty_info_answer
	| Make_ownership_private_answer
	| Reveal_answer
	| Approve_answer
	| Revoke_answer
	| Approve_all_answer
	| Revoke_all_answer
	| Set_global_approval_answer
	| Set_whitelisted_approval_answer
	| Transfer_nft_answer
	| Batch_transfer_nft_answer
	| Send_nft_answer
	| Batch_send_nft_answer
	| Burn_nft_answer
	| Batch_burn_nft_answer
	| Register_receive_nft_answer
	| Viewing_key_answer
	| Add_minters_answer
	| Remove_minters_answer
	| Set_minters_answer
	| Change_admin_answer
	| Set_contract_status_answer
	| Revoke_permit_answer
	;
export interface Mint_nft_answer {
	mint_nft: {
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Batch_mint_nft_answer {
	batch_mint_nft: {
		token_ids: string[];
		[k: string]: unknown;
	};
}
export interface Mint_nft_clones_answer {
	mint_nft_clones: {
		/**
		 * token id of the first minted clone
		 */
		first_minted: string;
		/**
		 * token id of the last minted clone
		 */
		last_minted: string;
		[k: string]: unknown;
	};
}
export interface Set_metadata_answer {
	set_metadata: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Set_royalty_info_answer {
	set_royalty_info: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Make_ownership_private_answer {
	make_ownership_private: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Reveal_answer {
	reveal: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Approve_answer {
	approve: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Revoke_answer {
	revoke: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Approve_all_answer {
	approve_all: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Revoke_all_answer {
	revoke_all: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Set_global_approval_answer {
	set_global_approval: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Set_whitelisted_approval_answer {
	set_whitelisted_approval: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Transfer_nft_answer {
	transfer_nft: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Batch_transfer_nft_answer {
	batch_transfer_nft: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Send_nft_answer {
	send_nft: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Batch_send_nft_answer {
	batch_send_nft: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Burn_nft_answer {
	burn_nft: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Batch_burn_nft_answer {
	batch_burn_nft: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Register_receive_nft_answer {
	register_receive_nft: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Viewing_key_answer {
	viewing_key: {
		key: string;
		[k: string]: unknown;
	};
}
export interface Add_minters_answer {
	add_minters: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Remove_minters_answer {
	remove_minters: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Set_minters_answer {
	set_minters: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Change_admin_answer {
	change_admin: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Set_contract_status_answer {
	set_contract_status: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export interface Revoke_permit_answer {
	revoke_permit: {
		status: ResponseStatus;
		[k: string]: unknown;
	};
}
export type ResponseStatus = "success" | "failure";


