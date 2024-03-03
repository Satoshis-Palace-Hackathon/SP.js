import { Binary, Uint128 } from "../../../modules/shared/contract/types";

export interface InstantiateMsg {
  admin?: string | null;
  config?: InitConfig | null;
  decimals: number;
  initial_balances?: InitialBalance[] | null;
  name: string;
  prng_seed: Binary;
  supported_denoms?: string[] | null;
  symbol: string;
  [k: string]: unknown;
}
/**
 * This type represents optional configuration values which can be overridden. All values are optional and have defaults which are more private by default, but can be overridden if necessary
 */
export interface InitConfig {
  /**
   * Indicated whether an admin can modify supported denoms default: False
   */
  can_modify_denoms?: boolean | null;
  /**
   * Indicates whether burn functionality should be enabled default: False
   */
  enable_burn?: boolean | null;
  /**
   * Indicates whether deposit functionality should be enabled default: False
   */
  enable_deposit?: boolean | null;
  /**
   * Indicates whether mint functionality should be enabled default: False
   */
  enable_mint?: boolean | null;
  /**
   * Indicates whether redeem functionality should be enabled default: False
   */
  enable_redeem?: boolean | null;
  /**
   * Indicates whether the total supply is public or should be kept secret. default: False
   */
  public_total_supply?: boolean | null;
  [k: string]: unknown;
}
export interface InitialBalance {
  address: string;
  amount: Uint128;
  [k: string]: unknown;
}
