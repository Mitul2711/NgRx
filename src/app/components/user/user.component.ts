import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReduxService } from 'src/app/services/redux.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: any;
  refresh: boolean = false;
  loading: Boolean = false;
  error: Boolean = false;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['Id', 'Name', 'userName', 'Email', 'WebSite'];

    constructor(private reduxService: ReduxService) {
    this.dataSource = new MatTableDataSource<any>(this.userData);
  }

  ngOnInit(): void {
    this.getData()
  }


  getData() {
    const observable$ = this.reduxService.getUserData(this.refresh);
    const userData$ = observable$[1];
    const loading$ = observable$[0];
    const error$ = observable$[2];

    userData$.subscribe(val => {
      this.userData = val;
      this.dataSource = this.userData;
    })

    loading$.subscribe(data => {
      this.loading = data;
    })

    error$.subscribe(data => {
      this.error = data;
    })

  }
 
  tryAgain() {
    this.reduxService.getUserData(true);
  }

}
