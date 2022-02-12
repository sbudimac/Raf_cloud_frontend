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
  scheduleFor!: string

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

  hasStartMachinesPermission(): boolean {
    return localStorage.getItem('startMachines') === 'true'
  }

  hasRestartMachinesPermission(): boolean {
    return localStorage.getItem('restartMachines') === 'true'
  }

  hasStopMachinesPermission(): boolean {
    return localStorage.getItem('stopMachines') === 'true'
  }

  hasDestroyMachinesPermission(): boolean {
    return localStorage.getItem('destroyMachines') === 'true'
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

  startMachine(id: number): void {
    this.machineService.startrMachine(id).subscribe( () => {
      alert("Machine is started")
      this.machineService.getAllUserMachines(this.userId).subscribe( (machines) => {
        this.machines = machines
        setTimeout( () => {
          this.machineService.getAllUserMachines(this.userId).subscribe( (machines) => {
            this.machines = machines
          })
        }, 15000)
      })
      }
    )
  }

  stopMachine(id: number): void {
    this.machineService.stopMachine(id).subscribe( () => {
        alert("Machine is stopped")
        this.machineService.getAllUserMachines(this.userId).subscribe( (machines) => {
          this.machines = machines
          setTimeout( () => {
            this.machineService.getAllUserMachines(this.userId).subscribe( (machines) => {
              this.machines = machines
            })
          }, 15000)
        })
      }
    )
  }

  restartMachine(id: number): void {
    this.machineService.restartMachine(id).subscribe( () => {
        alert("Machine has begun a restart")
        this.machineService.getAllUserMachines(this.userId).subscribe( (machines) => {
          this.machines = machines
          setTimeout( () => {
            this.machineService.getAllUserMachines(this.userId).subscribe( (machines) => {
              this.machines = machines
            })
          }, 30000)
        })
      }
    )
  }

  scheduleStart(id: number) {
    if (this.scheduleFor === undefined) {
      alert("No schedule date selected.")
      return
    } else if (this.scheduleFor.toString() === '') {
      alert("No schedule date selected.")
      return
    }
    this.machineService.scheduleStart(id, this.scheduleFor.replace('T', ' ')).subscribe( () => {
      alert("Operation scheduled.")
    })
  }

  scheduleStop(id: number) {
    if (this.scheduleFor === undefined) {
      alert("No schedule date selected.")
      return
    } else if (this.scheduleFor.toString() === '') {
      alert("No schedule date selected.")
      return
    }
    this.machineService.scheduleStop(id, this.scheduleFor.replace('T', ' ')).subscribe( () => {
      alert("Operation scheduled.")
    })
  }

  scheduleRestart(id: number) {
    if (this.scheduleFor === undefined) {
      alert("No schedule date selected.")
      return
    } else if (this.scheduleFor.toString() === '') {
      alert("No schedule date selected.")
      return
    }
    this.machineService.scheduleRestart(id, this.scheduleFor.replace('T', ' ')).subscribe( () => {
      alert("Operation scheduled.")
    })
  }

  destroyMachine(id: number): void {
    this.machineService.destroyMachine(id).subscribe( () => {
      this.machineService.getAllUserMachines(this.userId).subscribe( (machines) => {
        this.machines = machines
      })
    })
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
