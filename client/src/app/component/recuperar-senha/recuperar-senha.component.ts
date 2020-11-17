import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['']);
    }
  }

  alertarSucesso(){
    alert("Aprovado, sua nova senha é xxxxxxx")
    this.cancel();
  }

  alertarFracasso(){
    alert("Reprovado, voltando a página de login")
    this.cancel();
  }

  cancel() {
    this.router.navigate(['/login'])
  }

}
