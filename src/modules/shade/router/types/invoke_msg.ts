import { Uint128 } from "../../../shared";
import { Hop } from "./common_types";

export type InvokeMsg = {
	swap_tokens_for_exact: {
		expected_return?: Uint128 | null;
		path: Hop[];
		recipient?: string | null;
		[k: string]: unknown;
	};
};