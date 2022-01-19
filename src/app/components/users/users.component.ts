import { Component, OnInit } from '@angular/core';
import {User} from "../../model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[]

  constructor(private userService: UserService, private router: Router) {
    this.users = []
  }

  ngOnInit(): void {
    this.userService.readUsers().subscribe((users) =>{
      this.users = users
    }, (error => {
      if (error.status === 403) {
        alert("You are not authorized to perform this action.")
      }
      this.router.navigate([`/home`])
    }))
  }

  hasUpdatePermission(): boolean {
    return !(localStorage.getItem('update') === 'true');
  }

  hasDeletePermission(): boolean {
    return localStorage.getItem('delete') === 'true'
  }

  storeUser(id: number, firstName: string, lastName: string, email: string, canCreateUsers: boolean, canReadUsers: boolean, canUpdateUsers: boolean, canDeleteUsers: boolean): void {
    localStorage.setItem('uId', id.toString())
    localStorage.setItem('uFirstName', firstName)
    localStorage.setItem('uLastName', lastName)
    localStorage.setItem('uEmail', email)
    localStorage.setItem('uCanCreateUsers', canCreateUsers.toString())
    localStorage.setItem('uCanReadUsers', canReadUsers.toString())
    localStorage.setItem('uCanUpdateUsers', canUpdateUsers.toString())
    localStorage.setItem('uCanDeleteUsers', canDeleteUsers.toString())
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.ngOnInit()
    }, (error => {
      if (error.status === 403) {
        alert("You are not authorized to access this page.")
      }
      this.router.navigate([`/home`])
    }))
  }
}
