import { ClientService } from './../../client/client.service';
import { Venda } from './../models/product-venda.model';
import { VendaPlano } from './../models/product-venda-plano.model';
import { Cliente } from './../../client/client.model';
import { Plano } from '../models/product-plano.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cadastro-plano',
  templateUrl: './cadastro-plano.component.html',
  styleUrls: ['./cadastro-plano.component.css']
})


export class CadastroPlanoComponent implements OnInit {

  cliente: Cliente = new Cliente;
  selected = null;
  codPlanoEscolhido: number;

  constructor(private clientService: ClientService, private productService: ProductService, private router: Router) { }

  planos: Array<Plano> = [{
    codPlano: null,
    nomePlano: '',
    valorPlano: null,
    cicloDias: null,
    tipoPlano: null
  }]
  plano: Plano = new Plano()

  venda: Venda = {
    quantidadeChips: null,
    dtVenda: '',
    dtVencimento: '',
    valorTotal: null,
    obs: '',
    formaPagamento: null,
    statusPagamento: 2,
    cliente: this.cliente
  }


  vendaPlano: VendaPlano = {
    numeroTelefone: null,
    ddd: '',
    imei: null,
    venda: this.venda,
    planos: this.planos
  }

  ngOnInit(): void {
    const id = 1;
    this.clientService.buscarPorId(id).subscribe(cliente => {
      this.cliente = cliente
    });

    this.buscarPlanos();
  }

  buscarPlanos(): void{
    this.productService.buscarPlanos().subscribe(planos => {
      this.planos = planos;
      this.vendaPlano.planos = planos;
    })
  }

  buscarPlano(): void{
    this.productService.buscarPlanoPorId(this.selected).subscribe(plano => {
      this.plano = plano
    });
  }

  cadastrarVenda(): void {
    this.codPlanoEscolhido = 1;
    this.buscarPlano()
    console.log(this.selected);
  }

  cadastrarVendaPlano(): void {
    this.productService.cadVendaPlano(this.vendaPlano).subscribe(() => {
      this.productService.showMessage('Operação Executada com sucesso!!!')
      this.router.navigate(['/crud-product'])
    })
  }

  cancel() {
    this.router.navigate(['/crud-product'])
  }

}
