import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MachineService} from "../../services/machine.service";
import {Router} from "@angular/router";
import {Status} from "../../model";

@Component({
  selector: 'app-machine-creation',
  templateUrl: './machine-creation.component.html',
  styleUrls: ['./machine-creation.component.css']
})
export class MachineCreationComponent implements OnInit {
  name: string
  active: boolean
  userId: number
  createMachineForm: FormGroup

  constructor(private machineService: MachineService, private formBuilder: FormBuilder, private router: Router) {
    this.name = ""
    this.active = false
    this.userId = +localStorage.getItem('id')!
    this.createMachineForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onActive(): void {
    this.active = !this.active
  }

  createMachine(): void {
    const today = new Date();
    this.machineService.createMachine(this.createMachineForm.get('name')?.value, today, this.active, Status.STOPPED).subscribe((machine) => {
      this.createMachineForm.reset()
    }, (error => {
      if (error.status === 403) {
        alert("You are not authorized to perform this action.")
      } else if (error.status === 500) {
        alert("Invalid machine info.")
      }
      this.router.navigate([`/home`])
    }))
  }
}
