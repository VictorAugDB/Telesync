import { VendaPlano } from './../models/product-venda-plano.model';
import { Venda } from './../models/product-venda.model';
import { Cliente } from './../../cliente/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../cliente/client.service';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';
import { ProductService } from '../product.service';

enum Liberacao {
  REPROVADO = 0,
  APROVADO = 1,
  PENDENTE = 2
}

@Component({
  selector: 'app-analise-de-credito',
  templateUrl: './analise-de-credito.component.html',
  styleUrls: ['./analise-de-credito.component.css']
})
export class AnaliseDeCreditoComponent implements OnInit {

  liberacaoCliente = 0;

  vendaPlanos: VendaPlano[] = []

  venda: Venda
  cliente: Cliente
  deCodeToken = this.authenticationService.decodePayLoadJWT();
  idVenda = parseInt(this.route.snapshot.paramMap.get('id-venda'))

  constructor(private router: Router, private clientService: ClientService, private authenticationService: AuthenticationService, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    if (this.deCodeToken.isFuncionario) {
      const idCliente = parseInt(this.route.snapshot.paramMap.get('id-cliente'))
      this.clientService.buscarPorId(idCliente).subscribe(cliente => {
        this.cliente = cliente.find(cliente => true)
        const client = this.cliente
        this.liberacaoCliente = parseInt(Liberacao[client.liberacaoCredito])
        if (this.liberacaoCliente === 1) {
          this.router.navigate([`contrato/${this.idVenda}`])
        }
      });
    } else {
      const idCliente = this.deCodeToken.codUsuario;
      this.clientService.buscarPorId(idCliente).subscribe(cliente => {
        this.cliente = cliente.find(cliente => true)
        const client = this.cliente
        this.liberacaoCliente = parseInt(Liberacao[client.liberacaoCredito])
        if (this.liberacaoCliente === 1) {
          this.router.navigate([`contrato/${this.idVenda}`])
        }
      });
    }
  }


  alertarSucesso() {
    if (this.liberacaoCliente === 2) {
      this.cliente.liberacaoCredito = 1

      this.clientService.altDadosCliente(this.cliente).subscribe(() => {
        this.clientService.showMessage('Aprovado!!!')
        this.router.navigate([`contrato/${this.idVenda}`])
      })
    } else if (this.liberacaoCliente === 0) {
      this.productService.buscarVendaCliente(this.idVenda).subscribe(venda => {
        this.venda = venda.find(venda => true);
        this.venda.status = false;
      })

      setTimeout(() => {
        this.productService.buscarVendaPlanosVendaCliente(this.idVenda).subscribe(vendaPlanos => {
          this.vendaPlanos = vendaPlanos
          this.vendaPlanos.forEach((el, i) => {
            el.active = false;
          })
        })
      }, 300)

      setTimeout(() => {
        this.vendaPlanos.forEach((el, i) => {
          this.productService.altVendaPlano(el).subscribe(() => {
          })
        })
      }, 400)

      setTimeout(() => {
        this.productService.altVenda(this.venda).subscribe(() => {
          this.clientService.showMessage('Reprovado!!!')
          this.router.navigate([''])
        })
      }, 700)
    } 
  }

  cancel() {
    this.router.navigate(['/'])
  }
}
