import { Cliente } from './../product.model';
import { Router } from '@angular/router';
import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  cliente: Cliente = {
    cpfCliente: 12312312312,
    nomeCliente: 'José',
    dtNascCliente: 19900202,
    sexoCliente: 'm',
    estadoCivilCliente: 's',
    nomeMaeCliente: 'Maria',
    ufCliente: 'SP',
    cidadeCliente: 'Sorocaba',
    logradouroCliente: 'Rua da Sé',
    cepCliente: 84521235,
    numeroCliente: 874,
    bairroCliente: 'São Caetano',
    profissaoCliente: 'Barbeiro',
    liberacaoCredito: 2,
    dtCadastroCliente: 20200202,
    codLogin: 2,
  }

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
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
