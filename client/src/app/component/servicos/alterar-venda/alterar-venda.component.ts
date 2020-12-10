import { AuthenticationService } from './../../../account/shared/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alterar-venda',
  templateUrl: './alterar-venda.component.html',
  styleUrls: ['./alterar-venda.component.css']
})
export class AlterarVendaComponent implements OnInit {

  deCodeToken = this.authenticationService.decodePayLoadJWT()
  idCliente = this.route.snapshot.paramMap.get('id-cliente')

  constructor(private router: Router, private authenticationService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goToBackPage(){
    if(this.deCodeToken.isFuncionario){
      this.router.navigate([`listar-clientes/${this.idCliente}/acompanhar-vendas`])
    }else{
      this.router.navigate(['acompanhamento-de-pedido'])
    }
  }

  goToHome(){
    this.router.navigate([''])
  }
}
