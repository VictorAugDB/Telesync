import { Router } from '@angular/router';
import { ClientService } from './../client.service';
import { Cliente } from './../client.model';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

function setActualDate(){
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

@Component({
  selector: 'app-alterar-dados-cadastrais',
  templateUrl: './alterar-dados-cadastrais.component.html',
  styleUrls: ['./alterar-dados-cadastrais.component.css']
})
export class AlterarDadosCadastraisComponent implements OnInit {

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
      permissao: 0   
    }
  }

  constructor(private clientService: ClientService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    const id = 1;
    this.clientService.buscarPorId(id).subscribe(cliente => {
      this.cliente = cliente.find(cliente => true)
    });

    this.formulario = this.fb.group({
      cpfCliente: [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.pattern('[0-9 ]*')])],
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
      complementoCliente: ''
    })
  }

  alterarDadosCliente(): void{
    this.clientService.altDadosCliente(this.cliente).subscribe(()=>{
      this.clientService.showMessage('Operação Executada com sucesso!!!')
      this.router.navigate(['/crud-cliente'])
    })
  }

  cancel(){
    this.router.navigate(['/crud-cliente'])
  }

  public validacaoLetras = { '0': { pattern: new RegExp('\[a-zA-Z\]')} };
}
