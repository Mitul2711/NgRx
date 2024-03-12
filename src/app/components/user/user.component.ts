import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<any>(this.userData);
   }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.apiService.getData().subscribe(val => {
      this.userData = val;
      this.dataSource.data = this.userData;
      console.log(this.userData);
    })
  }
  
}
