import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.api

  constructor(private httpClient: HttpClient, private router: Router) { }

  readUsers(): Observable<User[]> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.get<User[]>(`${this.apiUrl}/api/users/all`, {headers: headers})
  }

  addUser(firstName: string, lastName: string, email: string, password: string, canCreateUsers: boolean, canReadUsers: boolean, canUpdateUsers: boolean, canDeleteUsers: boolean): Observable<User> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.post<User>(
      `${this.apiUrl}/api/users`,
      {firstName: firstName, lastName: lastName, email: email, password: password, permissions: {canCreateUsers: canCreateUsers, canReadUsers: canReadUsers, canUpdateUsers: canUpdateUsers, canDeleteUsers: canDeleteUsers}},
      {headers: headers}
    )
  }

  updateUser(id: number, firstName: string, lastName: string, email: string, canCreateUsers: boolean, canReadUsers: boolean, canUpdateUsers: boolean, canDeleteUsers: boolean): Observable<User> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.put<User>(
      `${this.apiUrl}/api/users`,
      {id: id, firstName: firstName, lastName: lastName, email: email, permissions: {canCreateUsers: canCreateUsers, canReadUsers: canReadUsers, canUpdateUsers: canUpdateUsers, canDeleteUsers: canDeleteUsers}},
      {headers: headers}
    )
  }

  deleteUser(id: number): Observable<Object> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.delete(`${this.apiUrl}/api/users/${id}`, {headers: headers})
  }
}
