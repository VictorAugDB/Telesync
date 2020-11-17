import { Venda } from './../models/product-venda.model';
import { ProductService } from './../product.service';
import { VendaPlano } from './../models/product-venda-plano.model';
import { Cliente } from './../../cliente/client.model';
import { ClientService } from './../../cliente/client.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';

@Component({
  selector: 'app-acompanhamento-de-pedido',
  templateUrl: './acompanhamento-de-pedido.component.html',
  styleUrls: ['./acompanhamento-de-pedido.component.css']
})
export class AcompanhamentoDePedidoComponent implements OnInit {

  constructor(private clientService: ClientService, private ProductService: ProductService, private authenticationService: AuthenticationService) { }

  id = this.authenticationService.decodePayLoadJWT().codUsuario

  vendas: Venda[];
  vendaPlano: VendaPlano[];
  cliente: Cliente;

  ngOnInit(): void {
    this.clientService.buscarPorId(this.id).subscribe(cliente => {
      this.cliente = cliente.find(client => true)
    });

    /*setTimeout(() =>{
      this.encontrarVendasCliente();
    }, 1000)*/
  }

  encontrarVendasCliente(){
    this.ProductService.buscarVendasCliente(this.id).subscribe(vendas =>{
      this.vendas = vendas
    })
  }

  mostrarVendasCliente(){
    console.log(this.vendas);
  }

  goToBackPage(){
    window.history.back()
  }
}
