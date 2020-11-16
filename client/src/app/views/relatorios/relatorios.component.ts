import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  navigateToRelatorioVendas(): void{
    this.router.navigate(['/relatórios/relatório-vendas'])
  }

  getPermissao(){
    const token = this.authenticationService.decodePayLoadJWT()
    return token.isFuncionario;
  }

}
