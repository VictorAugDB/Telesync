import { Cliente } from './../product.model';
import { Router } from '@angular/router';
import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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
    dtNascCliente: null,
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
    dtCadastroCliente: null,
    codLogin: null,
  }

  constructor(private clientService: ClientService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      cpfCliente: ['', Validators.compose([Validators.required, Validators.pattern('[0-9 ]*')])],
      nomeCliente: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      dtNascCliente: ['', Validators.required],
      sexoCliente: ['', Validators.compose([Validators.required, Validators.pattern('[m, f, M, F]*')])],
      estadoCivilCliente: ['', Validators.required],
      nomeMaeCliente: ['', Validators.required],
      ufCliente: ['', Validators.required],
      cidadeCliente: ['', Validators.required],
      logradouroCliente: ['', Validators.required],
      cepCliente: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      numeroCliente: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      bairroCliente: ['', Validators.required],
      profissaoCliente: ['', Validators.required],
      liberacaoCredito: [''],
      dtCadastroCliente: ['', Validators.required],
      codLogin: [''],
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
}
