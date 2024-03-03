import { Addr, Uint128 } from "../../../modules/shared/contract/types";
import { ContractStatusLevel } from "./common_types";

export type QueryAnswer =
  | Token_info_answer
  | Token_config_answer
  | Contract_status_answer
  | Exchange_rate_answer
  | Allowance_answer
  | Allowances_given_answer
  | Allowances_received_answer
  | Balance_answer
  | Transfer_history_answer
  | Transaction_history_answer
  | Biewing_key_error
  | Minters_answer
  ;
export interface Token_info_answer {
  token_info: {
    decimals: number;
    name: string;
    symbol: string;
    total_supply?: Uint128 | null;
    [k: string]: unknown;
  };
}
export interface Token_config_answer {
  token_config: {
    burn_enabled: boolean;
    deposit_enabled: boolean;
    mint_enabled: boolean;
    public_total_supply: boolean;
    redeem_enabled: boolean;
    supported_denoms: string[];
    [k: string]: unknown;
  };
}
export interface Contract_status_answer {
  contract_status: {
    status: ContractStatusLevel;
    [k: string]: unknown;
  };
}
export interface Exchange_rate_answer {
  exchange_rate: {
    denom: string;
    rate: Uint128;
    [k: string]: unknown;
  };
}
export interface Allowance_answer {
  allowance: {
    allowance: Uint128;
    expiration?: number | null;
    owner: Addr;
    spender: Addr;
    [k: string]: unknown;
  };
}
export interface Allowances_given_answer {
  allowances_given: {
    allowances: AllowanceGivenResult[];
    count: number;
    owner: Addr;
    [k: string]: unknown;
  };
}
export interface Allowances_received_answer {
  allowances_received: {
    allowances: AllowanceReceivedResult[];
    count: number;
    spender: Addr;
    [k: string]: unknown;
  };
}
export interface Balance_answer {
  balance: {
    amount: Uint128;
    [k: string]: unknown;
  };
}
export interface Transfer_history_answer {
  transfer_history: {
    total?: number | null;
    txs: Tx[];
    [k: string]: unknown;
  };
}
export interface Transaction_history_answer {
  transaction_history: {
    total?: number | null;
    txs: ExtendedTx[];
    [k: string]: unknown;
  };
}
export interface Biewing_key_error {
  viewing_key_error: {
    msg: string;
    [k: string]: unknown;
  };
}
export interface Minters_answer {
  minters: {
    minters: Addr[];
    [k: string]: unknown;
  };
}

// TX Actions

export type TxAction =
  | transfer_tx_action
  | mint_tx_action
  | burn_tx_action
  | deposit_tx_action
  | redeem_tx_action
  | decoy_tx_action
  ;

export interface transfer_tx_action {
  transfer: {
    from: Addr;
    recipient: Addr;
    sender: Addr;
    [k: string]: unknown;
  };
}
export interface mint_tx_action {
  mint: {
    minter: Addr;
    recipient: Addr;
    [k: string]: unknown;
  };
}
export interface burn_tx_action {
  burn: {
    burner: Addr;
    owner: Addr;
    [k: string]: unknown;
  };
}
export interface deposit_tx_action {
  deposit: {
    [k: string]: unknown;
  };
}
export interface redeem_tx_action {
  redeem: {
    [k: string]: unknown;
  };
}
export interface decoy_tx_action {
  decoy: {
    address: Addr;
    [k: string]: unknown;
  };
}






//results
export interface AllowanceGivenResult {
  allowance: Uint128;
  expiration?: number | null;
  spender: Addr;
  [k: string]: unknown;
}
export interface AllowanceReceivedResult {
  allowance: Uint128;
  expiration?: number | null;
  owner: Addr;
  [k: string]: unknown;
}
export interface Tx {
  block_height?: number | null;
  block_time?: number | null;
  coins: Coin;
  from: Addr;
  id: number;
  memo?: string | null;
  receiver: Addr;
  sender: Addr;
  [k: string]: unknown;
}
export interface Coin {
  amount: Uint128;
  denom: string;
  [k: string]: unknown;
}
export interface ExtendedTx {
  action: TxAction;
  block_height: number;
  block_time: number;
  coins: Coin;
  id: number;
  memo?: string | null;
  [k: string]: unknown;
}