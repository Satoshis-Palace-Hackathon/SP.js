import { Addr, Binary, Uint128 } from "../../../modules/shared/contract/types";
import { ContractStatusLevel } from "./common_types";
export type ExecuteMsg =
  | Redeem
  | Deposit
  | Transfer
  | Send
  | Batch_transfer
  | Batch_send
  | Burn
  | Register_receive
  | Create_viewing_key
  | Set_viewing_key
  | Increase_allowance
  | Decrease_allowance
  | Transfer_from
  | Send_from
  | Batch_transfer_from
  | Batch_send_from
  | Burn_from
  | Batch_burn_from
  | Mint
  | Batch_mint
  | Add_minters
  | Remove_minters
  | Set_minters
  | Change_admin
  | Set_contract_status
  | Add_supported_denoms
  | Remove_supported_denoms
  | Revoke_permit
  ;




export interface Redeem {
  redeem: {
    amount: Uint128;
    decoys?: Addr[] | null;
    denom?: string | null;
    entropy?: Binary | null;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Deposit {
  deposit: {
    decoys?: Addr[] | null;
    entropy?: Binary | null;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Transfer {
  transfer: {
    amount: Uint128;
    decoys?: Addr[] | null;
    entropy?: Binary | null;
    memo?: string | null;
    padding?: string | null;
    recipient: string;
    [k: string]: unknown;
  };
}
export interface Send {
  send: {
    amount: Uint128;
    decoys?: Addr[] | null;
    entropy?: Binary | null;
    memo?: string | null;
    msg?: Binary | null;
    padding?: string | null;
    recipient: string;
    recipient_code_hash?: string | null;
    [k: string]: unknown;
  };
}
export interface Batch_transfer {
  batch_transfer: {
    actions: TransferAction[];
    entropy?: Binary | null;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Batch_send {
  batch_send: {
    actions: SendAction[];
    entropy?: Binary | null;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Burn {
  burn: {
    amount: Uint128;
    decoys?: Addr[] | null;
    entropy?: Binary | null;
    memo?: string | null;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Register_receive {
  register_receive: {
    code_hash: string;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Create_viewing_key {
  create_viewing_key: {
    entropy: string;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Set_viewing_key {
  set_viewing_key: {
    key: string;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Increase_allowance {
  increase_allowance: {
    amount: Uint128;
    expiration?: number | null;
    padding?: string | null;
    spender: string;
    [k: string]: unknown;
  };
}
export interface Decrease_allowance {
  decrease_allowance: {
    amount: Uint128;
    expiration?: number | null;
    padding?: string | null;
    spender: string;
    [k: string]: unknown;
  };
}
export interface Transfer_from {
  transfer_from: {
    amount: Uint128;
    decoys?: Addr[] | null;
    entropy?: Binary | null;
    memo?: string | null;
    owner: string;
    padding?: string | null;
    recipient: string;
    [k: string]: unknown;
  };
}
export interface Send_from {
  send_from: {
    amount: Uint128;
    decoys?: Addr[] | null;
    entropy?: Binary | null;
    memo?: string | null;
    msg?: Binary | null;
    owner: string;
    padding?: string | null;
    recipient: string;
    recipient_code_hash?: string | null;
    [k: string]: unknown;
  };
}
export interface Batch_transfer_from {
  batch_transfer_from: {
    actions: TransferFromAction[];
    entropy?: Binary | null;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Batch_send_from {
  batch_send_from: {
    actions: SendFromAction[];
    entropy?: Binary | null;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Burn_from {
  burn_from: {
    amount: Uint128;
    decoys?: Addr[] | null;
    entropy?: Binary | null;
    memo?: string | null;
    owner: string;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Batch_burn_from {
  batch_burn_from: {
    actions: BurnFromAction[];
    entropy?: Binary | null;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Mint {
  mint: {
    amount: Uint128;
    decoys?: Addr[] | null;
    entropy?: Binary | null;
    memo?: string | null;
    padding?: string | null;
    recipient: string;
    [k: string]: unknown;
  };
}
export interface Batch_mint {
  batch_mint: {
    actions: MintAction[];
    entropy?: Binary | null;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Add_minters {
  add_minters: {
    minters: string[];
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Remove_minters {
  remove_minters: {
    minters: string[];
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Set_minters {
  set_minters: {
    minters: string[];
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Change_admin {
  change_admin: {
    address: string;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Set_contract_status {
  set_contract_status: {
    level: ContractStatusLevel;
    padding?: string | null;
    [k: string]: unknown;
  };
}
export interface Add_supported_denoms {
  add_supported_denoms: {
    denoms: string[];
    [k: string]: unknown;
  };
}
export interface Remove_supported_denoms {
  remove_supported_denoms: {
    denoms: string[];
    [k: string]: unknown;
  };
}
export interface Revoke_permit {
  revoke_permit: {
    padding?: string | null;
    permit_name: string;
    [k: string]: unknown;
  };
}

export interface TransferAction {
  amount: Uint128;
  decoys?: Addr[] | null;
  memo?: string | null;
  recipient: string;
  [k: string]: unknown;
}
export interface SendAction {
  amount: Uint128;
  decoys?: Addr[] | null;
  memo?: string | null;
  msg?: Binary | null;
  recipient: string;
  recipient_code_hash?: string | null;
  [k: string]: unknown;
}
export interface TransferFromAction {
  amount: Uint128;
  decoys?: Addr[] | null;
  memo?: string | null;
  owner: string;
  recipient: string;
  [k: string]: unknown;
}
export interface SendFromAction {
  amount: Uint128;
  decoys?: Addr[] | null;
  memo?: string | null;
  msg?: Binary | null;
  owner: string;
  recipient: string;
  recipient_code_hash?: string | null;
  [k: string]: unknown;
}
export interface BurnFromAction {
  amount: Uint128;
  decoys?: Addr[] | null;
  memo?: string | null;
  owner: string;
  [k: string]: unknown;
}
export interface MintAction {
  amount: Uint128;
  decoys?: Addr[] | null;
  memo?: string | null;
  recipient: string;
  [k: string]: unknown;
}
