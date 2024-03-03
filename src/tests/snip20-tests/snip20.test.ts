import { SecretNetworkClient, TxResponse } from 'secretjs';

import dotenv from 'dotenv';
import { Increase_allowance_answer, Mint_answer, Set_viewing_key_answer, Snip20, Token_info_answer } from "../../modules/snip20"
import { Contract } from '../../modules/shared/contract';
import { getSecretNetworkClient } from '../../modules/shared/utils/config';
import { Snip20Deployment } from "../../deployment"

dotenv.config();



describe('Snip20 Contract', () => {
	let secretjs: SecretNetworkClient;
	let snip20: Snip20;
	let viewingKey: string;

	beforeAll(async () => {
		secretjs = getSecretNetworkClient()
		const deployment = new Snip20Deployment(secretjs)
		snip20 = await deployment.deployContract({})
	});

	test('Contract should be uploaded and instantiated', () => {
		expect(snip20.getContractAddress()).toBeTruthy();
	});
	test('should successfully mint tokens', async () => {
		const txResponse: TxResponse = await snip20.mint(secretjs.address, "1")
		const mintAnswer: Mint_answer = Contract.parseTransactionData<Mint_answer>(txResponse)
		expect(mintAnswer.mint.status).toBe("success")
	});
	test('should be able to set viewing key', async () => {
		viewingKey = "lsieujfvbnawpsioufbasldoiufbasdioufb"
		const txResponse: TxResponse = await snip20.set_viewing_key(viewingKey)
		const answer: Set_viewing_key_answer = Contract.parseTransactionData<Set_viewing_key_answer>(txResponse)
		expect(answer.set_viewing_key.status).toBe("success")
	});
	test('should be able to query balance', async () => {
		const balance: string = await snip20.balance(viewingKey)
		expect(balance).toBe("1") //See mint amount
	});
	test('should be able to query tokeninfo', async () => {
		const tokenInfo: Token_info_answer = await snip20.tokenInfo()
		expect(tokenInfo.token_info.decimals).toBeTruthy()
		expect(tokenInfo.token_info.name).toBeTruthy()
		expect(tokenInfo.token_info.symbol).toBeTruthy()
		expect(tokenInfo.token_info.total_supply).toBe("1")// See mint amount
	});
	test('increase allowance', async () => {
		const tx: TxResponse = await snip20.increaseAllowance("secret1qakk63eqmhcewe23sypajtef3jfjcf65z882am", "1")
		const answer: Increase_allowance_answer = Contract.parseTransactionData<Increase_allowance_answer>(tx)
		expect(answer.increase_allowance.allowance).toBeTruthy()
		expect(answer.increase_allowance.owner).toBeTruthy()
		expect(answer.increase_allowance.spender).toBeTruthy()
	});
	test('decrease allowance', async () => {
		const tx: TxResponse = await snip20.increaseAllowance("secret1qakk63eqmhcewe23sypajtef3jfjcf65z882am", "1")
		const answer: Increase_allowance_answer = Contract.parseTransactionData<Increase_allowance_answer>(tx)
		expect(answer.increase_allowance.allowance).toBeTruthy()
		expect(answer.increase_allowance.owner).toBeTruthy()
		expect(answer.increase_allowance.spender).toBeTruthy()
	});

});