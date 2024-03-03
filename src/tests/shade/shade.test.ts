import { SecretNetworkClient, TxResultCode } from 'secretjs';
import dotenv from 'dotenv';
import { getSecretNetworkClient } from '../../modules/shared/utils/config';
import { ShadeDeployment } from "../../deployment"
import { Shade } from '../../modules/shade';
import BigNumber from 'bignumber.js';

dotenv.config();

describe('Shade Abstraction', () => {
	let secretjs: SecretNetworkClient;
	let shade: Shade


	beforeAll(async () => {
		secretjs = getSecretNetworkClient()

		const shadeDeployment = new ShadeDeployment(secretjs)
		// shade = await shadeDeployment.deployContracts({ updateCurrent: true }) // Run with fresh contract and save (takes 3+ mins)
		shade = await shadeDeployment.getCurrentDeployment() // Run with old contract
	}, 320000);

	test('Contracts should be uploaded and instantiated', () => {
		expect(shade.getFactory().getContractAddress()).toBeTruthy();
		expect(shade.getRouter().getContractAddress()).toBeTruthy();
		expect(shade.getAmmPairs().length).toBeGreaterThan(0)
	});

	test('get possible paths', async () => {
		const snip20s = await shade.getAmmPairs()[0].getSnip20s()
		const paths = await shade.getPossiblePaths(snip20s[0].getContractAddress(), snip20s[1].getContractAddress())
		expect(paths.length).toBe(1)
	});

	test('get routes', async () => {
		const snip20s = await shade.getAmmPairs()[0].getSnip20s()
		const routes = await shade.getRoutes(
			snip20s[0].getContractAddress(),
			snip20s[1].getContractAddress(),
			new BigNumber(1)
		)
		expect(routes.length).toBe(1)
	});

	test('swap', async () => {
		const snip20s = await shade.getAmmPairs()[0].getSnip20s()
		const routes = await shade.getRoutes(
			snip20s[0].getContractAddress(),
			snip20s[1].getContractAddress(),
			new BigNumber(10000)
		)
		expect(routes.length).toBe(1)

		const tx = await shade.swap(routes[0])
		expect(tx.code).toBe(TxResultCode.Success)
	});
});