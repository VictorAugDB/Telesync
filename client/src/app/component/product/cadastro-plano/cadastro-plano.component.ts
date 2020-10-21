import { ClientService } from './../../client/client.service';
import { Venda } from './../models/product-venda.model';
import { VendaPlano } from './../models/product-venda-plano.model';
import { Cliente } from './../../client/client.model';
import { Plano } from '../models/product-plano.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

function setActualDate() {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
function setdtVencimento() {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 2}-${date.getDate()}`;
}

@Component({
  selector: 'app-cadastro-plano',
  templateUrl: './cadastro-plano.component.html',
  styleUrls: ['./cadastro-plano.component.css']
})


export class CadastroPlanoComponent implements OnInit {

  constructor(private clientService: ClientService, private productService: ProductService, private router: Router) { }

  selected = null;

  cliente: Cliente = null

  codigosVendaPlano = []

  planos: Array<Plano> = [{
    codPlano: null,
    nomePlano: '',
    valorPlano: null,
    cicloDias: null,
    tipoPlano: null
  }]

  plano: Plano = new Plano()

  venda: Venda = {
    quantidadeChips: 0,
    dtVenda: setActualDate(),
    dtVencimento: setdtVencimento(),
    valorTotal: 0,
    obs: '',
    formaPagamento: '',
    statusPagamento: 2,
    cliente: this.cliente
  }


  vendaPlano: VendaPlano = {
    numeroTelefone: null,
    ddd: '',
    imei: null,
    venda: this.venda,
    plano: this.planos[this.selected]
  }

  ngOnInit(): void {
    const id = 1;
    this.clientService.buscarPorId(id).subscribe(cliente => {
      this.cliente = cliente
      this.venda.cliente = cliente[0]
    });

    this.buscarPlanos();
  }

  buscarPlanos(): void {
    this.productService.buscarPlanos().subscribe(planos => {
      this.planos = planos;
    })
  }

  /*gerarNumeroImei(): void {
    this.vendaPlano.imei = Math.floor(Math.random() * (93456789245612) + 300000000000000)
  }*/

  gerarNumeroImei(): void {
    this.vendaPlano.imei = Math.floor(Math.random() * (93456612) + 300000000)
  }

  gerarNumeroTelefone() {
    this.vendaPlano.numeroTelefone = Math.floor(Math.random() * (9999999) + 990000000)

  }

  buscarPlano(): void {
    this.productService.buscarPlanoPorId(this.selected).subscribe(plano => {
      this.plano = plano
    });
  }

  cadastrarVenda(): void {
    this.productService.cadVenda(this.venda).subscribe((venda) => {
      this.productService.showMessage('Operação Executada com sucesso!!!')
      this.venda = venda
      this.vendaPlano.venda = venda
    })
  }

  excluirVenda(): void{
    this.productService.deletarVenda(this.venda.codVenda).subscribe(()=>{
      this.productService.showMessage('Venda Cancelada!')
    })
  }

  excluirVendaPlanos(): void{
    this.productService.deletarVendaPlanos(this.codigosVendaPlano).subscribe(()=>{
      this.productService.showMessage('Excluído(s) com Sucesso!')
    })
  }

  cadastrarVendaPlano(): void {
    this.gerarNumeroImei();
    this.gerarNumeroTelefone();
    this.venda.valorTotal += this.planos[this.selected].valorPlano;
    this.venda.quantidadeChips+=1;
    this.vendaPlano.plano = this.planos[this.selected]
    this.productService.cadVendaPlano(this.vendaPlano).subscribe((vendaPlano) => {
      this.codigosVendaPlano.push(vendaPlano.codVendaPlano)
      this.productService.showMessage('Operação Executada com sucesso!!!')
      console.log(vendaPlano)
    })
  }

  cancel() {
    this.router.navigate(['/crud-product'])
  }

}
