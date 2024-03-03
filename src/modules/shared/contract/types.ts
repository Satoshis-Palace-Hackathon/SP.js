
export interface ContractInfo {
    code_hash: string,
    address: string,
}

export interface CodeInfo {
    codeId: string,
    contractCodeHash: string
}

/**
 * Binary is a wrapper around Vec<u8> to add base64 de/serialization with serde. It also adds some helper methods to help encode inline.
 *
 * This is only needed as serde-json-{core,wasm} has a horrible encoding for Vec<u8>. See also <https://github.com/CosmWasm/cosmwasm/blob/main/docs/MESSAGE_TYPES.md>.
 */
export type Binary = string;
/**
 * A thin wrapper around u128 that is using strings for JSON encoding/decoding, such that the full u128 range can be used for clients that convert JSON numbers to floats, like JavaScript and jq.
 *
 * # Examples
 *
 * Use `from` to create instances of this and `u128` to get the value out:
 *
 * ``` # use cosmwasm_std::Uint128; let a = Uint128::from(123u128); assert_eq!(a.u128(), 123);
 *
 * let b = Uint128::from(42u64); assert_eq!(b.u128(), 42);
 *
 * let c = Uint128::from(70u32); assert_eq!(c.u128(), 70); ```
 */
export type Uint128 = string;

/**
 * A human readable address.
 *
 * In Cosmos, this is typically bech32 encoded. But for multi-chain smart contracts no assumptions should be made other than being UTF-8 encoded and of reasonable length.
 *
 * This type represents a validated address. It can be created in the following ways 1. Use `Addr::unchecked(input)` 2. Use `let checked: Addr = deps.api.addr_validate(input)?` 3. Use `let checked: Addr = deps.api.addr_humanize(canonical_addr)?` 4. Deserialize from JSON. This must only be done from JSON that was validated before such as a contract's state. `Addr` must not be used in messages sent by the user because this would result in unvalidated instances.
 *
 * This type is immutable. If you really need to mutate it (Really? Are you sure?), create a mutable copy using `let mut mutable = Addr::to_string()` and operate on that `String` instance.
 */
export type Addr = string;

export interface PermitFor_TokenPermissions {
    params: PermitParamsFor_TokenPermissions;
    signature: PermitSignature;
    [k: string]: unknown;
}
export interface PermitParamsFor_TokenPermissions {
    allowed_tokens: string[];
    chain_id: string;
    permissions: TokenPermissions[];
    permit_name: string;
    [k: string]: unknown;
}
export interface PermitSignature {
    pub_key: PubKey;
    signature: Binary;
    [k: string]: unknown;
}

export interface PubKey {
    /**
     * ignored, but must be "tendermint/PubKeySecp256k1" otherwise the verification will fail
     */
    type: string;
    /**
     * Secp256k1 PubKey
     */
    value: Binary;
    [k: string]: unknown;
}
export type TokenPermissions = "allowance" | "balance" | "history" | "owner";
