import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'domaci3-font';

  constructor(private router: Router) {
  }

  logged(): boolean {
    return localStorage.getItem('jwt') !== null;
  }

  logout(): void {
    localStorage.removeItem('jwt')
    localStorage.removeItem('create')
    localStorage.removeItem('read')
    localStorage.removeItem('update')
    localStorage.removeItem('delete')
    this.router.navigate([`/login`])
  }
}
