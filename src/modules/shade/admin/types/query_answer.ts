import { Addr } from "../../../shared";
import { AdminAuthStatus } from "./common_types";


export type QueryMsgResponse =
	| ValidateAdminPermissionResponse
	| PermissionsResponse
	| AdminsResponse
	| ConfigResponse


export interface ValidateAdminPermissionResponse {
	has_permission: boolean;
}
export interface PermissionsResponse {
	permissions: string[];
}

export interface AdminsResponse {
	admins: Addr[];
}

export interface ConfigResponse {
	status: AdminAuthStatus;
	super_admin: Addr;
}
