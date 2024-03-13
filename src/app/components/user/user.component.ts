import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ReduxService } from 'src/app/services/redux.service';
import { UpdateComponent } from '../update/update.component';
import { takeWhile } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  userData: any;
  refresh: boolean = false;
  loading: Boolean = false;
  error: Boolean = false;
  isAlive: boolean = true;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['Id', 'Name', 'userName', 'Email', 'WebSite', 'action'];

    constructor(private reduxService: ReduxService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>(this.userData);
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }

  ngOnInit(): void {
    this.getData()
  }


  getData() {
    const observable$ = this.reduxService.getUserData(this.refresh);
    const userData$ = observable$[1];
    const loading$ = observable$[0];
    const error$ = observable$[2];

    userData$.pipe(takeWhile(() => this.isAlive)).subscribe(val => {
      this.userData = val;
      this.dataSource = this.userData;
    })

    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.loading = data;
    })

    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.error = data;
    })

  }
 
  tryAgain() {
    this.reduxService.getUserData(true);
  }

  onDelete(id: any) {
    this.reduxService.deleteUser(id);
  }

  onEdit(data: any) {
    this.dialog.open(UpdateComponent, {
      data: data
    })
  }

  onAdd() {
    this.dialog.open(UpdateComponent)
  }

}
