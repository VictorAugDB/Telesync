import { Cliente } from './../../component/cliente/client.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private authenticationService: AuthenticationService, private clientService: ClientService, private router: Router) { }

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

  getCargo() {
    const token = this.authenticationService.decodePayLoadJWT()
    return token.codPermissao  === 2 && 'gerente'
  }

  logout(){
    if(this.authenticationService.isUserLoggedIn()){
      this.authenticationService.logoutUser()
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/login'])
    }
  }

}
