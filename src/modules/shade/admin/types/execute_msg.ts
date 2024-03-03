/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

import { AdminAuthStatus } from "./common_types";

export type ExecuteMsg =
  | Update_registry_msg
  | Update_registry_bulk_msg
  | Transfer_super_msg
  | Self_destruct_msg
  | Toggle_status_msg
  ;

//individual types
export interface Update_registry_msg {
  update_registry: {
    action: RegistryAction;
  };
}
export interface Update_registry_bulk_msg {
  update_registry_bulk: {
    actions: RegistryAction[];
  };
}
export interface Transfer_super_msg {
  transfer_super: {
    new_super: string;
  };
}
export interface Self_destruct_msg {
  self_destruct: {};
}
export interface Toggle_status_msg {
  toggle_status: {
    new_status: AdminAuthStatus;
  };
}




export type RegistryAction =
  | {
    register_admin: {
      user: string;
    };
  }
  | {
    grant_access: {
      permissions: string[];
      user: string;
    };
  }
  | {
    revoke_access: {
      permissions: string[];
      user: string;
    };
  }
  | {
    delete_admin: {
      user: string;
    };
  };
