// Contract.ts
import { SecretNetworkClient, TxResponse } from "secretjs";
import { Addr, CodeInfo, ContractInfo } from "./types";
import { DEFAULT_PADDING_LENGTH as DEFUALT_PADDING_LENGTH } from "./constants";


/**
 * Generic Contract class representing a smart contract with methods to interact with the Secret Network.
 * The generic types ExecuteMsg, QueryMsg, and QueryAnswer should be generated using `cargo schema`.
 */
export class Contract<ExecuteMsg extends object, QueryMsg extends object, QueryAnswer extends object> {
    private contractAddress: string;
    private contractCodeHash: string;
    private secretjs: SecretNetworkClient;

    /**
     * Constructs a new Contract instance.
     * @param address - The address of the smart contract.
     * @param code_hash - The code hash of the smart contract.
     * @param secretjs - Instance of SecretNetworkClient to interact with the Secret Network.
     */
    constructor(address: string, code_hash: string, secretjs: SecretNetworkClient) {
        this.contractAddress = address;
        this.contractCodeHash = code_hash;
        this.secretjs = secretjs;
    }

    /**
     * Executes a transaction on the smart contract.
     * @param executeMsg - The message for the contract execution.
     * @param gasLimit - The gas limit for the transaction (default: 100,000).
     * @returns A promise that resolves with the transaction response.
     */
    async execute(executeMsg: ExecuteMsg, gasLimit: number = 100_000): Promise<TxResponse> {
        if (!this.secretjs.address) {
            throw Error("Execute Error: Wallet not set.")
        }
        const tx: TxResponse = await this.secretjs.tx.compute.executeContract(
            {
                sender: this.secretjs.address,
                contract_address: this.contractAddress,
                msg: executeMsg,
                code_hash: this.contractCodeHash,
            },
            {
                gasLimit: gasLimit
            }
        );
        return tx;
    }

