import { InitialState } from "@ngrx/store/src/models";
import { UserData } from "../models/userData";
import { Action } from "../actions";
import { USER_LIST_REQUEST, USER_LIST_SUCESS } from "../actions/user-action";

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

export function UserReducer(state = initialState, action: Action ): UserReducerState {

    switch(action.type) {
        case USER_LIST_REQUEST: {
            return {...state, loading: true}
        }
        case USER_LIST_SUCESS: {
            const updatedUser = state.users.concat(action.payload.data);
            return {...state, loaded: true, loading: false, users: updatedUser}
        }
        default: {
            return state;
        }
    }
}

const getLoaded = (state: UserReducerState) => state.loaded;
const getLoading = (state: UserReducerState) => state.loading;
const getUsers = (state: UserReducerState) => state.users;