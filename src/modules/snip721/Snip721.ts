import { SecretNetworkClient, TxResponse } from "secretjs";
import { All_nft_info_answer, All_nft_info_msg, All_tokens_msg, Batch_mint_nft_msg, Contract_config_answer, Contract_config_msg, Contract_info_answer, Contract_info_msg, ExecuteMsg, InstantiateMsg, Metadata, Mint, Mint_nft_answer, Mint_nft_msg, Minters_answer, Minters_msg, Nft_info_answer, Nft_info_msg, Num_tokens_answer, Num_tokens_msg, Owner_of_answer, Owner_of_msg, Private_metadata_answer, Private_metadata_msg, QueryAnswer, QueryMsg, ReceiverInfo, RoyaltyInfo, Send_nft_msg, SerialNumber, Set_viewing_key_msg, Token_list_answer, ViewerInfo } from "./types";
import { Contract, ContractFactory } from "../shared/contract/Contract";
import { Binary, ContractInfo } from "../shared";

export class Snip721 extends Contract<ExecuteMsg, QueryMsg, QueryAnswer> {
    constructor(snip721Info: ContractInfo, secretjs: SecretNetworkClient) {
        super(snip721Info.address, snip721Info.code_hash, secretjs);
    }

    async mint_nft(
        owner?: string,
        token_id?: string,
        public_metadata?: Metadata,
        private_metadata?: Metadata,
        memo?: string,
        serial_number?: SerialNumber,
        royalty_info?: RoyaltyInfo,
        transferable?: boolean
    ): Promise<TxResponse> {
        const msg: Mint_nft_msg = {
            mint_nft: {
                memo: memo,
                owner: owner,
                padding: await Contract.generatePadding(),
                private_metadata: private_metadata,
                public_metadata: public_metadata,
                royalty_info: royalty_info,
                serial_number: serial_number,
                token_id: token_id,
                transferable: transferable
            }
        };

        return await this.execute(msg);
    }

    async batch_mint_nft(
        mints: Mint[],
    ): Promise<TxResponse> {
        const msg: Batch_mint_nft_msg = {
            batch_mint_nft: {
                mints: mints,
                padding: await Contract.generatePadding()
            }
        };

        return await this.execute(msg);
    }

    async set_viewing_key(
        key: string
    ): Promise<TxResponse> {
        const msg: Set_viewing_key_msg = {
            set_viewing_key: {
                key: key,
                padding: await Contract.generatePadding()
            }
        };

        return await this.execute(msg);
    }

    async send_nft(
        address: string,
        token_id: string,
        memo?: string,
        msg_for_contract?: Binary,
        receiver_info?: ReceiverInfo,
        gasLimit: number = 100_000
    ): Promise<TxResponse> {
        const msg: Send_nft_msg = {
            send_nft: {
                contract: address,
                token_id: token_id,
                memo: memo,
                msg: msg_for_contract,
                padding: await Contract.generatePadding(),
                receiver_info: receiver_info
            }
        };

        return await this.execute(msg, gasLimit);
    }
    async query_contract_info(): Promise<Contract_info_answer> {
        const query: Contract_info_msg = {
            contract_info: {}
        }
        return (await this.query(query)) as Contract_info_answer
    }
    async contract_config(): Promise<Contract_config_answer> {
        const query: Contract_config_msg = {
            contract_config: {}
        }
        return (await this.query(query)) as Contract_config_answer
    }
    async minters(): Promise<Minters_answer> {
        const query: Minters_msg = {
            minters: {}
        }
        return (await this.query(query)) as Minters_answer
    }
    async num_tokens(viewer?: ViewerInfo): Promise<Num_tokens_answer> {
        const query: Num_tokens_msg = {
            num_tokens: {
                viewer: viewer
            }
        }
        return (await this.query(query)) as Num_tokens_answer
    }
    async token_list(limit?: number, start_after?: string, viewer?: ViewerInfo): Promise<Token_list_answer> {
        const query: All_tokens_msg = {
            all_tokens: {
                limit: limit,
                start_after: start_after,
                viewer: viewer
            }
        }
        return (await this.query(query)) as Token_list_answer
    }
    async owner_of(token_id: string, viewer?: ViewerInfo, include_expired?: boolean): Promise<Owner_of_answer> {
        const query: Owner_of_msg = {
            owner_of: {
                include_expired: include_expired,
                token_id: token_id,
                viewer: viewer
            }
        }
        return (await this.query(query)) as Owner_of_answer
    }

    async nft_info(token_id: string): Promise<Nft_info_answer> {
        const query: Nft_info_msg = {
            nft_info: {
                token_id: token_id
            }
        }
        return (await this.query(query)) as Nft_info_answer
    }
    async all_nft_info(token_id: string, viewer?: ViewerInfo, include_expired?: boolean): Promise<All_nft_info_answer> {
        const query: All_nft_info_msg = {
            all_nft_info: {
                include_expired: include_expired,
                token_id: token_id,
                viewer: viewer
            }
        }
        return (await this.query(query)) as All_nft_info_answer
    }
    async private_metadata(token_id: string, viewer?: ViewerInfo,): Promise<Private_metadata_answer> {
        const query: Private_metadata_msg = {
            private_metadata: {
                token_id: token_id,
                viewer: viewer
            }
        }
        return (await this.query(query)) as Private_metadata_answer
    }
}


export class Snip721Factory extends ContractFactory {

    async createSnip721(
        initMsg: InstantiateMsg,
        contractWasm: Buffer
    ): Promise<Snip721> {
        const contractInfo = await super.createContract<InstantiateMsg>(initMsg, contractWasm);

        return new Snip721(contractInfo, this.secretjs);
    }
}