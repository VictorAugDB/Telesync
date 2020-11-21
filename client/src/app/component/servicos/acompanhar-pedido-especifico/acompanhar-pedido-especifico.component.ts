import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaPlano } from '../models/product-venda-plano.model';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';

@Component({
  selector: 'app-acompanhar-pedido-especifico',
  templateUrl: './acompanhar-pedido-especifico.component.html',
  styleUrls: ['./acompanhar-pedido-especifico.component.css']
})
export class AcompanharPedidoEspecificoComponent implements OnInit {

  idCliente = this.route.snapshot.paramMap.get('id-cliente')
  vendaPlanos: VendaPlano[] = []
  deCodeToken = this.authenticationService.decodePayLoadJWT()
  
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
   }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.productService.buscarVendaPlanosVendaCliente(id).subscribe(vendaPlanos => {
      this.vendaPlanos = vendaPlanos
    })
  }

  goToBackPage(){
    if(this.deCodeToken.isFuncionario){
      this.router.navigate([`listar-clientes/${this.idCliente}/acompanhar-vendas`])
    }else{
      this.router.navigate(['acompanhamento-de-pedido'])
    }
  }
}
