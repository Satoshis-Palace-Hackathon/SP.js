import { PermitFor_TokenPermissions } from "../../../modules/shared/contract/types";
import { ViewerInfo } from "./common_types";

export type QueryMsg =
	| Contract_info_msg
	| Contract_config_msg
	| Minters_msg
	| Num_tokens_msg
	| All_tokens_msg
	| Owner_of_msg
	| Nft_info_msg
	| All_nft_info_msg
	| Private_metadata_msg
	| Nft_dossier_msg
	| Batch_nft_dossier_msg
	| Token_approvals_msg
	| Inventory_approvals_msg
	| Approved_for_all_msg
	| Tokens_msg
	| Num_tokens_of_owner_msg
	| Is_unwrapped_msg
	| Is_transferable_msg
	| Implements_non_transferable_tokens_msg
	| Implements_token_subtype_msg
	| Verify_transfer_approval_msg
	| Transaction_history_msg
	| Registered_code_hash_msg
	| Royalty_info_msg
	| Contract_creator_msg
	| With_permit_msg
	;

export interface Contract_info_msg {
	contract_info: {
		[k: string]: unknown;
	};
}
export interface Contract_config_msg {
	contract_config: {
		[k: string]: unknown;
	};
}
export interface Minters_msg {
	minters: {
		[k: string]: unknown;
	};
}
export interface Num_tokens_msg {
	num_tokens: {
		/**
		 * optional address and key requesting to view the number of tokens
		 */
		viewer?: ViewerInfo | null;
		[k: string]: unknown;
	};
}
export interface All_tokens_msg {
	all_tokens: {
		/**
		 * optional number of token ids to display
		 */
		limit?: number | null;
		/**
		 * paginate by providing the last token_id received in the previous query
		 */
		start_after?: string | null;
		/**
		 * optional address and key requesting to view the list of tokens
		 */
		viewer?: ViewerInfo | null;
		[k: string]: unknown;
	};
}
export interface Owner_of_msg {
	owner_of: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		token_id: string;
		/**
		 * optional address and key requesting to view the token owner
		 */
		viewer?: ViewerInfo | null;
		[k: string]: unknown;
	};
}
export interface Nft_info_msg {
	nft_info: {
		token_id: string;
		[k: string]: unknown;
	};
}
export interface All_nft_info_msg {
	all_nft_info: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		token_id: string;
		/**
		 * optional address and key requesting to view the token owner
		 */
		viewer?: ViewerInfo | null;
		[k: string]: unknown;
	};
}
export interface Private_metadata_msg {
	private_metadata: {
		token_id: string;
		/**
		 * optional address and key requesting to view the private metadata
		 */
		viewer?: ViewerInfo | null;
		[k: string]: unknown;
	};
}
export interface Nft_dossier_msg {
	nft_dossier: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		token_id: string;
		/**
		 * optional address and key requesting to view the token information
		 */
		viewer?: ViewerInfo | null;
		[k: string]: unknown;
	};
}
export interface Batch_nft_dossier_msg {
	batch_nft_dossier: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		token_ids: string[];
		/**
		 * optional address and key requesting to view the token information
		 */
		viewer?: ViewerInfo | null;
		[k: string]: unknown;
	};
}
export interface Token_approvals_msg {
	token_approvals: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		token_id: string;
		/**
		 * the token owner's viewing key
		 */
		viewing_key: string;
		[k: string]: unknown;
	};
}
export interface Inventory_approvals_msg {
	inventory_approvals: {
		address: string;
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		/**
		 * the viewing key
		 */
		viewing_key: string;
		[k: string]: unknown;
	};
}
export interface Approved_for_all_msg {
	approved_for_all: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		owner: string;
		/**
		 * optional viewing key to authenticate this query.  It is "optional" only in the sense that a CW721 query does not have this field.  However, not providing the key will always result in an empty list
		 */
		viewing_key?: string | null;
		[k: string]: unknown;
	};
}
export interface Tokens_msg {
	tokens: {
		/**
		 * optional number of token ids to display
		 */
		limit?: number | null;
		owner: string;
		/**
		 * paginate by providing the last token_id received in the previous query
		 */
		start_after?: string | null;
		/**
		 * optional address of the querier if different from the owner
		 */
		viewer?: string | null;
		/**
		 * optional viewing key
		 */
		viewing_key?: string | null;
		[k: string]: unknown;
	};
}
export interface Num_tokens_of_owner_msg {
	num_tokens_of_owner: {
		owner: string;
		/**
		 * optional address of the querier if different from the owner
		 */
		viewer?: string | null;
		/**
		 * optional viewing key
		 */
		viewing_key?: string | null;
		[k: string]: unknown;
	};
}
export interface Is_unwrapped_msg {
	is_unwrapped: {
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Is_transferable_msg {
	is_transferable: {
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Implements_non_transferable_tokens_msg {
	implements_non_transferable_tokens: {
		[k: string]: unknown;
	};
}
export interface Implements_token_subtype_msg {
	implements_token_subtype: {
		[k: string]: unknown;
	};
}
export interface Verify_transfer_approval_msg {
	verify_transfer_approval: {
		/**
		 * address that has approval
		 */
		address: string;
		/**
		 * list of tokens to verify approval for
		 */
		token_ids: string[];
		/**
		 * viewing key
		 */
		viewing_key: string;
		[k: string]: unknown;
	};
}
export interface Transaction_history_msg {
	transaction_history: {
		address: string;
		/**
		 * optional page to display
		 */
		page?: number | null;
		/**
		 * optional number of transactions per page
		 */
		page_size?: number | null;
		/**
		 * viewing key
		 */
		viewing_key: string;
		[k: string]: unknown;
	};
}
export interface Registered_code_hash_msg {
	registered_code_hash: {
		/**
		 * the contract whose receive registration info you want to view
		 */
		contract: string;
		[k: string]: unknown;
	};
}
export interface Royalty_info_msg {
	royalty_info: {
		/**
		 * optional ID of the token whose royalty information should be displayed.  If not provided, display the contract's default royalty information
		 */
		token_id?: string | null;
		/**
		 * optional address and key requesting to view the royalty information
		 */
		viewer?: ViewerInfo | null;
		[k: string]: unknown;
	};
}
export interface Contract_creator_msg {
	contract_creator: {
		[k: string]: unknown;
	};
}
export interface With_permit_msg {
	with_permit: {
		/**
		 * permit used to verify querier identity
		 */
		permit: PermitFor_TokenPermissions;
		/**
		 * query to perform
		 */
		query: QueryWithPermit;
		[k: string]: unknown;
	};
}
///////Query with permit
export type QueryWithPermit =
	| Royalty_info_msg_with_permit
	| Private_metadata_msg_with_permit
	| Nft_dossier_msg_with_permit
	| Batch_nft_dossier_msg_with_permit
	| Owner_of_msg_with_permit
	| All_nft_info_msg_with_permit
	| Inventory_approvals_msg_with_permit
	| Verify_transfer_approval_msg_with_permit
	| Transaction_history_msg_with_permit
	| Num_tokens_msg_with_permit
	| All_tokens_msg_with_permit
	| Token_approvals_msg_with_permit
	| Approved_for_all_msg_with_permit
	| Tokens_msg_with_permit
	| Num_tokens_of_owner_msg_with_permit
	;
export interface Royalty_info_msg_with_permit {
	royalty_info: {
		/**
		 * optional ID of the token whose royalty information should be displayed.  If not provided, display the contract's default royalty information
		 */
		token_id?: string | null;
		[k: string]: unknown;
	};
}
export interface Private_metadata_msg_with_permit {
	private_metadata: {
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Nft_dossier_msg_with_permit {
	nft_dossier: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Batch_nft_dossier_msg_with_permit {
	batch_nft_dossier: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		token_ids: string[];
		[k: string]: unknown;
	};
}
export interface Owner_of_msg_with_permit {
	owner_of: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		token_id: string;
		[k: string]: unknown;
	};
}
export interface All_nft_info_msg_with_permit {
	all_nft_info: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Inventory_approvals_msg_with_permit {
	inventory_approvals: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		[k: string]: unknown;
	};
}
export interface Verify_transfer_approval_msg_with_permit {
	verify_transfer_approval: {
		/**
		 * list of tokens to verify approval for
		 */
		token_ids: string[];
		[k: string]: unknown;
	};
}
export interface Transaction_history_msg_with_permit {
	transaction_history: {
		/**
		 * optional page to display
		 */
		page?: number | null;
		/**
		 * optional number of transactions per page
		 */
		page_size?: number | null;
		[k: string]: unknown;
	};
}
export interface Num_tokens_msg_with_permit {
	num_tokens: {
		[k: string]: unknown;
	};
}
export interface All_tokens_msg_with_permit {
	all_tokens: {
		/**
		 * optional number of token ids to display
		 */
		limit?: number | null;
		/**
		 * paginate by providing the last token_id received in the previous query
		 */
		start_after?: string | null;
		[k: string]: unknown;
	};
}
export interface Token_approvals_msg_with_permit {
	token_approvals: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Approved_for_all_msg_with_permit {
	approved_for_all: {
		/**
		 * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
		 */
		include_expired?: boolean | null;
		[k: string]: unknown;
	};
}
export interface Tokens_msg_with_permit {
	tokens: {
		/**
		 * optional number of token ids to display
		 */
		limit?: number | null;
		owner: string;
		/**
		 * paginate by providing the last token_id received in the previous query
		 */
		start_after?: string | null;
		[k: string]: unknown;
	};
}
export interface Num_tokens_of_owner_msg_with_permit {
	num_tokens_of_owner: {
		owner: string;
		[k: string]: unknown;
	};
}
