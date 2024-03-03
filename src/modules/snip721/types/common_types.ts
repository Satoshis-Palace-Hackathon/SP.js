import { Addr, Binary, Uint128 } from "../../../modules/shared/contract/types";

/**
 * token metadata
 */
export interface Metadata {
	/**
	 * optional on-chain metadata.  Only use this if you are not using `token_uri`
	 */
	extension?: Extension | null;
	/**
	 * optional uri for off-chain metadata.  This should be prefixed with `http://`, `https://`, `ipfs://`, or `ar://`.  Only use this if you are not using `extension`
	 */
	token_uri?: string | null;
	[k: string]: unknown;
}
/**
 * metadata extension You can add any metadata fields you need here.  These fields are based on https://docs.opensea.io/docs/metadata-standards and are the metadata fields that Stashh uses for robust NFT display.  Urls should be prefixed with `http://`, `https://`, `ipfs://`, or `ar://`
 */
export interface Extension {
	/**
	 * url to a multimedia attachment
	 */
	animation_url?: string | null;
	/**
	 * item attributes
	 */
	attributes?: Trait[] | null;
	/**
	 * background color represented as a six-character hexadecimal without a pre-pended #
	 */
	background_color?: string | null;
	/**
	 * item description
	 */
	description?: string | null;
	/**
	 * url to allow users to view the item on your site
	 */
	external_url?: string | null;
	/**
	 * url to the image
	 */
	image?: string | null;
	/**
	 * raw SVG image data (not recommended). Only use this if you're not including the image parameter
	 */
	image_data?: string | null;
	/**
	 * media files as specified on Stashh that allows for basic authenticatiion and decryption keys. Most of the above is used for bridging public eth NFT metadata easily, whereas `media` will be used when minting NFTs on Stashh
	 */
	media?: MediaFile[] | null;
	/**
	 * name of the item
	 */
	name?: string | null;
	/**
	 * a select list of trait_types that are in the private metadata.  This will only ever be used in public metadata
	 */
	protected_attributes?: string[] | null;
	/**
	 * token subtypes used by Stashh for display groupings (primarily used for badges, which are specified by using "badge" as the token_subtype)
	 */
	token_subtype?: string | null;
	/**
	 * url to a YouTube video
	 */
	youtube_url?: string | null;
	[k: string]: unknown;
}
/**
* attribute trait
*/
export interface Trait {
	/**
	 * indicates how a trait should be displayed
	 */
	display_type?: string | null;
	/**
	 * optional max value for numerical traits
	 */
	max_value?: string | null;
	/**
	 * name of the trait
	 */
	trait_type?: string | null;
	/**
	 * trait value
	 */
	value: string;
	[k: string]: unknown;
}
/**
 * media file
 */
export interface MediaFile {
	/**
	 * authentication information
	 */
	authentication?: Authentication | null;
	/**
	 * file extension
	 */
	extension?: string | null;
	/**
	 * file type Stashh currently uses: "image", "video", "audio", "text", "font", "application"
	 */
	file_type?: string | null;
	/**
	 * url to the file.  Urls should be prefixed with `http://`, `https://`, `ipfs://`, or `ar://`
	 */
	url: string;
	[k: string]: unknown;
}
/**
 * media file authentication
 */
export interface Authentication {
	/**
	 * either a decryption key for encrypted files or a password for basic authentication
	 */
	key?: string | null;
	/**
	 * username used in basic authentication
	 */
	user?: string | null;
	[k: string]: unknown;
}
/**
 * Serial number to give an NFT when minting
 */
export interface SerialNumber {
	/**
	 * optional number of the mint run this token will be minted in.  A mint run represents a batch of NFTs released at the same time.  So if a creator decided to make 100 copies of an NFT, they would all be part of mint run number 1.  If they sold quickly, and the creator wanted to rerelease that NFT, he could make 100 more copies which would all be part of mint run number 2.
	 */
	mint_run?: number | null;
	/**
	 * optional total number of NFTs minted on this run.  This is used to represent that this token is number m of n
	 */
	quantity_minted_this_run?: number | null;
	/**
	 * serial number (in this mint run).  This is used to serialize identical NFTs
	 */
	serial_number: number;
	[k: string]: unknown;
}
/**
 * token mint info used when doing a BatchMint
 */
