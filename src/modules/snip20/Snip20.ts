import { SecretNetworkClient, TxResponse, } from "secretjs";
import BigNumber from "bignumber.js";
import { ExecuteMsg, QueryAnswer, QueryMsg, Balance, Balance_answer, Mint, Send, Exchange_rate, Exchange_rate_answer, Token_info_answer, Token_info, InstantiateMsg, Minters_answer, Mint_answer, Set_viewing_key, Increase_allowance, Decrease_allowance } from "./types";
import { Addr, Contract, ContractFactory, ContractInfo, Uint128 } from "../shared";


export class Snip20 extends Contract<ExecuteMsg, QueryMsg, QueryAnswer> {
    constructor(snip20Info: ContractInfo, secretjs: SecretNetworkClient) {
        super(snip20Info.address, snip20Info.code_hash, secretjs);
    }

    async execute(executeMsg: ExecuteMsg, gasLimit: number = 100_000): Promise<TxResponse> {
        return (await super.execute(executeMsg, gasLimit));
    }

    async balance(viewingKey: string): Promise<string> {
        const balanceQuery: Balance = {
            balance: {
                address: this.getWalletAddress(),
                key: viewingKey
            }
        }
        const balanceAnswer: Balance_answer = (await this.query(balanceQuery)) as Balance_answer
        return balanceAnswer.balance.amount;
    }

    // async balanceFormattedDecimals(viewingKey: string, decimals: number = 3): Promise<string> {
    //     const balance: string = await this.balance(viewingKey)
    //     const snip20Decimals: number = await this.decimals()
    //     const formattedBalance = (balance / snip20Decimals).toFixed(decimals).toString()
    //     return formattedBalance
    // }

    async mint(recipient: string, amount: string): Promise<TxResponse> {
        const mintExecute: Mint = {
            mint: {
                recipient: recipient,
                amount: amount,
                memo: undefined,
                decoys: undefined,
                entropy: undefined,
                padding: undefined
            }
        }

        return await this.execute(mintExecute)
    }
    async set_viewing_key(key: string): Promise<TxResponse> {
        const msg: Set_viewing_key = {
            set_viewing_key: {
                key,
                padding: await Contract.generatePadding()
            }
        }

        return await this.execute(msg)
    }

    async send(recipient: string, amount: string, recipientCodeHash?: string, msg?: any, gasLimit: number = 100_000): Promise<TxResponse> {

        const encodedMsg = Buffer.from(JSON.stringify(msg)).toString('base64');

        const sendMsg: Send = {
            send: {
                recipient: recipient,
                recipient_code_hash: recipientCodeHash,
                amount: amount,
                msg: encodedMsg,
                memo: undefined,
                decoys: undefined,
                entropy: undefined,
                padding: await Contract.generatePadding()
            }
        }
        return this.execute(sendMsg, gasLimit);
    }

    async exchangeRate(): Promise<string> {
        const exchangeRateQuery: Exchange_rate = {
            exchange_rate: {}
        }
        const exchangeRateAnswer: Exchange_rate_answer = (await this.query(exchangeRateQuery)) as Exchange_rate_answer

        return exchangeRateAnswer.exchange_rate.rate;
    }

    async tokenInfo(): Promise<Token_info_answer> {
        const tokenInfoQuery: Token_info = {
            token_info: {}
        }
        const tokenInfoAnswer: Token_info_answer = (await this.query(tokenInfoQuery)) as Token_info_answer

        return tokenInfoAnswer;
    }
    async decimals(): Promise<number> {
        const token_info: Token_info_answer = await this.tokenInfo()
        return token_info.token_info.decimals;
    }

    // Convert base token amount to its minimum denomination
    async baseToMinDenom(baseAmount: string): Promise<string> {
        const tokenDecimals: number = await this.decimals();

        const baseAmountBig = new BigNumber(baseAmount);
        const multiplier = new BigNumber(10).pow(tokenDecimals);
        const minDenomAmount = baseAmountBig.times(multiplier);

        // Returning as a string to avoid floating point issues
        return minDenomAmount.toFixed();
    }

    // Convert from minimum denomination to base token amount
    async minDenomToBase(minDenomAmount: string): Promise<string> {
        const tokenDecimals: number = await this.decimals();

        const minDenomAmountBig = new BigNumber(minDenomAmount);
        const divisor = new BigNumber(10).pow(tokenDecimals);
        const baseAmount = minDenomAmountBig.dividedBy(divisor);

        // Returning as a string to avoid floating point issues
        return baseAmount.toFixed(tokenDecimals); // Maintain the original precision
    }

    async increaseAllowance(spender: Addr, amount: Uint128, expiration?: number): Promise<TxResponse> {
        let msg: Increase_allowance = {
            increase_allowance: {
                amount,
                expiration,
                padding: await Contract.generatePadding(),
                spender
            }
        }
        return this.execute(msg)
    }

    async decreaseAllowance(spender: Addr, amount: Uint128, expiration?: number): Promise<TxResponse> {
        let msg: Decrease_allowance = {
            decrease_allowance: {
                amount,
                expiration,
                padding: await Contract.generatePadding(),
                spender
            }
        }
        return this.execute(msg)
    }
}

export class Snip20Factory extends ContractFactory {

    async createSnip20(initMsg: InstantiateMsg, contractWasm: Buffer): Promise<Snip20> {
        const contractInfo: ContractInfo = await this.createContract<InstantiateMsg>(initMsg, contractWasm)
        return new Snip20(contractInfo, this.secretjs);
    }
}