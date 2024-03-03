// config.ts
import { SecretNetworkClient, Wallet } from 'secretjs';

/**
 * Retrieves the CHAIN_ID environment variable.
 */
export function getChainId(): string {
    const chainId = process.env.CHAIN_ID;
    if (!chainId) {
        throw new Error("CHAIN_ID environment variable is missing!");
    }
    return chainId;
}

/**
 * Retrieves the RPC_URL environment variable.
 */
export function getRpcUrl(): string {
    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) {
        throw new Error("RPC_URL environment variable is missing!");
    }
    return rpcUrl;
}

/**
 * Retrieves the MNEMONIC environment variable.
 */
export function getMnemonic(): string {
    const mnemonic = process.env.MNEMONIC;
    if (!mnemonic) {
        throw new Error("MNEMONIC environment variable is missing!");
    }
    return mnemonic;
}

export function getSecretNetworkClient(): SecretNetworkClient {
    const chainId = getChainId();
    const rpcUrl = getRpcUrl();
    const mnemonic = getMnemonic();

    return new SecretNetworkClient({
        chainId: chainId,
        url: rpcUrl,
        wallet: new Wallet(mnemonic),
        walletAddress: new Wallet(mnemonic).address
    });
}
