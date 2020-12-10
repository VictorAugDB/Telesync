import { invalid } from 'moment';
import { Cliente } from '../client.model';
import { Router } from '@angular/router';
import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../login.model';
import { PerguntaSecreta } from '../pergunta.secreta.model';

function setActualDate() {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  startDate = new Date(1970, 0, 1);

  endDate = new Date(2002, 0, 1);

  formulario: FormGroup;

  perguntasSecretas: PerguntaSecreta[] = []

  login: Login = {
    email: '',
    senha: '',
    permissao: 0
  }

  selected = 0;

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
    perguntaSecreta: this.perguntasSecretas[this.selected],
    login: this.login,
    respostaSecreta: '',
  }

  constructor(private clientService: ClientService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.clientService.buscarPerguntas().subscribe((perguntasSecretas) => {
      this.perguntasSecretas = perguntasSecretas
    })

    this.formulario = this.fb.group({
      cpfCliente: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      nomeCliente: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$')])],
      dtNascCliente: ['', Validators.required],
      sexoCliente: ['', Validators.required],
      estadoCivilCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      nomeMaeCliente: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$')])],
      ufCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      cidadeCliente: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$')])],
      logradouroCliente: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$')])],
      cepCliente: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      numeroCliente: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      bairroCliente: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$')])],
      profissaoCliente: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$')])],
      complementoCliente: '',
      perguntaSecreta: ['', Validators.required],
      respostaSecreta: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[0-9 a-z, A-Z]*')])],
    })
  }

  cadastrarCliente(): void {
    this.cliente.perguntaSecreta = this.perguntasSecretas[this.selected]
    this.cliente.login = this.login;
    this.clientService.cadastrar(this.cliente).subscribe(() => {
      this.clientService.showMessage('Operação Executada com sucesso!!!')
      this.router.navigate([''])
    })
  }

  validaCPF() {
    let inputCPF = document.getElementById("CPF");
    inputCPF.addEventListener("focusout", () => {
      if (inputCPF != null) {
        let validador = this.cpf(this.cliente.cpfCliente)
        if (validador == true) {
        } else {
          this.formulario.controls['cpfCliente'].setErrors({ 'incorrect': true })
        }
      }
    })
  }

  cpf(CPF: number): boolean {
    let cpf = CPF.toString();
    if (cpf == null) {
      return false;
    }
    if (cpf.length != 11) {
      return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      return false;
    }
    else {
      return true;
    }
  }

  cancel() {
    this.router.navigate([''])
  }

  public validacaoLetras = { '0': { pattern: new RegExp('\[a-zA-Z\]') } };
}
