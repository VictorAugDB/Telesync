import { Venda } from './../models/product-venda.model';
import { ProductService } from './../product.service';
import { VendaPlano } from './../models/product-venda-plano.model';
import { Cliente } from './../../cliente/client.model';
import { ClientService } from './../../cliente/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acompanhamento-de-pedido',
  templateUrl: './acompanhamento-de-pedido.component.html',
  styleUrls: ['./acompanhamento-de-pedido.component.css']
})
export class AcompanhamentoDePedidoComponent implements OnInit {

  constructor(private clientService: ClientService, private ProductService: ProductService) { }

  vendas: Venda[];
  vendaPlano: VendaPlano[];
  cliente: Cliente;

  ngOnInit(): void {
    const id = 1;
    this.clientService.buscarPorId(id).subscribe(cliente => {
      this.cliente = cliente
    });

    this.encontrarVendasCliente();
  }

  encontrarVendasCliente(){
    this.ProductService.buscarVendasCliente(1).subscribe(vendas =>{
      this.vendas = vendas
    })
  }

  mostrarVendasCliente(){
    console.log(this.vendas);
  }

}
