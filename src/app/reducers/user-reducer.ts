import { UserData } from "../models/userData";
import { Action } from '@ngrx/store';
import { USER_LIST_REQUEST, USER_LIST_SUCESS, UserListSuccess } from '../actions/user-action';


export interface UserReducerState {
    loading: Boolean,
    loaded: boolean,
    users: UserData[]
}

const initialState: UserReducerState = {
    loading: false,
    loaded: false,
    users: []
};

export function UserReducer(state = initialState, action: Action): UserReducerState {
    switch (action.type) {
        case USER_LIST_REQUEST: {
            return { ...state, loading: true };
        }
        case USER_LIST_SUCESS: {
            const updatedUser = state.users.concat((action as UserListSuccess).payload.data);
            return { ...state, loaded: true, loading: false, users: updatedUser };
        }
        default: {
            return state;
        }
    }
}

export const getLoaded = (state: UserReducerState) => state.loaded;
export const getLoading = (state: UserReducerState) => state.loading;
export const getUsers = (state: UserReducerState) => state.users;