import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./components/users/users.component";
import {LoginComponent} from "./components/login/login.component";
import {ReadGuard} from "./guards/read.guard";
import {UserAdditionComponent} from "./components/user-addition/user-addition.component";
import {UpdateGuard} from "./guards/update.guard";
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {CreateGuard} from "./guards/create.guard";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [ReadGuard]
  },
  {
    path: "create",
    component: UserAdditionComponent,
    canActivate: [CreateGuard]
  },
  {
    path: "update",
    component: EditUserComponent,
    canActivate: [UpdateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
