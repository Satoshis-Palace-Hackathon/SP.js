import { Addr, Uint128 } from "../../../modules/shared/contract/types";


export type ExecuteAnswer =
  | Deposit_answer
  | Redeem_answer
  | Transfer_answer
  | Send_answer
  | Batch_transfer_answer
  | Batch_send_answer
  | Burn_answer
  | Register_receive_answer
  | Create_viewing_key_answer
  | Set_viewing_key_answer
  | Increase_allowance_answer
  | Decrease_allowance_answer
  | Transfer_from_answer
  | Send_from_answer
  | Batch_transfer_from_answer
  | Batch_send_from_answer
  | Burn_from_answer
  | Batch_burn_from_answer
  | Mint_answer
  | Batch_mint_answer
  | Add_minters_answer
  | Remove_minters_answer
  | Set_minters_answer
  | Change_admin_answer
  | Set_contract_status_answer
  | Remove_supported_denoms_answer
  | Revoke_permit_answer
  ;

export interface Deposit_answer {
  deposit: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Redeem_answer {
  redeem: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Transfer_answer {
  transfer: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Send_answer {
  send: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Batch_transfer_answer {
  batch_transfer: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Batch_send_answer {
  batch_send: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Burn_answer {
  burn: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Register_receive_answer {
  register_receive: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Create_viewing_key_answer {
  create_viewing_key: {
    key: string;
    [k: string]: unknown;
  };
}
export interface Set_viewing_key_answer {
  set_viewing_key: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Increase_allowance_answer {
  increase_allowance: {
    allowance: Uint128;
    owner: Addr;
    spender: Addr;
    [k: string]: unknown;
  };
}
export interface Decrease_allowance_answer {
  decrease_allowance: {
    allowance: Uint128;
    owner: Addr;
    spender: Addr;
    [k: string]: unknown;
  };
}
export interface Transfer_from_answer {
  transfer_from: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Send_from_answer {
  send_from: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Batch_transfer_from_answer {
  batch_transfer_from: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Batch_send_from_answer {
  batch_send_from: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Burn_from_answer {
  burn_from: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Batch_burn_from_answer {
  batch_burn_from: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Mint_answer {
  mint: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Batch_mint_answer {
  batch_mint: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Add_minters_answer {
  add_minters: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Remove_minters_answer {
  remove_minters: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Set_minters_answer {
  set_minters: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Change_admin_answer {
  change_admin: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Set_contract_status_answer {
  set_contract_status: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Remove_supported_denoms_answer {
  remove_supported_denoms: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export interface Revoke_permit_answer {
  revoke_permit: {
    status: ResponseStatus;
    [k: string]: unknown;
  };
}
export type ResponseStatus = "success" | "failure";
