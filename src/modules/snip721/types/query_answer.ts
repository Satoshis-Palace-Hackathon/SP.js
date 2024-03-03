import { Addr } from "../../../modules/shared/contract/types";
import { BatchNftDossierElement, Cw721Approval, Cw721OwnerOfResponse, DisplayRoyaltyInfo, Expiration, Extension, Metadata, MintRunInfo, Snip721Approval, Tx } from "./common_types";

export type QueryAnswer =
	| Contract_info_answer
	| Contract_config_answer
	| Minters_answer
	| Num_tokens_answer
	| Token_list_answer
	| Owner_of_answer
	| Token_approvals_answer
	| Inventory_approvals_answer
	| Nft_info_answer
	| Private_metadata_answer
	| All_nft_info_answer
	| Nft_dossier_answer
	| Batch_nft_dossier_answer
	| Approved_for_all_answer
	| Is_unwrapped_answer
	| Is_transferable_answer
	| Implements_non_transferable_tokens_answer
	| Implements_token_subtype_answer
	| Verify_transfer_approval_answer
	| Transaction_history_answer
	| Registered_code_hash_answer
	| Royalty_info_answer
	| Contract_creator_answer
	;
export interface Contract_info_answer {
	contract_info: {
		name: string;
		symbol: string;
		[k: string]: unknown;
	};
}
export interface Contract_config_answer {
	contract_config: {
		burn_is_enabled: boolean;
		implements_non_transferable_tokens: boolean;
		implements_token_subtype: boolean;
		minter_may_update_metadata: boolean;
		owner_is_public: boolean;
		owner_may_update_metadata: boolean;
		sealed_metadata_is_enabled: boolean;
		token_supply_is_public: boolean;
		unwrapped_metadata_is_private: boolean;
		[k: string]: unknown;
	};
}
export interface Minters_answer {
	minters: {
		minters: Addr[];
		[k: string]: unknown;
	};
}
export interface Num_tokens_answer {
	num_tokens: {
		count: number;
		[k: string]: unknown;
	};
}
export interface Token_list_answer {
	token_list: {
		tokens: string[];
		[k: string]: unknown;
	};
}
export interface Owner_of_answer {
	owner_of: {
		approvals: Cw721Approval[];
		owner: Addr;
		[k: string]: unknown;
	};
}
export interface Token_approvals_answer {
	token_approvals: {
		owner_is_public: boolean;
		private_metadata_is_public: boolean;
		private_metadata_is_public_expiration?: Expiration | null;
		public_ownership_expiration?: Expiration | null;
		token_approvals: Snip721Approval[];
		[k: string]: unknown;
	};
}
export interface Inventory_approvals_answer {
	inventory_approvals: {
		inventory_approvals: Snip721Approval[];
		owner_is_public: boolean;
		private_metadata_is_public: boolean;
		private_metadata_is_public_expiration?: Expiration | null;
		public_ownership_expiration?: Expiration | null;
		[k: string]: unknown;
	};
}
export interface Nft_info_answer {
	nft_info: {
		extension?: Extension | null;
		token_uri?: string | null;
		[k: string]: unknown;
	};
}
export interface Private_metadata_answer {
	private_metadata: {
		extension?: Extension | null;
		token_uri?: string | null;
		[k: string]: unknown;
	};
}
export interface All_nft_info_answer {
	all_nft_info: {
		access: Cw721OwnerOfResponse;
		info?: Metadata | null;
		[k: string]: unknown;
	};
}
export interface Nft_dossier_answer {
	nft_dossier: {
		display_private_metadata_error?: string | null;
		inventory_approvals?: Snip721Approval[] | null;
		mint_run_info?: MintRunInfo | null;
		owner?: Addr | null;
		owner_is_public: boolean;
		private_metadata?: Metadata | null;
		private_metadata_is_public: boolean;
		private_metadata_is_public_expiration?: Expiration | null;
		public_metadata?: Metadata | null;
		public_ownership_expiration?: Expiration | null;
		royalty_info?: DisplayRoyaltyInfo | null;
		token_approvals?: Snip721Approval[] | null;
		transferable: boolean;
		unwrapped: boolean;
		[k: string]: unknown;
	};
}
export interface Batch_nft_dossier_answer {
	batch_nft_dossier: {
		nft_dossiers: BatchNftDossierElement[];
		[k: string]: unknown;
	};
}
export interface Approved_for_all_answer {
	approved_for_all: {
		operators: Cw721Approval[];
		[k: string]: unknown;
	};
}
export interface Is_unwrapped_answer {
	is_unwrapped: {
		token_is_unwrapped: boolean;
		[k: string]: unknown;
	};
}
export interface Is_transferable_answer {
	is_transferable: {
		token_is_transferable: boolean;
		[k: string]: unknown;
	};
}
export interface Implements_non_transferable_tokens_answer {
	implements_non_transferable_tokens: {
		is_enabled: boolean;
		[k: string]: unknown;
	};
}
export interface Implements_token_subtype_answer {
	implements_token_subtype: {
		is_enabled: boolean;
		[k: string]: unknown;
	};
}
export interface Verify_transfer_approval_answer {
	verify_transfer_approval: {
		approved_for_all: boolean;
		first_unapproved_token?: string | null;
		[k: string]: unknown;
	};
}
export interface Transaction_history_answer {
	transaction_history: {
		/**
		 * total transaction count
		 */
		total: number;
		txs: Tx[];
		[k: string]: unknown;
	};
}
export interface Registered_code_hash_answer {
	registered_code_hash: {
		also_implements_batch_receive_nft: boolean;
		code_hash?: string | null;
		[k: string]: unknown;
	};
}
export interface Royalty_info_answer {
	royalty_info: {
		royalty_info?: DisplayRoyaltyInfo | null;
		[k: string]: unknown;
	};
}
export interface Contract_creator_answer {
	contract_creator: {
		creator?: Addr | null;
		[k: string]: unknown;
	};
}
