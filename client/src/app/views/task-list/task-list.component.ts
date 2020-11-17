import { Cliente } from './../../component/cliente/client.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';
import { ClientService } from 'src/app/component/cliente/client.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  deCodeToken = this.authenticationService.decodePayLoadJWT()
  cliente: Cliente;

  constructor(private authenticationService: AuthenticationService, private clientService: ClientService) { }

  ngOnInit(): void {
    if (!this.deCodeToken.isFuncionario) {
      this.clientService.buscarPorId(this.deCodeToken.codUsuario).subscribe(cliente => {
        this.cliente = cliente.find(cliente => true)
      })
    }
  }

  getPermissao() {
    const token = this.authenticationService.decodePayLoadJWT()
    return token.isFuncionario;
  }

}