    /**
     * Queries the smart contract.
     * @param queryMsg - The query message for the contract.
     * @returns A promise that resolves with the query answer.
     */
    async query(queryMsg: QueryMsg): Promise<QueryAnswer> {
        try {
            const response = await this.secretjs.query.compute.queryContract({
                contract_address: this.contractAddress,
                code_hash: this.contractCodeHash,
                query: queryMsg
            });

            if (typeof response === 'string') {
                throw new Error(response);
            }

            return response as QueryAnswer;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Query failed: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

    /**
     * Retrieves the contract's address on the Secret Network.
     * @returns The contract address.
     */
    public getContractAddress(): Addr {
        return this.contractAddress
    }

    /**
     * Retrieves the LCD (Light Client Daemon) endpoint from the `secretjs` object.
     * The LCD endpoint is used for interacting with the blockchain, enabling actions such as querying data and submitting transactions.
     * This method is private and intended for internal use within the class.
     * @returns {string} The URL of the LCD endpoint.
     */
    protected getLCDEndpoint(): string {
        return (this.secretjs as any).url;
    }

    /**
     * Fetches the chain ID from the `secretjs` object.
     * The chain ID is a unique identifier for the blockchain network, ensuring transactions are signed and submitted to the correct network.
     * This method is private and designed for use within the class to obtain blockchain-specific configuration details.
     * @returns {string} The chain ID of the blockchain.
     */
    protected getChainId(): string {
        return (this.secretjs as any).chainId;
    }

    /**
     * Retrieves the contract's code hash.
     * This hash uniquely identifies the contract's code on the Secret Network.
     * @returns The contract code hash.
     */
    public getContractCodeHash(): string {
        return this.contractCodeHash
    }

    /**
     * Retrieves the contract's code hash.
     * This hash uniquely identifies the contract's code on the Secret Network.
     * @returns The contract code hash.
     */
    public getSecretjs(): SecretNetworkClient {
        return this.secretjs
    }

    public getContractInfo(): ContractInfo {
        const contractInfo: ContractInfo = {
            code_hash: this.contractCodeHash,
            address: this.contractAddress
        }
        return contractInfo;
    }

    /**
     * Retrieves the wallet address associated with the SecretNetworkClient instance.
     * This is the address used to deploy or interact with the contract.
     * @returns The wallet address.
     */
    public getWalletAddress(): string {
        return this.secretjs.address
    }

    /**
     * Uploads the contract's WebAssembly bytecode to the Secret Network.
     * @param secretjs - Instance of SecretNetworkClient to interact with the Secret Network.
     * @param contract_wasm - The smart contract's WebAssembly bytecode.
     * @param gasLimit - The gas limit for the transaction (default: 4,000,000).
     * @returns A promise that resolves with the code information of the uploaded contract.
     */
    public static async upload_contract(secretjs: SecretNetworkClient, contract_wasm: Buffer, gasLimit: number = 4_000_000): Promise<CodeInfo> {
        const tx: TxResponse = await secretjs.tx.compute.storeCode(
            {
                sender: secretjs.address,
                wasm_byte_code: contract_wasm,
                source: "",
                builder: "",
            },
            {
                gasLimit: gasLimit,
            }
        );
        const codeId = tx.arrayLog?.find(
            (log) => log.type === "message" && log.key === "code_id"
        )?.value;

        if (!codeId) {
            console.error(tx)
            throw new Error(`Failed to upload code, transaction: ${tx}`)
        }

        const contractCodeHash = (
            await secretjs.query.compute.codeHashByCodeId({ code_id: codeId })
        ).code_hash;

        if (!contractCodeHash) {
            throw new Error("Failed to upload code")
        }

        const code_info: CodeInfo = {
            codeId: codeId,
            contractCodeHash: contractCodeHash
        }
        return code_info;
    }

    /**
     * Instantiates a smart contract on the Secret Network.
     * @param secretjs - Instance of SecretNetworkClient to interact with the Secret Network.
     * @param codeId - The ID of the uploaded contract code.
     * @param contractCodeHash - The code hash of the uploaded contract.
     * @param initMsg - The initialization message for the contract.
     * @param gasLimit - The gas limit for the instantiation transaction (default: 4,000,000).
     * @returns A promise that resolves with the address of the instantiated contract.
     */
    public static async instantiate_contract<InitMsg extends object>(
        secretjs: SecretNetworkClient,
        codeId: string,
        contractCodeHash: string,
        initMsg: InitMsg,
        gasLimit: number = 4_000_000
    ): Promise<string> {
        const tx: TxResponse = await secretjs.tx.compute.instantiateContract(
            {
                code_id: codeId,
                sender: secretjs.address,
                code_hash: contractCodeHash,
                init_msg: initMsg,
                label: "SP_Contract_" + Math.ceil(Math.random() * 10000000),
            },
            {
                gasLimit: gasLimit,
            }
        );
        // Find the contract_address in the logs
        const contractAddress = tx.arrayLog?.find(
            (log: { type: string; key: string; }) => log.type === "message" && log.key === "contract_address"
        )?.value ?? null;

        if (!contractAddress) {
            console.error(`Error Instantiating Contract txResponse:${tx}`)
            throw new Error(`Contract Failed to instantiate:${tx}`)
        }
        return contractAddress;
    }

    /**
     * Parses the transaction data from a `TxResponse` object into a specified type.
     *
     * This method is designed to extract and parse the transaction data contained
     * in the `data` field of a `TxResponse` object. The transaction data is expected
     * to be an array of `Uint8Array` objects, which are converted into a JSON string.
     * The method then attempts to parse this JSON string into an object of the specified type.
     *
     * @typeparam IntoType The type into which the transaction data is to be parsed. 
     *                      This type extends from `object` and is expected to match
     *                      the structure of the parsed JSON data.
     * @param tx The transaction response object, containing the data to be parsed.
     * @returns The parsed transaction data as an object of type `IntoType`.
     * @throws {Error} Throws an error if the JSON object start is not found in the
     *                 transaction data string, or if the data cannot be parsed into
     *                 valid JSON.
     *
     * Example usage:
     * ```typescript
     * const txResponse: TxResponse = ... // some transaction response
     * const parsedData: YourCustomType = TransactionParser.parseTransactionData<YourCustomType>(txResponse);
     * ```
     *
     * Note: Since TypeScript's type system is compile-time only, this method does
     * not perform runtime type checking. It's the responsibility of the caller to
     * ensure that the expected type (`IntoType`) matches the structure of the parsed
     * JSON data.
     */
    public static parseTransactionData<IntoType extends object>(
        tx: TxResponse
    ): IntoType {
        const transaction_data: Uint8Array[] = tx.data;
        let transactionJsonString: string = transaction_data.map(buffer => buffer.toString()).join('');
        const jsonStartIndex = transactionJsonString.indexOf('{');
        if (jsonStartIndex === -1) {
            throw new Error(`No JSON object start found in transaction data: ${transactionJsonString}`);
        }
        transactionJsonString = transactionJsonString.substring(jsonStartIndex);

        try {
            return JSON.parse(transactionJsonString) as IntoType;
        } catch (e) {
            throw new Error(`Failed to parse transaction data as JSON: ${e}`);
        }
    }

    /**
     * Generates a cryptography-grade random string for padding.
     * This method works in both browser and Node.js environments.
     * Can be used for padding
     *
     * @param length The length of the random string.
     * @returns A promise that resolves to a random string of the specified length.
     */
    public static async generatePadding(length: number = DEFUALT_PADDING_LENGTH): Promise<string> {
        return this.generateRandomString(length)
    }

    /**
     * Generates a cryptography-grade random string for Entropy.
     * This method works in both browser and Node.js environments.
     * Can be used for padding
     *
     * @param length The length of the random string.
     * @returns A promise that resolves to a random string of the specified length.
     */
    public static async generateEntropy(length: number = DEFUALT_PADDING_LENGTH): Promise<string> {
        return this.generateRandomString(length)
    }

    /**
     * Generates a cryptography-grade random string.
     * This method works in both browser and Node.js environments.
     * Can be used for padding
     *
     * @param length The length of the random string.
     * @returns A promise that resolves to a random string of the specified length.
     */
    private static async generateRandomString(length: number): Promise<string> {
        let randomValues: Uint8Array;

        if (typeof window !== 'undefined' && window.crypto) {
            // Browser environment
            randomValues = window.crypto.getRandomValues(new Uint8Array(length));
        } else {
            // Node.js environment
            const crypto = await import('crypto');
            randomValues = crypto.randomBytes(length);
        }

        // Convert the byte array to a hexadecimal string
        return Array.from(randomValues).map(b => b.toString(16).padStart(2, '0')).join('');
    }
}

/**
 * Factory class for creating and deploying smart contracts.
 */
export class ContractFactory {
    protected secretjs: SecretNetworkClient;
    private lastCodeInfo?: CodeInfo;
    private lastContractInfo?: ContractInfo;

    /**
     * Constructs a new ContractFactory instance.
     * @param secretjs - Instance of SecretNetworkClient to interact with the Secret Network.
     */
    constructor(secretjs: SecretNetworkClient) {
        this.secretjs = secretjs;
    }

    /**
     * Creates and deploys a smart contract.
     * @param initMsg - The initialization message for the smart contract.
     * @param contractWasm - The smart contract's WebAssembly bytecode.
     * @returns A promise that resolves with information about the deployed contract.
     */
    async createContract<InitMsg extends object>(
        initMsg: InitMsg,
        contractWasm: Buffer
    ): Promise<ContractInfo> {
        // Upload the contract Wasm and store the code info
        const codeInfo = await Contract.upload_contract(this.secretjs, contractWasm);
        this.lastCodeInfo = codeInfo;

        // Instantiate the contract with the provided init message
        const contractAddress = await this.instantiateContract<InitMsg>(
            codeInfo.codeId,
            codeInfo.contractCodeHash,
            initMsg
        );

        // Store and return the contract creation information
        this.lastContractInfo = {
            code_hash: codeInfo.contractCodeHash,
            address: contractAddress
        };

        return this.lastContractInfo;
    }

    async instantiateFromLastCode<InitMsg extends object>(initMsg: InitMsg): Promise<ContractInfo> {
        if (!this.lastCodeInfo) {
            throw new Error("No code has been uploaded yet. Please call createContract first.");
        }

        // Use the last uploaded contract's code info to instantiate a new contract
        const contractAddress = await this.instantiateContract<InitMsg>(
            this.lastCodeInfo.codeId,
            this.lastCodeInfo.contractCodeHash,
            initMsg
        );

        // Update only the last contract address since the code remains the same
        this.lastContractInfo = {
            code_hash: this.lastCodeInfo.contractCodeHash,
            address: contractAddress
        };

        return this.lastContractInfo;
    }

    private async instantiateContract<InitMsg extends object>(
        codeId: string,
        contractCodeHash: string,
        initMsg: InitMsg
    ): Promise<string> {
        // Use the SecretNetworkClient to instantiate the contract with the given code ID and initialization message
        return await Contract.instantiate_contract<InitMsg>(
            this.secretjs,
            codeId,
            contractCodeHash,
            initMsg
        );
    }
    /**
     * Retrieves the code information of the last created contract.
     * @returns The code information or undefined if no contract has been created.
     */
    getLastCodeInfo(): CodeInfo | undefined {
        return this.lastCodeInfo;
    }

    /**
     * Retrieves the contract information of the last created contract.
     * @returns The contract information or undefined if no contract has been created.
     */
    getLastContractInfo(): ContractInfo | undefined {
        return this.lastContractInfo;
    }
}
