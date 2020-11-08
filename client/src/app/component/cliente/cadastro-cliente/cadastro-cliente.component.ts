import { Cliente } from '../client.model';
import { Router } from '@angular/router';
import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../login.model';

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
    login:{
      email: '',
      senha: '',
      codPermissao: 2  
    }
  }

  constructor(private clientService: ClientService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
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
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[0-9 ]*')])],
      complementoCliente: ''
    })
  }

  cadastrarCliente(): void{
    this.clientService.cadastrar(this.cliente).subscribe(()=>{
      this.clientService.showMessage('Operação Executada com sucesso!!!')
      this.router.navigate(['/crud-cliente'])
    })
  }

  cancel(){
    this.router.navigate(['/crud-cliente'])
  }

  public validacaoLetras = { '0': { pattern: new RegExp('\[a-zA-Z\]')} };
}
