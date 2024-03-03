import { Uint128 } from "../../../../modules/shared/contract/types";
import { Fee, TokenPair, TokenType } from "../../common_types";





export interface CustomFee {
	lp_fee: Fee;
	shade_dao_fee: Fee;
	[k: string]: unknown;
}


export interface TokenPairAmount {
	amount_0: Uint128;
	amount_1: Uint128;
	pair: TokenPair;
	[k: string]: unknown;
}
