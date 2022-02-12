import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Machine, Status} from "../model";

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private readonly apiUrl = environment.api

  constructor(private httpClient: HttpClient) { }

  getAllUserMachines(userId: number): Observable<Machine[]> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.get<Machine[]>(
      `${this.apiUrl}/api/machines/all/${userId}`,
      {headers: headers}
    )
  }

  createMachine(name: string, date: Date, active: boolean, status: Status): Observable<Machine> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.post<Machine>(
      `${this.apiUrl}/api/machines/${+localStorage.getItem('id')!}`,
      {name: name, date: date, status: status, active: active},
      {headers: headers}
    )
  }

  searchMachines(userId: number, name: string, statusRunning: boolean, statusStopped: boolean, dateFrom: string | null, dateTo: string | null): Observable<Machine[]> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.get<Machine[]>(
      `${this.apiUrl}/api/machines/search/${userId}?${this.fillParams(name, statusRunning, statusStopped, dateFrom, dateTo)}`,
      {headers: headers}
    )
  }

  startrMachine(machineId: number): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.patch(`${this.apiUrl}/api/machines/start/${machineId}`, {}, {headers: headers})
  }

  stopMachine(machineId: number): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.patch(`${this.apiUrl}/api/machines/stop/${machineId}`, {}, {headers: headers})
  }

  restartMachine(machineId: number): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.patch(`${this.apiUrl}/api/machines/restart/${machineId}`, {}, {headers: headers})
  }

  scheduleStart(id: number, date: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.patch(`${this.apiUrl}/api/machines/schedule/start/${id}`, {date: date}, {headers: headers})
  }

  scheduleStop(id: number, date: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.patch(`${this.apiUrl}/api/machines/schedule/stop/${id}`, {date: date}, {headers: headers})
  }

  scheduleRestart(id: number, date: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))
    return this.httpClient.patch(`${this.apiUrl}/api/machines/schedule/restart/${id}`, {date: date}, {headers: headers})
  }

  fillParams(name: string, statusRunning: boolean, statusStopped: boolean, dateFrom: string | null, dateTo: string | null): string {
    let params = '';
    if (name !== '') {
      params += `name=${name}`
    }
    let status = []
    if (statusRunning) {
      status.push('RUNNING')
    }
    if (statusStopped) {
      status.push('STOPPED')
    }
    if (status.length > 0) {
      params += `&status=${status.join(',')}`
    }
    if (dateFrom) {
      params += `&dateFrom=${dateFrom}`
    }
    if (dateTo) {
      params += `&dateTo=${dateTo}`
    }
    return params
  }
}
