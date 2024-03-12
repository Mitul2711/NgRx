import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Store } from '@ngrx/store';
import { RootReducerState, getUserloaded, getUserloading, getUsers } from '../reducers';
import { UserListRequest, UserListSuccess } from '../actions/user-action';
import { Observable, combineLatest } from 'rxjs';
import { UserData } from '../models/userData';

@Injectable({
  providedIn: 'root'
})
export class ReduxService {

  constructor(private apiService: ApiService, private store: Store<RootReducerState>) { }

  getUserData(refresh: boolean): [Observable<boolean>, Observable<UserData[]>] {

    const loading$ = this.store.select(getUserloading);
    const loaded$ = this.store.select(getUserloaded);
    const getUsersData = this.store.select(getUsers);

    combineLatest([loaded$, loading$]).subscribe(data => {
      if ((!data[0] && !data[1]) || refresh) {
        this.store.dispatch(new UserListRequest());
        this.apiService.getData().subscribe((res: any) => {
    
          this.store.dispatch(new UserListSuccess({ data: res }))
        })
      }
    })
    return [loaded$, getUsersData]
  }
}

  