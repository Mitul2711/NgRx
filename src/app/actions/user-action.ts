import { UserData } from "../models/userData";

export const USER_LIST_REQUEST = "user list request";
export const USER_LIST_SUCESS = "user list sucess";
export const USER_LIST_FAILED = "user list failed";

export class UserListRequestAction {
    readonly type = USER_LIST_REQUEST;
}

export class UserListSuccessAction {
    readonly type = USER_LIST_SUCESS;

    constructor(payload: {data: UserData}) {}
}

// export class UserListRequestAction {
//     readonly type = USER_LIST_REQUEST;
// }