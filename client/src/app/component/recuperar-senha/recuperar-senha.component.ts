import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';
import { ProductService } from '../servicos/product.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService, private productService: ProductService) { }

  username = ''
  resposta = ''
  novaSenha = ''

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['']);
    }
  }



  recuperarSenha(){
    this.authenticationService.recuperarSenha(this.username, this.resposta, this.novaSenha).subscribe(() =>{
      this.productService.showMessage('Senha Alterada com Sucesso!')
      this.cancel();
    })
  }

  alertarFracasso(){
    alert("Reprovado, voltando a página de login")
    this.cancel();
  }

  cancel() {
    this.router.navigate(['/login'])
  }

}
