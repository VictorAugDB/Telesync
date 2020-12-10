import { VendaPlano } from './../models/product-venda-plano.model';
import { Venda } from './../models/product-venda.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  idVenda = parseInt(this.route.snapshot.paramMap.get('id-venda'))

  vendaPlanos: VendaPlano[] = []

  venda: Venda

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  alertarFinalizar() {
    alert("Você aceitou os termos e será redirecionado para a homepage")
    this.cancel();
  }

  alertarCancelar() {
    this.productService.buscarVendaCliente(this.idVenda).subscribe(venda => {
      this.venda = venda.find(venda => true);
      this.venda.status = false;
    })

    setTimeout(() => {
      this.productService.buscarVendaPlanosVendaCliente(this.idVenda).subscribe(vendaPlanos => {
        this.vendaPlanos = vendaPlanos
      })
    }, 300)

    setTimeout(() => {
      this.vendaPlanos.forEach((el, i) => {
        el.active = false;
        this.productService.altVendaPlano(el).subscribe((el) => {
        })
      })
    }, 700)

    setTimeout(() => {
      this.productService.altVenda(this.venda).subscribe(() => {
        alert("Você não concordou com os termos, sua venda foi cancelada e você será redirecionado para a homepage")
        this.cancel()
      })
    }, 900)
  }

  cancel() {
    this.router.navigate(['/'])
  }
}
