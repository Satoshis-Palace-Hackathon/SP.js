import { SecretNetworkClient, TxResponse, TxResultCode } from 'secretjs';
import dotenv from 'dotenv';
import { getSecretNetworkClient } from '../../modules/shared/utils/config';
import { AdminDeployment } from "../../deployment"
import { Admin } from '../../modules/shade';

dotenv.config();

describe('Amm Pair Contract', () => {
	let secretjs: SecretNetworkClient;
	let admin: Admin;

	beforeAll(async () => {
		secretjs = getSecretNetworkClient()

		const adminDeployment = new AdminDeployment(secretjs)
		admin = await adminDeployment.deployContract({})
	});

	test('Contracts should be uploaded and instantiated', () => {
		expect(admin.getContractAddress()).toBeTruthy();
	});
});