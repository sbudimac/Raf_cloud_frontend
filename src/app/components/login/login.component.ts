import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string
  password: string
  loginInputForm: FormGroup

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
    this.email = ''
    this.password = ''
    this.loginInputForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.login(this.loginInputForm.get('email')?.value, this.loginInputForm.get('password')?.value).subscribe((loginResponse) => {
      localStorage.setItem('jwt', loginResponse.jwt)
      this.loginInputForm.reset()
      this.router.navigate([`/home`])
      this.loginService.getCurrent().subscribe((user) => {
        localStorage.setItem('id', user.id.toString())
        this.loginService.getPermissions().subscribe((permissionResponse) => {
          localStorage.setItem('create', permissionResponse.permissions.canCreateUsers.toString())
          localStorage.setItem('read', permissionResponse.permissions.canReadUsers.toString())
          localStorage.setItem('update', permissionResponse.permissions.canUpdateUsers.toString())
          localStorage.setItem('delete', permissionResponse.permissions.canDeleteUsers.toString())
          localStorage.setItem('searchMachines', permissionResponse.permissions.canSearchMachines.toString())
          localStorage.setItem('startMachines', permissionResponse.permissions.canStartMachines.toString())
          localStorage.setItem('stopMachines', permissionResponse.permissions.canStopMachines.toString())
          localStorage.setItem('restartMachines', permissionResponse.permissions.canRestartMachines.toString())
          localStorage.setItem('createMachines', permissionResponse.permissions.canCreateMachines.toString())
          localStorage.setItem('destroyMachines', permissionResponse.permissions.canDeleteUsers.toString())
          if (localStorage.getItem('create') === 'false' && localStorage.getItem('read') === 'false' && localStorage.getItem('update') === 'false' && localStorage.getItem('delete') === 'false'
            && localStorage.getItem('searchMachines') === 'false' && localStorage.getItem('startMachines') === 'false' && localStorage.getItem('stopMachines') === 'false'
            && localStorage.getItem('restartMachines') === 'false' && localStorage.getItem('createMachines') === 'false' && localStorage.getItem('destroyMachines') === 'false') {
            alert("You have no permissions.")
          }
        })
      })
    }, (error => {
      if (error.status === 401) {
        alert("No user with such credentials found.")
      }
      this.router.navigate([`/login`])
    }))
  }

  getToken(): string {
    return <string>localStorage.getItem('jwt')
  }
}
