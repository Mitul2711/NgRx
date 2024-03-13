import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Store } from '@ngrx/store';
import { RootReducerState, getUserError, getUserloaded, getUserloading, getUsers } from '../reducers/index-reducer';
import { UserAddAction, UserDeleteAction, UserListError, UserListRequest, UserListSuccess, UserUpdateAction } from '../actions/user-action';
import { Observable, combineLatest, take } from 'rxjs';
import { UserData } from '../models/userData';
import { getError } from '../reducers/user-reducer';

@Injectable({
  providedIn: 'root'
})
export class ReduxService {

  constructor(private apiService: ApiService, private store: Store<RootReducerState>) { }

  getUserData(refresh: boolean): [Observable<Boolean>, Observable<UserData[]>, Observable<Boolean>] {

    const loading$ = this.store.select(getUserloading);
    const loaded$ = this.store.select(getUserloaded);
    const getUsersData$ = this.store.select(getUsers);
    const getError$ = this.store.select(getUserError);

    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe(data => {
      if ((!data[0] && !data[1]) || refresh) {
        this.store.dispatch(new UserListRequest());
        this.apiService.getData().subscribe((res: any) => {
          this.store.dispatch(new UserListSuccess({ data: res }))
        }, error => {
          this.store.dispatch(new UserListError());
        })
      }
    })
    return [loading$, getUsersData$, getError$]
  }

  deleteUser(id: any) {
    this.store.dispatch(new UserDeleteAction({id}));
  }

  updateUser(data: any) {
    this.store.dispatch(new UserUpdateAction(data));
  }

  addUser(data: any) {
    this.store.dispatch(new UserAddAction(data));
  }
   
}

  