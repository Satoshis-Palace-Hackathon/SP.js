import * as fs from "fs"
import { SecretNetworkClient } from "secretjs";
import { Contract, ContractFactory } from "../modules/shared/contract/Contract";
import { ContractInfo } from "../modules/shared/contract/types";

/**
 * Abstract generic class for deploying blockchain contracts.
 * 
 * Type parameters:
 * @typeparam TContract - The contract type extending `Contract<any, any, any>`.
 * @typeparam TFactory - The factory type extending `ContractFactory`.
 */
export abstract class Deployment<TContract extends Contract<any, any, any>, TFactory extends ContractFactory> {
	/**
	 * Secret Network client for interacting with the blockchain.
	 */
	protected secretjs: SecretNetworkClient;

	/**
	 * Factory instance for creating contract instances.
	 */
	protected contractFactory: TFactory;

	/**
	 * Constructs a Deployment instance.
	 * 
	 * @param secretjs - The Secret Network client instance.
	 * @param factory - The factory instance for creating contract instances.
	 */
	constructor(secretjs: SecretNetworkClient, factory: TFactory) {
		this.secretjs = secretjs;
		this.contractFactory = factory;
	}

	/**
	 * Deploys a contract.
	 * 
	 * @returns A promise that resolves to a `TContract` instance.
	 */
	public abstract deployContract(options: any): Promise<TContract>;

	/**
	 * Retrieves the current deployment of the contract.
	 * @returns An instance of `TContract`.
	 */
	public abstract getCurrentDeployment(): TContract;

	/**
	 * Reads contract information from a JSON file.
	 * 
	 * @param filePath - The file path to the JSON file containing the contract information.
	 * @returns A `ContractInfo` object containing the parsed contract data.
	 * @throws Will throw an error if the file cannot be read or the content cannot be parsed.
	 */
	protected async readContractInfo(filePath: string): Promise<ContractInfo> {
		try {
			const module = await import(filePath);
			return module.contractInfo;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to read or parse contract info TS file (${filePath}): ${error.message}`);
			} else {
				console.error(error)
				throw new Error(`An unexpected error occurred while reading or parsing the contract info TS file (${filePath})`);
			}
		}
	}

	/**
	 * Writes contract information to a JSON file. 
	 * NODE environment only
	 * 
	 * @param filePath - The file path where the contract information should be saved.
	 * @param contractInfo - The contract information to be written to the file.
	 */
	protected writeContractInfo(filePath: string, contractInfo: ContractInfo) {
		const dataToWrite = `export const contractInfo = ${JSON.stringify(contractInfo, null, 2)};`;
		fs.writeFileSync(filePath, dataToWrite);
	}
}
