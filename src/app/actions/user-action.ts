import { Action } from "@ngrx/store";
import { UserData } from "../models/userData";

export const USER_LIST_REQUEST = "user list request";
export const USER_LIST_SUCESS = "user list sucess";
export const USER_LIST_ERROR = "user list error";
export const USER_DELETE = "user delete";
export const USER_UPDATE = "user update";
export const USER_ADD = "user add";
// export const USER_LIST_FAILED = "user list failed";

export class UserListRequest implements Action {
  readonly type = USER_LIST_REQUEST;
}

export class UserListSuccess implements Action {
  readonly type = USER_LIST_SUCESS;

  constructor(public payload: { data: UserData[] }) { }
}

export class UserDeleteAction implements Action {
  readonly type = USER_DELETE;

  constructor(public payload: { id: number }) { }
}

export class UserUpdateAction implements Action {
  readonly type = USER_UPDATE;

  constructor(public payload: { id: number, data: UserData }) { }
}

export class UserAddAction implements Action {
  readonly type = USER_ADD;

  constructor(public payload: { data: UserData }) { }
}

export class UserListError implements Action {
  readonly type = USER_LIST_ERROR;
}

// export class UserListRequestAction {
//     readonly type = USER_LIST_REQUEST;
// }

export type UserAction = UserListRequest | UserListSuccess;