import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  canReadUsers: boolean
  canCreateUsers: boolean
  canUpdateUsers: boolean
  canDeleteUsers: boolean
  updateUserForm: FormGroup

  constructor(private loginService: LoginService, private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.canReadUsers = this.isCreateUsers()
    this.canCreateUsers = this.isReadUsers()
    this.canUpdateUsers = this.isUpdateUsers()
    this.canDeleteUsers = this.isDeleteUsers()
    this.updateUserForm = this.formBuilder.group({
      firstName: [localStorage.getItem('uFirstName'), Validators.required],
      lastName: [localStorage.getItem('uLastName'), Validators.required],
      email: [localStorage.getItem('uEmail'), Validators.required]
    })
  }

  ngOnInit(): void {
  }

  isCreateUsers(): boolean {
    return localStorage.getItem('uCanCreateUsers') === 'true'
  }

  isReadUsers(): boolean {
    return localStorage.getItem('uCanReadUsers') === 'true'
  }

  isUpdateUsers(): boolean {
    return localStorage.getItem('uCanUpdateUsers') === 'true'
  }

  isDeleteUsers(): boolean {
    return localStorage.getItem('uCanDeleteUsers') === 'true'
  }

  onCanCreateUsers(): void {
    this.canCreateUsers = !this.canCreateUsers
  }

  onCanReadUsers(): void {
    this.canReadUsers = !this.canReadUsers
  }

  onCanUpdateUsers(): void {
    this.canUpdateUsers = !this.canUpdateUsers
  }

  onCanDeleteUsers(): void {
    this.canDeleteUsers = !this.canDeleteUsers
  }

  updateUser(): void {
    this.userService.updateUser(
      parseInt(localStorage.getItem('uId') ?? ""), this.updateUserForm.get('firstName')?.value, this.updateUserForm.get('lastName')?.value, this.updateUserForm.get('email')?.value,
      this.canCreateUsers, this.canReadUsers, this.canUpdateUsers, this.canDeleteUsers
    ).subscribe((user) => {
      console.log(localStorage.getItem('uId'))
      this.updateUserForm.reset()
      this.router.navigate([`/home`])
      this.loginService.getPermissions().subscribe((permissionResponse) => {
        localStorage.setItem('create', permissionResponse.permissions.canCreateUsers.toString())
        localStorage.setItem('read', permissionResponse.permissions.canReadUsers.toString())
        localStorage.setItem('update', permissionResponse.permissions.canUpdateUsers.toString())
        localStorage.setItem('delete', permissionResponse.permissions.canDeleteUsers.toString())
      }, (error => {
        if (error.status === 403) {
          alert("You are not authorized to perform this action.")
        }
        this.router.navigate([`/home`])
      }))
    })
  }
}
