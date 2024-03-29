/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

import { Addr, Uint128, ContractInfo } from "../../../../modules/shared/contract/types";
import { CustomFee } from "./common_types";
import { Fee, SwapResult, TokenPair } from "../../common_types";

export type QueryMsgResponse =
  | Get_pair_info_response
  | Get_trade_history_response
  | Get_white_list_address_response
  | Get_trade_count_response
  | Get_claim_reward_response
  | Get_estimated_price_response
  | Swap_simulation_response
  | Get_shade_dao_info_response
  | Get_estimated_liquidity_response
  | Get_config_response

// Individual responses
export interface Get_pair_info_response {
  get_pair_info: {
    amount_0: Uint128;
    amount_1: Uint128;
    contract_version: number;
    factory?: ContractInfo | null;
    fee_info: FeeInfo;
    liquidity_token: ContractInfo;
    pair: TokenPair;
    total_liquidity: Uint128;
    [k: string]: unknown;
  };
}
export interface Get_trade_history_response {
  get_trade_history: {
    data: TradeHistory[];
    [k: string]: unknown;
  };
}
export interface Get_white_list_address_response {
  get_white_list_address: {
    addresses: Addr[];
    [k: string]: unknown;
  };
}
export interface Get_trade_count_response {
  get_trade_count: {
    count: number;
    [k: string]: unknown;
  };
}
export interface Get_claim_reward_response {
  get_claim_reward: {
    amount: Uint128;
    [k: string]: unknown;
  };
}
export interface Get_estimated_price_response {
  get_estimated_price: {
    estimated_price: string;
    [k: string]: unknown;
  };
}
export interface Swap_simulation_response {
  swap_simulation: {
    lp_fee_amount: Uint128;
    price: string;
    result: SwapResult;
    shade_dao_fee_amount: Uint128;
    total_fee_amount: Uint128;
    [k: string]: unknown;
  };
}
export interface Get_shade_dao_info_response {
  get_shade_dao_info: {
    admin_auth: ContractInfo;
    lp_fee: Fee;
    shade_dao_address: string;
    shade_dao_fee: Fee;
    [k: string]: unknown;
  };
}
export interface Get_estimated_liquidity_response {
  get_estimated_liquidity: {
    lp_token: Uint128;
    total_lp_token: Uint128;
    [k: string]: unknown;
  };
}
export interface Get_config_response {
  get_config: {
    custom_fee?: CustomFee | null;
    factory_contract?: ContractInfo | null;
    lp_token: ContractInfo;
    pair: TokenPair;
    staking_contract?: ContractInfo | null;
    [k: string]: unknown;
  };
}







// Base Types
export interface FeeInfo {
  lp_fee: Fee;
  shade_dao_address: Addr;
  shade_dao_fee: Fee;
  [k: string]: unknown;
}

export interface TradeHistory {
  amount_in: Uint128;
  amount_out: Uint128;
  direction: string;
  height: number;
  lp_fee_amount: Uint128;
  price: string;
  shade_dao_fee_amount: Uint128;
  timestamp: number;
  total_fee_amount: Uint128;
  [k: string]: unknown;
}

