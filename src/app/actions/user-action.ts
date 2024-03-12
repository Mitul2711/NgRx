import { Action } from "@ngrx/store";
import { UserData } from "../models/userData";

export const USER_LIST_REQUEST = "user list request";
export const USER_LIST_SUCESS = "user list sucess";
// export const USER_LIST_FAILED = "user list failed";

export class UserListRequest implements Action {
    readonly type = USER_LIST_REQUEST;
  }
  
  export class UserListSuccess implements Action {
    readonly type = USER_LIST_SUCESS;
  
    constructor(public payload: { data: UserData }) {}
  }

// export class UserListRequestAction {
//     readonly type = USER_LIST_REQUEST;
// }

export type UserAction = UserListRequest | UserListSuccess;