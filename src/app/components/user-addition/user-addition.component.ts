import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-user-addition',
  templateUrl: './user-addition.component.html',
  styleUrls: ['./user-addition.component.css']
})
export class UserAdditionComponent implements OnInit {

  firstName: string
  lastName: string
  email: string
  password: string
  canReadUsers: boolean
  canCreateUsers: boolean
  canUpdateUsers: boolean
  canDeleteUsers: boolean
  canCreateMachines: boolean
  canSearchMachines: boolean
  canStartMachines: boolean
  canRestartMachines: boolean
  canStopMachines: boolean
  canDestroyMachines: boolean
  addUserForm: FormGroup

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.password = ''
    this.canReadUsers = false
    this.canCreateUsers = false
    this.canUpdateUsers = false
    this.canDeleteUsers = false
    this.canCreateMachines = false
    this.canSearchMachines = false
    this.canStartMachines = false
    this.canRestartMachines = false
    this.canStopMachines = false
    this.canDestroyMachines = false
    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onCanCreateUsers(): void {
    this.canCreateUsers = !this.canCreateUsers
  }

  onCanReadUsers(): void {
    this.canReadUsers = !this.canReadUsers
    console.log(this.canReadUsers.toString())
  }

  onCanUpdateUsers(): void {
    this.canUpdateUsers = !this.canUpdateUsers
  }

  onCanDeleteUsers(): void {
    this.canDeleteUsers = !this.canDeleteUsers
  }

  onCanCreateMachines(): void {
    this.canCreateMachines = !this.canCreateMachines
  }

  onCanSearchMachines(): void {
    this.canSearchMachines = !this.canSearchMachines
  }

  onCanStartMachines(): void {
    this.canStartMachines = !this.canStartMachines
  }

  onCanRestartMachines(): void {
    this.canRestartMachines = !this.canRestartMachines
  }

  onCanStopMachines(): void {
    this.canStopMachines = !this.canStopMachines
  }

  onCanDestroyMachines(): void  {
    this.canDestroyMachines = !this.canDestroyMachines
  }

  addUser(): void {
    this.userService.addUser(
      this.addUserForm.get('firstName')?.value, this.addUserForm.get('lastName')?.value, this.addUserForm.get('email')?.value, this.addUserForm.get('password')?.value,
      this.canCreateUsers, this.canReadUsers, this.canUpdateUsers, this.canDeleteUsers, this.canCreateMachines, this.canSearchMachines, this.canStartMachines, this.canRestartMachines, this.canStopMachines, this.canDestroyMachines
    ).subscribe((user) => {
      this.addUserForm.reset()
    }, (error => {
      if (error.status === 403) {
        alert("You are not authorized to perform this action.")
      } else if (error.status === 500) {
        alert("Invalid user info.")
      }
      this.router.navigate([`/home`])
    }))
  }
}
