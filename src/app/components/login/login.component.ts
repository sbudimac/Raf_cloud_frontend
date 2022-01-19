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
      this.loginService.getPermissions().subscribe((permissionResponse) => {
        console.log(permissionResponse)
        localStorage.setItem('create', permissionResponse.permissions.canCreateUsers.toString())
        localStorage.setItem('read', permissionResponse.permissions.canReadUsers.toString())
        localStorage.setItem('update', permissionResponse.permissions.canUpdateUsers.toString())
        localStorage.setItem('delete', permissionResponse.permissions.canDeleteUsers.toString())
        if (localStorage.getItem('create') === 'false' && localStorage.getItem('read') === 'false' && localStorage.getItem('update') === 'false' && localStorage.getItem('delete') === 'false') {
          alert("You have no permissions.")
        }
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
