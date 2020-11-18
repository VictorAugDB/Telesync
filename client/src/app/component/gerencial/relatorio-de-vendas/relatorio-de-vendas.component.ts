import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';

@Component({
  selector: 'app-relatorio-de-vendas',
  templateUrl: './relatorio-de-vendas.component.html',
  styleUrls: ['./relatorio-de-vendas.component.css']
})
export class RelatorioDeVendasComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(this.authenticationService.decodePayLoadJWT().codPermissao !== '2'){
      this.router.navigate(['']);
    }
  }

}
