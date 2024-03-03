import { Snip20, Snip20Factory, InstantiateMsg } from "../../../modules/snip20";

export class LPToken extends Snip20 {
}

export class LPTokenFactory extends Snip20Factory {

	async createLPTokenContract(initMsg: InstantiateMsg, contractWasm: Buffer): Promise<LPToken> {
		return (await super.createSnip20(initMsg, contractWasm)) as LPToken
	}
}