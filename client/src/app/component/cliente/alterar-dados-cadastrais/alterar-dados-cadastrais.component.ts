import { PerguntaSecreta } from '../pergunta.secreta.model';
import { Router } from '@angular/router';
import { ClientService } from './../client.service';
import { Cliente } from './../client.model';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';

function setActualDate() {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

@Component({
  selector: 'app-alterar-dados-cadastrais',
  templateUrl: './alterar-dados-cadastrais.component.html',
  styleUrls: ['./alterar-dados-cadastrais.component.css']
})
export class AlterarDadosCadastraisComponent implements OnInit {

  perguntaSecreta: PerguntaSecreta = null;

  deCodeToken = this.authenticationService.decodePayLoadJWT()
  id = this.deCodeToken.codUsuario;
  codClienteVend = null;

  formulario: FormGroup;

  cliente: Cliente = {
    cpfCliente: null,
    nomeCliente: '',
    dtNascCliente: '',
    sexoCliente: '',
    estadoCivilCliente: '',
    nomeMaeCliente: '',
    ufCliente: '',
    cidadeCliente: '',
    logradouroCliente: '',
    cepCliente: null,
    numeroCliente: null,
    bairroCliente: '',
    profissaoCliente: '',
    liberacaoCredito: 2,
    dtCadastroCliente: setActualDate(),
    perguntaSecreta: this.perguntaSecreta,
    respostaSecreta: '',
    login: {
      email: '',
      senha: '',
      permissao: 0
    }
  }

  constructor(private clientService: ClientService, private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (!this.deCodeToken.isFuncionario) {
      this.clientService.buscarPorId(this.id).subscribe(cliente => {
        this.cliente = cliente.find(cliente => true)
      });
    }

    this.formulario = this.fb.group({
      cpfCliente: [{ value: '', disabled: true }, Validators.compose([Validators.required, Validators.pattern('[0-9 ]*')])],
      nomeCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      sexoCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      estadoCivilCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      nomeMaeCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      ufCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      cidadeCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      logradouroCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      cepCliente: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      numeroCliente: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      bairroCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      profissaoCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      emailCliente: ['', Validators.email],
      complementoCliente: '',
      codCliente: ''
    })
  }

  alterarDadosCliente(): void {
    this.clientService.altDadosCliente(this.cliente).subscribe(() => {
      this.clientService.showMessage('Operação Executada com sucesso!!!')
      this.router.navigate([''])
    })
  }

  buscarCliente(): void {
    if (this.deCodeToken.isFuncionario) {
      this.clientService.buscarPorId(this.codClienteVend).subscribe(cliente => {
        this.cliente = cliente.find(cliente => true)
      });
    }
  }

  getPermissao() {
    const token = this.deCodeToken
    return token.isFuncionario;
  }

  verificaBusca(): boolean{
    if(this.codClienteVend !== null){
      return false;
    }
    return true;
  }

  cancel() {
    this.router.navigate([''])
  }

  public validacaoLetras = { '0': { pattern: new RegExp('\[a-zA-Z\]') } };
}
