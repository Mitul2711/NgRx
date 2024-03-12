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
import { ReduxService } from 'src/app/services/redux.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: any;
  refresh: boolean = false;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['Id', 'Name', 'userName', 'Email', 'WebSite'];

  constructor(private reduxService: ReduxService) {
    this.dataSource = new MatTableDataSource<any>(this.userData);
  }

  ngOnInit(): void {
    this.getData()
  }


  getData() {
    this.userData = this.reduxService.getUserData(this.refresh)[1];
    this.dataSource = this.userData;
  }

}
