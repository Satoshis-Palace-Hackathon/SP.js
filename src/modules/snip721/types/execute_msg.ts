import { Binary } from "../../../modules/shared/contract/types";
import { AccessLevel, Burn, ContractStatus, Expiration, Metadata, Mint, ReceiverInfo, RoyaltyInfo, Send, SerialNumber, Transfer } from "./common_types";

export type ExecuteMsg =
	| Mint_nft_msg
	| Batch_mint_nft_msg
	| Mint_nft_clones_msg
	| Set_metadata_msg
	| Set_royalty_info_msg
	| Reveal_msg
	| Make_ownership_private_msg
	| Set_global_approval_msg
	| Set_whitelisted_approval_msg
	| Approve_msg
	| Revoke_msg
	| Approve_all_msg
	| Revoke_all_msg
	| Transfer_nft_msg
	| Batch_transfer_nft_msg
	| Send_nft_msg
	| Batch_send_nft_msg
	| Burn_nft_msg
	| Batch_burn_nft_msg
	| Register_receive_nft_msg
	| Create_viewing_key_msg
	| Set_viewing_key_msg
	| Add_minters_msg
	| Remove_minters_msg
	| Set_minters_msg
	| Change_admin_msg
	| Set_contract_status_msg
	| Revoke_permit_msg
	;

