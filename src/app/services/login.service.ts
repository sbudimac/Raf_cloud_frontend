import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {LoginResponse, PermissionResponse} from "../model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = environment.api

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/auth/login`, {email: email, password: password});
  }

  getPermissions(): Observable<PermissionResponse> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
    return this.httpClient.get<PermissionResponse>(`${this.apiUrl}/auth/permissions`, {headers: headers})
  }
}
