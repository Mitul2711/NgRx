import {  ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromUser from "./user-reducer";

export interface RootReducerState {
    users: fromUser.UserReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    users: fromUser.UserReducer
}

export const getUserState = (state : RootReducerState) => state.users;

export const getUserloaded = createSelector(getUserState, fromUser.getLoaded);
export const getUserloading = createSelector(getUserState, fromUser.getLoading);
export const getUsers = createSelector(getUserState, fromUser.getUsers);