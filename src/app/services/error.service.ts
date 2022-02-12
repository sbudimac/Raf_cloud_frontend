import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ErrorMessage} from "../model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private readonly apiUrl = environment.api

  constructor(private httpClient: HttpClient) { }

  getErrors(userId: number): Observable<ErrorMessage[]> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.get<ErrorMessage[]>(`${this.apiUrl}/api/error/${userId}`, {headers: headers})
  }
}
