import { UserData } from "../models/userData";
import { UserAction } from '../actions/index-action';
import { USER_DELETE, USER_LIST_ERROR, USER_LIST_REQUEST, USER_LIST_SUCESS, UserListSuccess } from '../actions/user-action';


export interface UserReducerState {
    loading: Boolean,
    loaded: boolean,
    error: boolean,
    users: UserData[]
}

const initialState: UserReducerState = {
    loading: false,
    loaded: false,
    error: false,
    users: []
};

export function UserReducer(state = initialState, action: UserAction): UserReducerState {
    switch (action.type) {
        case USER_LIST_REQUEST: {
            return { ...state, loading: true };
        }
        case USER_LIST_SUCESS: {
            const updatedUser = state.users.concat((action as UserListSuccess).payload.data);
            return { ...state, loaded: true, loading: false, users: updatedUser, error: false };
        }
        case USER_LIST_ERROR: {
            return { ...state, error: true, loading: false }
        }
        case USER_DELETE: {
            const users = state.users.filter(data => data.id !== action.payload.id)
            return { ...state, ...{users} }
        }
        default: {
            return state;
        }
    }
}

export const getLoaded = (state: UserReducerState) => state.loaded;
export const getLoading = (state: UserReducerState) => state.loading;
export const getUsers = (state: UserReducerState) => state.users;
export const getError = (state: UserReducerState) => state.error;