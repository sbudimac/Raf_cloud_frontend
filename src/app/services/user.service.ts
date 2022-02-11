import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.api

  constructor(private httpClient: HttpClient) { }

  readUsers(): Observable<User[]> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.get<User[]>(`${this.apiUrl}/api/users/all`, {headers: headers})
  }

  addUser(firstName: string, lastName: string, email: string, password: string, canCreateUsers: boolean, canReadUsers: boolean, canUpdateUsers: boolean, canDeleteUsers: boolean, canCreateMachines: boolean, canSearchMachines: boolean, canStartMachines: boolean, canRestartMachines: boolean, canStopMachines: boolean, canDestroyMachines: boolean): Observable<User> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.post<User>(
      `${this.apiUrl}/api/users`,
      {firstName: firstName, lastName: lastName, email: email, password: password, permissions: {canCreateUsers: canCreateUsers, canReadUsers: canReadUsers, canUpdateUsers: canUpdateUsers, canDeleteUsers: canDeleteUsers, canCreateMachines, canSearchMachines, canStartMachines, canRestartMachines, canStopMachines, canDestroyMachines}},
      {headers: headers}
    )
  }

  updateUser(id: number, firstName: string, lastName: string, email: string, canCreateUsers: boolean, canReadUsers: boolean, canUpdateUsers: boolean, canDeleteUsers: boolean, canCreateMachines: boolean, canSearchMachines: boolean, canStartMachines: boolean, canRestartMachines: boolean, canStopMachines: boolean, canDestroyMachines: boolean): Observable<User> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.put<User>(
      `${this.apiUrl}/api/users`,
      {id: id, firstName: firstName, lastName: lastName, email: email, permissions: {canCreateUsers: canCreateUsers, canReadUsers: canReadUsers, canUpdateUsers: canUpdateUsers, canDeleteUsers: canDeleteUsers, canCreateMachines: canCreateMachines, canSearchMachines: canSearchMachines, canStartMachines: canStartMachines, canRestartMachines: canRestartMachines, canStopMachines: canStopMachines, canDestroyMachines: canDestroyMachines}},
      {headers: headers}
    )
  }

  deleteUser(id: number): Observable<Object> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.delete(`${this.apiUrl}/api/users/${id}`, {headers: headers})
  }
}
