import { SecretNetworkClient, TxResultCode } from 'secretjs';
import dotenv from 'dotenv';
import { Snip20 } from '../../modules/snip20';
import { getSecretNetworkClient } from '../../modules/shared/utils/config';
import { AdminDeployment, FactoryDeployment, Snip20Deployment } from "../../deployment"
import { Admin, Factory } from '../../modules/shade';

dotenv.config();

describe('Factory Contract', () => {
	let secretjs: SecretNetworkClient;
	let factory: Factory;
	let snip20_1: Snip20;
	let snip20_2: Snip20;
	let admin: Admin;


	beforeAll(async () => {
		secretjs = getSecretNetworkClient()

		const snip20Deployment = new Snip20Deployment(secretjs)
		snip20_1 = await snip20Deployment.deployContract({})
		snip20_2 = await snip20Deployment.deployContract({})

		const adminDeployment = new AdminDeployment(secretjs)
		admin = await adminDeployment.deployContract({})

		const factoryDeployment = new FactoryDeployment(secretjs)
		factory = await factoryDeployment.deployContract({
			admin_auth: admin.getContractInfo()
		})
	}, 70000);

	test('Contracts should be uploaded and instantiated', () => {
		expect(snip20_1.getContractAddress()).toBeTruthy();
		expect(snip20_2.getContractAddress()).toBeTruthy();
		expect(factory.getContractAddress()).toBeTruthy();
	});

	test('create amm pair', async () => {
		const tx = await factory.create_amm_pair(snip20_1.getContractInfo(), snip20_2.getContractInfo(), 18)
		expect(tx.code).toBe(TxResultCode.Success)
	});

	test('query amm pairs', async () => {
		const amm_pairs = await factory.list_amm_pairs()
		expect(amm_pairs.list_a_m_m_pairs.amm_pairs.length).toBe(1)
	});
});