export interface Mint_nft_msg {
	mint_nft: {
		/**
		 * optional memo for the tx
		 */
		memo?: string | null;
		/**
		 * optional owner address. if omitted, owned by the message sender
		 */
		owner?: string | null;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * optional private metadata that can only be seen by the owner and whitelist
		 */
		private_metadata?: Metadata | null;
		/**
		 * optional public metadata that can be seen by everyone
		 */
		public_metadata?: Metadata | null;
		/**
		 * optional royalty information for this token.  This will be ignored if the token is non-transferable
		 */
		royalty_info?: RoyaltyInfo | null;
		/**
		 * optional serial number for this token
		 */
		serial_number?: SerialNumber | null;
		/**
		 * optional token id. if omitted, use current token index
		 */
		token_id?: string | null;
		/**
		 * optionally true if the token is transferable.  Defaults to true if omitted
		 */
		transferable?: boolean | null;
		[k: string]: unknown;
	};
}
export interface Batch_mint_nft_msg {
	batch_mint_nft: {
		/**
		 * list of mint operations to perform
		 */
		mints: Mint[];
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Mint_nft_clones_msg {
	mint_nft_clones: {
		/**
		 * optional memo for the mint txs
		 */
		memo?: string | null;
		/**
		 * optional mint run ID
		 */
		mint_run_id?: string | null;
		/**
		 * optional owner address. if omitted, owned by the message sender
		 */
		owner?: string | null;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * optional private metadata that can only be seen by the owner and whitelist
		 */
		private_metadata?: Metadata | null;
		/**
		 * optional public metadata that can be seen by everyone
		 */
		public_metadata?: Metadata | null;
		/**
		 * number of clones to mint
		 */
		quantity: number;
		/**
		 * optional royalty information for these tokens
		 */
		royalty_info?: RoyaltyInfo | null;
		[k: string]: unknown;
	};
}
export interface Set_metadata_msg {
	set_metadata: {
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * the optional new private metadata
		 */
		private_metadata?: Metadata | null;
		/**
		 * the optional new public metadata
		 */
		public_metadata?: Metadata | null;
		/**
		 * id of the token whose metadata should be updated
		 */
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Set_royalty_info_msg {
	set_royalty_info: {
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * the new royalty information.  If None, existing royalty information will be deleted.  It should be noted, that if deleting a token's royalty information while the contract has a default royalty info set up will give the token the default royalty information
		 */
		royalty_info?: RoyaltyInfo | null;
		/**
		 * optional id of the token whose royalty information should be updated.  If not provided, this updates the default royalty information for any new tokens minted on the contract
		 */
		token_id?: string | null;
		[k: string]: unknown;
	};
}
export interface Reveal_msg {
	reveal: {
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * id of the token to unwrap
		 */
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Make_ownership_private_msg {
	make_ownership_private: {
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Set_global_approval_msg {
	set_global_approval: {
		/**
		 * optional expiration
		 */
		expires?: Expiration | null;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * optional token id to apply approval/revocation to
		 */
		token_id?: string | null;
		/**
		 * optional permission level for viewing the owner
		 */
		view_owner?: AccessLevel | null;
		/**
		 * optional permission level for viewing private metadata
		 */
		view_private_metadata?: AccessLevel | null;
		[k: string]: unknown;
	};
}
export interface Set_whitelisted_approval_msg {
	set_whitelisted_approval: {
		/**
		 * address being granted/revoked permission
		 */
		address: string;
		/**
		 * optional expiration
		 */
		expires?: Expiration | null;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * optional token id to apply approval/revocation to
		 */
		token_id?: string | null;
		/**
		 * optional permission level for transferring
		 */
		transfer?: AccessLevel | null;
		/**
		 * optional permission level for viewing the owner
		 */
		view_owner?: AccessLevel | null;
		/**
		 * optional permission level for viewing private metadata
		 */
		view_private_metadata?: AccessLevel | null;
		[k: string]: unknown;
	};
}
export interface Approve_msg {
	approve: {
		/**
		 * optional expiration for this approval
		 */
		expires?: Expiration | null;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * address being granted the permission
		 */
		spender: string;
		/**
		 * id of the token that the spender can transfer
		 */
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Revoke_msg {
	revoke: {
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * address whose permission is revoked
		 */
		spender: string;
		/**
		 * id of the token that the spender can no longer transfer
		 */
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Approve_all_msg {
	approve_all: {
		/**
		 * optional expiration for this approval
		 */
		expires?: Expiration | null;
		/**
		 * address being granted permission to transfer
		 */
		operator: string;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Revoke_all_msg {
	revoke_all: {
		/**
		 * address whose permissions are revoked
		 */
		operator: string;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Transfer_nft_msg {
	transfer_nft: {
		/**
		 * optional memo for the tx
		 */
		memo?: string | null;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * recipient of the transfer
		 */
		recipient: string;
		/**
		 * id of the token to transfer
		 */
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Batch_transfer_nft_msg {
	batch_transfer_nft: {
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * list of transfers to perform
		 */
		transfers: Transfer[];
		[k: string]: unknown;
	};
}
export interface Send_nft_msg {
	send_nft: {
		/**
		 * address to send the token to
		 */
		contract: string;
		/**
		 * optional memo for the tx
		 */
		memo?: string | null;
		/**
		 * optional message to send with the (Batch)RecieveNft callback
		 */
		msg?: Binary | null;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * optional code hash and BatchReceiveNft implementation status of the recipient contract
		 */
		receiver_info?: ReceiverInfo | null;
		/**
		 * id of the token to send
		 */
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Batch_send_nft_msg {
	batch_send_nft: {
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * list of sends to perform
		 */
		sends: Send[];
		[k: string]: unknown;
	};
}
export interface Burn_nft_msg {
	burn_nft: {
		/**
		 * optional memo for the tx
		 */
		memo?: string | null;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * token to burn
		 */
		token_id: string;
		[k: string]: unknown;
	};
}
export interface Batch_burn_nft_msg {
	batch_burn_nft: {
		/**
		 * list of burns to perform
		 */
		burns: Burn[];
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Register_receive_nft_msg {
	register_receive_nft: {
		/**
		 * optionally true if the contract also implements BatchReceiveNft.  Defaults to false if not specified
		 */
		also_implements_batch_receive_nft?: boolean | null;
		/**
		 * receving contract's code hash
		 */
		code_hash: string;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Create_viewing_key_msg {
	create_viewing_key: {
		/**
		 * entropy String used in random key generation
		 */
		entropy: string;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Set_viewing_key_msg {
	set_viewing_key: {
		/**
		 * desired viewing key
		 */
		key: string;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Add_minters_msg {
	add_minters: {
		/**
		 * list of addresses that can now mint
		 */
		minters: string[];
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Remove_minters_msg {
	remove_minters: {
		/**
		 * list of addresses no longer allowed to mint
		 */
		minters: string[];
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Set_minters_msg {
	set_minters: {
		/**
		 * list of addresses with minting authority
		 */
		minters: string[];
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Change_admin_msg {
	change_admin: {
		/**
		 * address with admin authority
		 */
		address: string;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Set_contract_status_msg {
	set_contract_status: {
		/**
		 * status level
		 */
		level: ContractStatus;
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		[k: string]: unknown;
	};
}
export interface Revoke_permit_msg {
	revoke_permit: {
		/**
		 * optional message length padding
		 */
		padding?: string | null;
		/**
		 * name of the permit that is no longer valid
		 */
		permit_name: string;
		[k: string]: unknown;
	};
}

