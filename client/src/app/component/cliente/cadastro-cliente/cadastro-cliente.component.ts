import { Cliente } from '../client.model';
import { Router } from '@angular/router';
import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../login.model';
import { PerguntaSecreta } from './pergunta.secreta.model';

function setActualDate(){
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

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
      cpfCliente: ['', Validators.compose([Validators.required, Validators.pattern('[0-9 ]*')])],
      nomeCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      dtNascCliente: ['', Validators.required],
      sexoCliente: ['', Validators.required],
      estadoCivilCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      nomeMaeCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      ufCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      cidadeCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      logradouroCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      cepCliente: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      numeroCliente: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      bairroCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      profissaoCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      complementoCliente: '',
      perguntaSecreta: '',
      respostaSecreta: '',
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[0-9 ]*')])],
    })
  }

  cadastrarCliente(): void{
    this.cliente.perguntaSecreta = this.perguntasSecretas[this.selected]
    this.cliente.login = this.login;
    this.clientService.cadastrar(this.cliente).subscribe(()=>{
      this.clientService.showMessage('Operação Executada com sucesso!!!')
      this.router.navigate([''])
    })
  }

  cancel(){
    this.router.navigate([''])
  }

  public validacaoLetras = { '0': { pattern: new RegExp('\[a-zA-Z\]')} };
}
