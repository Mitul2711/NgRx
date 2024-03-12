import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { UserListRequest, UserListSuccess } from 'src/app/actions/user-action';
import { UserData } from 'src/app/models/userData';
import { RootReducerState, getUserloaded, getUserloading, getUsers } from 'src/app/reducers';
import { getLoading } from 'src/app/reducers/user-reducer';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: any;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['Id', 'Name', 'userName', 'Email', 'WebSite'];

  constructor(private apiService: ApiService, private store: Store<RootReducerState>) {
    this.dataSource = new MatTableDataSource<any>(this.userData);
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {

    const loading$ = this.store.select(getUserloading);
    const loaded$ = this.store.select(getUserloaded);
    const getUsers$ = this.store.select(getUsers);

    combineLatest([loaded$, loading$]).subscribe(data => {
      if (!data[0] && !data[1]) {
        this.store.dispatch(new UserListRequest());
        this.apiService.getData().subscribe((res: any) => {
          this.userData = res;
          this.dataSource.data = this.userData;
          this.store.dispatch(new UserListSuccess({data: res}))
        })
      }
    })

    getUsers$.subscribe(data => {
      this.userData = data;
      this.dataSource.data = this.userData;
      console.log(data);

    })
  }

}
