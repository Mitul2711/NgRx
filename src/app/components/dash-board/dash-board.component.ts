import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  userData: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getData()
  } 

  getData() {  
   this.apiService.getData().subscribe(val => {
    this.userData = val;
    console.log(this.userData);
   })
  }


}
