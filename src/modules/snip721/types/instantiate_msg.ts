import { Binary } from "../../../modules/shared/contract/types";
import { Coin, RoyaltyInfo } from "./common_types";

/**
 * Instantiation message
 */
export interface InstantiateMsg {
	/**
	 * optional admin address, env.message.sender if missing
	 */
	admin?: string | null;
	/**
	 * optional privacy configuration for the contract
	 */
	config?: InstantiateConfig | null;
	/**
	 * entropy used for prng seed
	 */
	entropy: string;
	/**
	 * name of token contract
	 */
	name: string;
	/**
	 * optional callback message to execute after instantiation.  This will most often be used to have the token contract provide its address to a contract that instantiated it, but it could be used to execute any contract
	 */
	post_init_callback?: PostInstantiateCallback | null;
	/**
	 * optional royalty information to use as default when RoyaltyInfo is not provided to a minting function
	 */
	royalty_info?: RoyaltyInfo | null;
	/**
	 * token contract symbol
	 */
	symbol: string;
	[k: string]: unknown;
}
/**
 * This type represents optional configuration values. All values are optional and have defaults which are more private by default, but can be overridden if necessary
 */
export interface InstantiateConfig {
	/**
	 * Indicates whether burn functionality should be enabled default: False
	 */
	enable_burn?: boolean | null;
	/**
	 * indicates whether sealed metadata should be enabled.  If sealed metadata is enabled, the private metadata is not viewable by anyone, not even the owner, until the owner calls the Reveal function.  When Reveal is called, the sealed metadata is irreversibly moved to the public metadata (as default).  if unwrapped_metadata_is_private is set to true, it will remain as private metadata, but the owner will now be able to see it.  Anyone will be able to query the token to know that it has been unwrapped.  This simulates buying/selling a wrapped card that no one knows which card it is until it is unwrapped. If sealed metadata is not enabled, all tokens are considered unwrapped default:  False
	 */
	enable_sealed_metadata?: boolean | null;
	/**
	 * indicates whether a minter is permitted to update a token's metadata default: True
	 */
	minter_may_update_metadata?: boolean | null;
	/**
	 * indicates whether the owner of a token is permitted to update a token's metadata default: False
	 */
	owner_may_update_metadata?: boolean | null;
	/**
	 * indicates whether token ownership is public or private.  A user can still change whether the ownership of their tokens is public or private default: False
	 */
	public_owner?: boolean | null;
	/**
	 * indicates whether the token IDs and the number of tokens controlled by the contract are public.  If the token supply is private, only minters can view the token IDs and number of tokens controlled by the contract default: False
	 */
	public_token_supply?: boolean | null;
	/**
	 * indicates if the Reveal function should keep the sealed metadata private after unwrapping This config value is ignored if sealed metadata is not enabled default: False
	 */
	unwrapped_metadata_is_private?: boolean | null;
	[k: string]: unknown;
}

/**
 * info needed to perform a callback message after instantiation
 */
export interface PostInstantiateCallback {
	/**
	 * code hash of the contract to execute
	 */
	code_hash: string;
	/**
	 * address of the contract to execute
	 */
	contract_address: string;
	/**
	 * the callback message to execute
	 */
	msg: Binary;
	/**
	 * list of native Coin to send with the callback message
	 */
	send: Coin[];
	[k: string]: unknown;
}