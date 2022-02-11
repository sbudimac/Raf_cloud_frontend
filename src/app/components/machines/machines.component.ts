import {Component, OnInit} from '@angular/core';
import {Machine, Status} from "../../model";
import {MachineService} from "../../services/machine.service";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  machines: Machine[]
  name: string
  statusRunning: boolean
  statusStopped: boolean
  dateFrom!: Date
  dateTo!: Date
  userId: number

  constructor(private machineService: MachineService) {
    this.machines = []
    this.name = ''
    this.statusRunning = false
    this.statusStopped = false
    this.dateFrom
    this.dateTo
    this.userId = +localStorage.getItem('id')!
  }

  ngOnInit(): void {
    this.machineService.getAllUserMachines(this.userId).subscribe((machines) =>{
      this.machines = machines
    }, (error => {
      if (error.status === 403) {
        alert("You are not authorized to perform this action.")
      }
    }))
  }

  searchMachines(): void {
    this.machineService.searchMachines(this.userId, this.name, this.statusRunning, this.statusStopped, this.formatDate(this.dateFrom), this.formatDate(this.dateTo)).subscribe((machines) => {
      this.machines = machines
    }, (error => {
      if (error.status === 403) {
        alert("You are not authorized to perform this action.")
      }
    }))
  }

  formatDate(date: Date) {
    if (date === undefined) {
      return null
    } else if (date.toString() === '') {
      return null
    }
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
}
