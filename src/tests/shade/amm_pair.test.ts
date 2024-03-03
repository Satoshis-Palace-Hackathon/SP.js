import { SecretNetworkClient, TxResponse, TxResultCode } from 'secretjs';
import dotenv from 'dotenv';
import { Increase_allowance_answer, Mint_answer, Snip20 } from '../../modules/snip20';
import { getSecretNetworkClient } from '../../modules/shared/utils/config';
import { Contract } from '../../modules/shared';
import { AmmPairDeployment, Snip20Deployment } from "../../deployment"
import { AmmPair } from '../../modules/shade';

dotenv.config();

describe('Amm Pair Contract', () => {
	let secretjs: SecretNetworkClient;
	let amm_pair: AmmPair;
	let snip20_1: Snip20;
	let snip20_2: Snip20;

	beforeAll(async () => {
		secretjs = getSecretNetworkClient()

		const snip20Deployment = new Snip20Deployment(secretjs)
		snip20_1 = await snip20Deployment.deployContract({})
		snip20_2 = await snip20Deployment.deployContract({})

		const ammPairDeployment = new AmmPairDeployment(secretjs)
		amm_pair = await ammPairDeployment.deployContract({
			token1: snip20_1.getContractInfo(),
			token2: snip20_2.getContractInfo(),
			admin_auth: {
				code_hash: secretjs.address, // Hopefully they dont check this is a person
				address: secretjs.address
			}
		})
	});

	test('Contracts should be uploaded and instantiated', () => {
		expect(snip20_1.getContractAddress()).toBeTruthy();
		expect(snip20_2.getContractAddress()).toBeTruthy();
		expect(amm_pair.getContractAddress()).toBeTruthy();
	});

	test('mint', async () => {
		const tx1: TxResponse = await snip20_1.mint(secretjs.address, "1000")
		const answer1: Mint_answer = Contract.parseTransactionData<Mint_answer>(tx1)
		expect(answer1.mint.status).toBe("success")

		const tx2: TxResponse = await snip20_2.mint(secretjs.address, "1000")
		const answer2: Mint_answer = Contract.parseTransactionData<Mint_answer>(tx2)
		expect(answer2.mint.status).toBe("success")
	});

	test('increase allowances', async () => {
		const tx1: TxResponse = await snip20_1.increaseAllowance(amm_pair.getContractAddress(), "10")
		const answer1: Increase_allowance_answer = Contract.parseTransactionData<Increase_allowance_answer>(tx1)
		expect(answer1.increase_allowance.allowance).toBeTruthy()
		expect(answer1.increase_allowance.owner).toBeTruthy()
		expect(answer1.increase_allowance.spender).toBeTruthy()

		const tx2: TxResponse = await snip20_2.increaseAllowance(amm_pair.getContractAddress(), "10")
		const answer2: Increase_allowance_answer = Contract.parseTransactionData<Increase_allowance_answer>(tx2)
		expect(answer2.increase_allowance.allowance).toBeTruthy()
		expect(answer2.increase_allowance.owner).toBeTruthy()
		expect(answer2.increase_allowance.spender).toBeTruthy()
	});

	test('add_liquidity', async () => {
		const tx = await amm_pair.add_liquidity("10", "10");
		expect(tx.code).toBe(TxResultCode.Success)
	});
});