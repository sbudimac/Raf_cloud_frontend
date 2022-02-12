import { Component, OnInit } from '@angular/core';
import {ErrorMessage} from "../../model";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit {

  errorMessages: ErrorMessage[]
  userId: number

  constructor(private errorService: ErrorService) {
    this.errorMessages = []
    this.userId = +localStorage.getItem('id')!
  }

  ngOnInit(): void {
    this.errorService.getErrors(this.userId).subscribe( (errors) => {
      this.errorMessages = errors
    })
  }

}
