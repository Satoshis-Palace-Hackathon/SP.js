import { ContractInfo } from "../../../shared/contract/types";
import { Fee } from "../../common_types";

export interface AMMSettings {
	lp_fee: Fee;
	shade_dao_address: ContractInfo;
	shade_dao_fee: Fee;
	[k: string]: unknown;
}