export interface Mint {
	/**
	 * optional memo for the tx
	 */
	memo?: string | null;
	/**
	 * optional owner address, owned by the minter otherwise
	 */
	owner?: string | null;
	/**
	 * optional private metadata that can only be seen by owner and whitelist
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
	 * optional token id, if omitted, use current token index
	 */
	token_id?: string | null;
	/**
	 * optionally true if the token is transferable.  Defaults to true if omitted
	 */
	transferable?: boolean | null;
	[k: string]: unknown;
}
/**
 * token transfer info used when doing a BatchTransferNft
 */
export interface Transfer {
	/**
	 * optional memo for the tx
	 */
	memo?: string | null;
	/**
	 * recipient of the transferred tokens
	 */
	recipient: string;
	/**
	 * tokens being transferred
	 */
	token_ids: string[];
	[k: string]: unknown;
}
/**
 * a recipient contract's code hash and whether it implements BatchReceiveNft
 */
export interface ReceiverInfo {
	/**
	 * true if the contract also implements BacthReceiveNft.  Defaults to false if not specified
	 */
	also_implements_batch_receive_nft?: boolean | null;
	/**
	 * recipient's code hash
	 */
	recipient_code_hash: string;
	[k: string]: unknown;
}
/**
 * send token info used when doing a BatchSendNft
 */
export interface Send {
	/**
	 * recipient of the sent tokens
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
	 * optional code hash and BatchReceiveNft implementation status of the recipient contract
	 */
	receiver_info?: ReceiverInfo | null;
	/**
	 * tokens being sent
	 */
	token_ids: string[];
	[k: string]: unknown;
}
/**
 * token burn info used when doing a BatchBurnNft
 */
export interface Burn {
	/**
	 * optional memo for the tx
	 */
	memo?: string | null;
	/**
	 * tokens being burnt
	 */
	token_ids: string[];
	[k: string]: unknown;
}
export type ContractStatus = "normal" | "stop_transactions" | "stop_all";
/**
 * at the given point in time and after, Expiration will be considered expired
 */
export type Expiration =
	| {
		at_height: number;
	}
	| {
		at_time: number;
	}
	| "never";
/**
 * permission access level
 */
export type AccessLevel = "approve_token" | "all" | "revoke_token" | "none";


export interface Coin {
	amount: Uint128;
	denom: string;
	[k: string]: unknown;
}
/**
 * all royalty information
 */
export interface RoyaltyInfo {
	/**
	 * decimal places in royalty rates
	 */
	decimal_places_in_rates: number;
	/**
	 * list of royalties
	 */
	royalties: Royalty[];
	[k: string]: unknown;
}
/**
 * data for a single royalty
 */
export interface Royalty {
	/**
	 * royalty rate
	 */
	rate: number;
	/**
	 * address to send royalties to
	 */
	recipient: string;
	[k: string]: unknown;
}

/**
 * tx type and specifics
 */
export type TxAction =
	| {
		transfer: {
			/**
			 * previous owner
			 */
			from: Addr;
			/**
			 * new owner
			 */
			recipient: Addr;
			/**
			 * optional sender if not owner
			 */
			sender?: Addr | null;
			[k: string]: unknown;
		};
	}
	| {
		mint: {
			/**
			 * minter's address
			 */
			minter: Addr;
			/**
			 * token's first owner
			 */
			recipient: Addr;
			[k: string]: unknown;
		};
	}
	| {
		burn: {
			/**
			 * burner's address if not owner
			 */
			burner?: Addr | null;
			/**
			 * previous owner
			 */
			owner: Addr;
			[k: string]: unknown;
		};
	};

