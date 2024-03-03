import { SecretNetworkClient } from "secretjs";
import { contractInfo as routerInfo } from '../../artifacts/shade/router-info';
import { contractInfo as batchQueryRouterInfo } from '../../artifacts/shade/batch_query_router-info';
import { Factory, Router, Shade } from "../../../modules/shade";
import { Snip20Deployment } from "../Snip20Deployment";
import { AdminDeployment } from "./AdminDeployment";
import { FactoryDeployment } from "./FactoryDeployment";
import { RouterDeployment } from "./RouterDeployment";
import { Snip20 } from "../../../modules/snip20";
import { setTimeout } from "timers/promises";


export interface ShadeDeploymentOptions {
	updateCurrent?: boolean, //Assumes false if not passed
}
export class ShadeDeployment {
	/**
	 * Secret Network client for interacting with the blockchain.
	 */
	protected secretjs: SecretNetworkClient;
	private NUM_SNIP_20s = 6
	private LP_TOKEN_DECIMALS = 18
	private AMOUNT_TO_MINT = 100000000
	private LIQUIDITY_TO_PROVIDE = 20000000
	constructor(secretjs: SecretNetworkClient) {
		this.secretjs = secretjs
	}

	public async deployContracts(options: ShadeDeploymentOptions): Promise<Shade> {
		const snip20Deployment = new Snip20Deployment(this.secretjs)
		const snip20s: Snip20[] = await snip20Deployment.deploySnip20AndMints(this.NUM_SNIP_20s,)
		const adminDeployment = new AdminDeployment(this.secretjs)
		const admin = await adminDeployment.deployContract({})

		const factoryDeployment = new FactoryDeployment(this.secretjs)
		const factory = await factoryDeployment.deployContract({
			admin_auth: admin.getContractInfo(),
			updateCurrent: options.updateCurrent,
		})


		await this.mintSnip20s(snip20s)
		await this.createAmmPairs(factory, snip20s)

		const routerDeployment = new RouterDeployment(this.secretjs)
		const router = await routerDeployment.deployContract({
			admin_auth: admin.getContractInfo(),
			updateCurrent: options.updateCurrent,
		})

		const shade: Shade = await Shade.init({
			routerInfo: router.getContractInfo(),
			factoryInfo: factory.getContractInfo(),
			batchQueryRouterInfo: batchQueryRouterInfo,
			secretjs: this.secretjs,
			shouldRegisterFactoryPairs: true
		})
		await this.provideLiquidity(shade);
		return shade
	}

	public async getCurrentDeployment(): Promise<Shade> {
		const routerDeployment = new RouterDeployment(this.secretjs)
		const router = routerDeployment.getCurrentDeployment()
		const factoryDeployment = new FactoryDeployment(this.secretjs)
		const factory = factoryDeployment.getCurrentDeployment()
		return await Shade.init({
			routerInfo: router.getContractInfo(),
			factoryInfo: factory.getContractInfo(),
			batchQueryRouterInfo: batchQueryRouterInfo,
			secretjs: this.secretjs
		})
	}

	private async mintSnip20s(snip20s: Snip20[]) {
		for (let snip20 of snip20s) {
			await snip20.mint(this.secretjs.address, `${this.AMOUNT_TO_MINT}`)
		}
	}

	private async createAmmPairs(factory: Factory, snip20s: Snip20[]): Promise<void> {
		if (snip20s.length < 2) {
			console.error("Need at least two SNIP20 tokens to create AMM pairs.");
			return;
		}

		// Assuming each SNIP20 contract can provide its ContractInfo via a getContractInfo method.
		const contractInfos = snip20s.map((snip20) => snip20.getContractInfo());

		for (let i = 0; i < contractInfos.length; i++) {
			const token1Info = contractInfos[i];
			const token2Info = contractInfos[(i + 1) % contractInfos.length]; // Wrap around to the first token for the last pair

			await factory.create_amm_pair(token1Info, token2Info, this.LP_TOKEN_DECIMALS);
		}
		return
	}
	private async provideLiquidity(shade: Shade) {
		const ammPairs = shade.getAmmPairs()
		for (let ammPair of ammPairs) {
			let snip20s = await ammPair.getSnip20s()
			for (let snip20 of snip20s) {
				await snip20.increaseAllowance(
					ammPair.getContractAddress(),
					`${this.LIQUIDITY_TO_PROVIDE}`
				)
			}
			await ammPair.add_liquidity(`${this.LIQUIDITY_TO_PROVIDE}`, `${this.LIQUIDITY_TO_PROVIDE}`)
		}
	}
}
