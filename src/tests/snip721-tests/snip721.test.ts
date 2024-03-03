import { SecretNetworkClient, Wallet, TxResponse } from 'secretjs';

import dotenv from 'dotenv';
import { All_nft_info_answer, Mint_nft_answer, Snip721, ViewerInfo, Viewing_key_answer } from "../../modules/snip721"
import { getSecretNetworkClient } from '../../modules/shared/utils/config';
import { Contract } from '../../modules/shared/contract/Contract';
import { Snip721Deployment } from "../../deployment"


dotenv.config();


describe('Snip721 Contract', () => {
    let secretjs: SecretNetworkClient;
    let snip721: Snip721;
    let viewingKey: string;

    beforeAll(async () => {
        secretjs = getSecretNetworkClient()
        const deployment = new Snip721Deployment(secretjs)
        snip721 = await deployment.deployContract({})
    });

    test('Contract should be uploaded and instantiated', () => {
        expect(snip721.getContractAddress()).toBeTruthy();
    });
    test('should successfully mint tokens', async () => {
        const token_id = "1"
        const txResponse: TxResponse = await snip721.mint_nft(secretjs.address, token_id)
        const mintAnswer: Mint_nft_answer = Contract.parseTransactionData<Mint_nft_answer>(txResponse)
        expect(mintAnswer.mint_nft.token_id).toBe(token_id)
    });
    test('should be able to set viewing key', async () => {
        viewingKey = "lsieujfvbnawpsioufbasldoiufbasdioufb"
        const txResponse: TxResponse = await snip721.set_viewing_key(viewingKey)
        const answer: Viewing_key_answer = Contract.parseTransactionData<Viewing_key_answer>(txResponse)
        expect(answer.viewing_key.key).toBe(viewingKey)
    });
    test('should be able to query all nft info', async () => {
        const token_id = "1"

        const viewer_info: ViewerInfo = {
            address: secretjs.address,
            viewing_key: viewingKey
        }
        const info: All_nft_info_answer = await snip721.all_nft_info(token_id, viewer_info)
        expect(info.all_nft_info.access.owner).toBe(secretjs.address)
    });
});