/**
 * CW721 Approval
 */
export interface Cw721Approval {
	/**
	 * expiration of this approval
	 */
	expires: Expiration;
	/**
	 * address that can transfer the token
	 */
	spender: Addr;
	[k: string]: unknown;
}
/**
 * SNIP721 Approval
 */
export interface Snip721Approval {
	/**
	 * whitelisted address
	 */
	address: Addr;
	/**
	 * optional expiration if the address has transfer permission
	 */
	transfer_expiration?: Expiration | null;
	/**
	 * optional expiration if the address has view owner permission
	 */
	view_owner_expiration?: Expiration | null;
	/**
	 * optional expiration if the address has view private metadata permission
	 */
	view_private_metadata_expiration?: Expiration | null;
	[k: string]: unknown;
}


/**
 * response of CW721 OwnerOf
 */
export interface Cw721OwnerOfResponse {
	/**
	 * list of addresses approved to transfer this token
	 */
	approvals: Cw721Approval[];
	/**
	 * Owner of the token if permitted to view it
	 */
	owner?: Addr | null;
	[k: string]: unknown;
}
/**
 * information about the minting of the NFT
 */
export interface MintRunInfo {
	/**
	 * optional address of the SNIP-721 contract creator
	 */
	collection_creator?: Addr | null;
	/**
	 * optional number of the mint run this token was minted in.  A mint run represents a batch of NFTs released at the same time.  So if a creator decided to make 100 copies of an NFT, they would all be part of mint run number 1.  If they sold quickly, and the creator wanted to rerelease that NFT, he could make 100 more copies which would all be part of mint run number 2.
	 */
	mint_run?: number | null;
	/**
	 * optional total number of NFTs minted on this run.  This is used to represent that this token is number m of n
	 */
	quantity_minted_this_run?: number | null;
	/**
	 * optional serial number in this mint run.  This is used to serialize identical NFTs
	 */
	serial_number?: number | null;
	/**
	 * optional time of minting (in seconds since 01/01/1970)
	 */
	time_of_minting?: number | null;
	/**
	 * optional address of this NFT's creator
	 */
	token_creator?: Addr | null;
	[k: string]: unknown;
}
/**
 * display all royalty information
 */
export interface DisplayRoyaltyInfo {
	/**
	 * decimal places in royalty rates
	 */
	decimal_places_in_rates: number;
	/**
	 * list of royalties
	 */
	royalties: DisplayRoyalty[];
	[k: string]: unknown;
}
/**
 * display for a single royalty
 */
export interface DisplayRoyalty {
	/**
	 * royalty rate
	 */
	rate: number;
	/**
	 * address to send royalties to.  Can be None to keep addresses private
	 */
	recipient?: Addr | null;
	[k: string]: unknown;
}
/**
 * the token id and nft dossier info of a single token response in a batch query
 */
export interface BatchNftDossierElement {
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
	token_id: string;
	/**
	 * true if this token is transferable
	 */
	transferable: boolean;
	/**
	 * true if this token is unwrapped (returns true if the contract does not have selaed metadata enabled)
	 */
	unwrapped: boolean;
	[k: string]: unknown;
}
/**
 * tx for display
 */
export interface Tx {
	/**
	 * tx type and specifics
	 */
	action: TxAction;
	/**
	 * the block containing this tx
	 */
	block_height: number;
	/**
	 * the time (in seconds since 01/01/1970) of the block containing this tx
	 */
	block_time: number;
	/**
	 * optional memo
	 */
	memo?: string | null;
	/**
	 * token id
	 */
	token_id: string;
	/**
	 * tx id
	 */
	tx_id: number;
	[k: string]: unknown;
}
/**
 * the address and viewing key making an authenticated query request
 */
export interface ViewerInfo {
	/**
	 * querying address
	 */
	address: string;
	/**
	 * authentication key string
	 */
	viewing_key: string;
	[k: string]: unknown;
}


