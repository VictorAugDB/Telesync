import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  getPermissao(){
    const token = this.authenticationService.decodePayLoadJWT()
    return token.isFuncionario;
  }

}
