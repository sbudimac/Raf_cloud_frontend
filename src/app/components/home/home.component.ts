import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hasCreatePermission(): boolean {
    return localStorage.getItem('create') === 'true';
  }

  hasCreateMachinePermission(): boolean {
    return localStorage.getItem('createMachines') === 'true';
  }
}
