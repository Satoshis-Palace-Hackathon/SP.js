import { PermitFor_TokenPermissions } from "../../../modules/shared/contract/types";

export type QueryMsg =
  | Token_info
  | Token_config
  | Contract_status
  | Exchange_rate
  | Allowance
  | Allowances_given
  | Allowances_received
  | Balance
  | Transfer_history
  | Transaction_history
  | Minters
  | With_permit
  ;
export interface Token_info {
  token_info: {
    [k: string]: unknown;
  };
};
export interface Token_config {
  token_config: {
    [k: string]: unknown;
  };
}
export interface Contract_status {
  contract_status: {
    [k: string]: unknown;
  };
}
export interface Exchange_rate {
  exchange_rate: {
    [k: string]: unknown;
  };
}
export interface Allowance {
  allowance: {
    key: string;
    owner: string;
    spender: string;
    [k: string]: unknown;
  };
}
export interface Allowances_given {
  allowances_given: {
    key: string;
    owner: string;
    page?: number | null;
    page_size: number;
    [k: string]: unknown;
  };
}
export interface Allowances_received {
  allowances_received: {
    key: string;
    page?: number | null;
    page_size: number;
    spender: string;
    [k: string]: unknown;
  };
}
export interface Balance {
  balance: {
    address: string;
    key: string;
    [k: string]: unknown;
  };
}
export interface Transfer_history {
  transfer_history: {
    address: string;
    key: string;
    page?: number | null;
    page_size: number;
    should_filter_decoys: boolean;
    [k: string]: unknown;
  };
}
export interface Transaction_history {
  transaction_history: {
    address: string;
    key: string;
    page?: number | null;
    page_size: number;
    should_filter_decoys: boolean;
    [k: string]: unknown;
  };
}
export interface Minters {
  minters: {
    [k: string]: unknown;
  };
}
export interface With_permit {
  with_permit: {
    permit: PermitFor_TokenPermissions;
    query: QueryWithPermit;
    [k: string]: unknown;
  };
}
// Query with Permit Queries
export type QueryWithPermit =
  | allowance_with_permit
  | allowances_given_with_permit
  | allowances_received_with_permit
  | balance_with_permit
  | transfer_history_with_permit
  | transaction_history_with_permit
  ;
export interface allowance_with_permit {
  allowance: {
    owner: string;
    spender: string;
    [k: string]: unknown;
  };
}
export interface allowances_given_with_permit {
  allowances_given: {
    owner: string;
    page?: number | null;
    page_size: number;
    [k: string]: unknown;
  };
}
export interface allowances_received_with_permit {
  allowances_received: {
    page?: number | null;
    page_size: number;
    spender: string;
    [k: string]: unknown;
  };
}
export interface balance_with_permit {
  balance: {
    [k: string]: unknown;
  };
}
export interface transfer_history_with_permit {
  transfer_history: {
    page?: number | null;
    page_size: number;
    should_filter_decoys: boolean;
    [k: string]: unknown;
  };
}
export interface transaction_history_with_permit {
  transaction_history: {
    page?: number | null;
    page_size: number;
    should_filter_decoys: boolean;
    [k: string]: unknown;
  };
}
