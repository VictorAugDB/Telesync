import { Venda } from './../models/product-venda.model';
import { Plano } from './../models/product-plano.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendaPlano } from '../models/product-venda-plano.model';

@Component({
  selector: 'app-acompanhar-pedido-especifico',
  templateUrl: './acompanhar-pedido-especifico.component.html',
  styleUrls: ['./acompanhar-pedido-especifico.component.css']
})
export class AcompanharPedidoEspecificoComponent implements OnInit {

  vendaPlanos: VendaPlano[] = []
  
  constructor(private productService: ProductService, private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.productService.buscarVendaPlanosVendaCliente(id).subscribe(vendaPlanos => {
      this.vendaPlanos = vendaPlanos
    })
  }
}
