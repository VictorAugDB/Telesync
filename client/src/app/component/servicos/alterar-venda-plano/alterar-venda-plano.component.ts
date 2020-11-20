import { Cliente } from './../../cliente/client.model';
import { Venda } from './../models/product-venda.model';
import { VendaPlano } from './../models/product-venda-plano.model';
import { Plano } from './../models/product-plano.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../cliente/client.service';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';

function setActualDate() {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
function setdtVencimento() {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 2}-${date.getDate()}`;
}

@Component({
  selector: 'app-alterar-venda-plano',
  templateUrl: './alterar-venda-plano.component.html',
  styleUrls: ['./alterar-venda-plano.component.css']
})
export class AlterarVendaPlanoComponent implements OnInit {

  idVendaPlano = parseInt(this.route.snapshot.paramMap.get('id-venda-plano'));

  idCliente = parseInt(this.route.snapshot.paramMap.get('id-cliente'));
  codVenda = this.route.snapshot.paramMap.get('id')

  formVendaPlano: FormGroup;

  selected = null;

  statusAnterior = [];

  cliente: Cliente = null;

  planos: Array<Plano> = [{
    codPlano: null,
    nomePlano: '',
    valorPlano: null,
    cicloDias: null,
    tipoPlano: null
  }]

  vendaPlanos: VendaPlano[] = []

  vendaPlano: VendaPlano = {
    numeroTelefone: null,
    ddd: '',
    imei: null,
    status: null,
    venda: null,
    plano: this.planos[this.selected]
  }

  venda: Venda = {
    quantidadeChips: 0,
    dtVenda: setActualDate(),
    dtVencimento: setdtVencimento(),
    valorTotal: 0,
    obs: '',
    formaPagamento: 'BOLETO',
    status: true,
    cliente: this.cliente
  }

  constructor(private fb: FormBuilder, private productService: ProductService, private route: ActivatedRoute, private router: Router, private clientService: ClientService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.productService.buscarVendaPlanosVendaCliente(id).subscribe(vendaPlanos => {
      this.vendaPlanos = vendaPlanos
      vendaPlanos.forEach((el, i) => {
        if (el.codVendaPlano === this.idVendaPlano) {
          return (this.vendaPlano = el,
            this.vendaPlano.venda = el.venda)
        }
      })
    })

    this.clientService.buscarPorId(this.idCliente).subscribe(cliente => {
      this.cliente = cliente.find(cliente => true)
      this.venda.cliente = cliente.find(cliente => true)
    });

    this.productService.buscarPlanos().subscribe(planos => {
      this.planos = planos;
    })

    this.productService.buscarVendaPlanoPorId(this.idVendaPlano).subscribe(vendaPlano => {
      const vendaPlan = vendaPlano.find(vendaPlano => true);
      this.vendaPlano = vendaPlan;
      this.vendaPlano.venda = vendaPlan.venda;
      this.selected = vendaPlan.plano.codPlano - 1;
    });

    this.formVendaPlano = this.fb.group({
      nomePlano: ['', Validators.required],
      valorPlano: [{ value: '', disabled: true }, Validators.required],
      cicloDias: [{ value: '', disabled: true }, Validators.required],
      tipoPlano: [{ value: '', disabled: true }, Validators.required],
      ddd: ['', Validators.required],
      imei: [{ value: '', disabled: true }, Validators.required],
      numeroTelefone: [{ value: '', disabled: true }, Validators.required],
    })
  }

  gerarNumeroImei(): void {
    this.vendaPlano.imei = Math.floor(Math.random() * (93456789245612) + 300000000000000)
  }

  gerarNumeroTelefone() {
    this.vendaPlano.numeroTelefone = Math.floor(Math.random() * (9999999) + 990000000)
  }

  gerarImeiTelefone() {
  }

  alterarVendaPlano() {
    if (this.vendaPlano.venda.status === true) {
      const numeroTelefone = this.vendaPlano.numeroTelefone;
      const imei = this.vendaPlano.imei;
      this.vendaPlanos.forEach((el, i) => {
        this.statusAnterior.push({ cod: el.codVendaPlano, status: el.status })
        if (el.status == true)
          el.status = false;
        this.productService.altVendaPlano(el).subscribe(() => {
          //this.productService.showMessage('Plano Alterado com sucesso!')
        })
      })


      this.vendaPlano.venda.status = false
      setTimeout(() => {
        this.productService.altVenda(this.vendaPlano.venda).subscribe(() => {
        })
      }, 500)


      setTimeout(() => {
        this.productService.cadVenda(this.venda).subscribe((venda) => {
          this.venda = venda
          this.vendaPlanos.forEach((el, i) => {
            el.venda = venda
          })
        })
      }, 400)

      setTimeout(() => {
        this.cadastrarVendaPlano()
      }, 700)

      setTimeout(() => {
        this.alterarVenda()
      }, 1300)

      setTimeout(() => {
        this.productService.showMessage('Alteração foi bem sucedida!')
        this.router.navigate([`listar-clientes/${this.idCliente}/acompanhar-vendas/alterar-venda/${this.codVenda}`])
      }, 1600)
    } else {
      alert('venda já está desativada, impossivel alterar planos')
    }
  }

  cadastrarVendaPlano(): void {
    this.vendaPlanos.forEach((el, i) => {
      setTimeout(() => {
        let indexStatus = 0;
        this.statusAnterior.forEach((el2, j) => {
          if (el2.cod == el.codVendaPlano) {
            return indexStatus = j;
          }
        })
        if (el.codVendaPlano !== this.idVendaPlano) {
          el.codVendaPlano = null;
          el.status = this.statusAnterior[indexStatus].status
          this.venda.valorTotal += el.plano.valorPlano;
          this.venda.quantidadeChips += 1;
          this.productService.cadVendaPlano(el).subscribe((vendaPlano) => {
          })
        } else {
          this.vendaPlano.venda = this.venda
          this.vendaPlano.status = true
          this.vendaPlano.codVendaPlano = null;
          this.venda.valorTotal += this.planos[this.selected].valorPlano;
          this.venda.quantidadeChips += 1;
          this.vendaPlano.plano = this.planos[this.selected]
          this.productService.cadVendaPlano(this.vendaPlano).subscribe((vendaPlano) => {
          })
        }
      }, 300)
    })
  }

  alterarVenda() {
    this.productService.altVenda(this.venda).subscribe(() => {
    })
  }

  cancel() {
    this.router.navigate([`listar-clientes/${this.idCliente}/acompanhar-vendas/alterar-venda/${this.codVenda}`])
  }
}
