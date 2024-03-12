import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl : string = "https://jsonplaceholder.typicode.com/users"

  getData() {
    return this.http.get(this.baseUrl);
  }
}
