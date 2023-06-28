import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as api from './apiUrls';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }

  public getEmployees():Observable<any>
  {
   return this.httpClient.get<any>(api.getEmployees);
  }

  public addEmployee(emp:any):Observable<any>{
    return this.httpClient.post<any>(api.addEmployee,emp);
  }
  public updateEmployee(emp:any):Observable<any>{
    return this.httpClient.post<any>(api.updateEmployee,emp);
  }
  public deleteEmployee(id:number):Observable<any>
  {
   return this.httpClient.get<any>(api.deleteEmployee+id);
  }
}
