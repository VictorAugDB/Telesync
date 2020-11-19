import { Cliente } from './../../cliente/client.model';
import { Venda } from './../models/product-venda.model';
import { VendaPlano } from './../models/product-venda-plano.model';
import { Plano } from './../models/product-plano.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../cliente/client.service';

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

  idCliente = parseInt(this.route.snapshot.paramMap.get('id-cliente'));

  formVendaPlano: FormGroup;

  selected = null;

  cliente: Cliente = null;

  planos: Array<Plano> = [{
    codPlano: null,
    nomePlano: '',
    valorPlano: null,
    cicloDias: null,
    tipoPlano: null
  }]

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

  constructor(private fb: FormBuilder, private productService: ProductService, private route: ActivatedRoute, private router: Router, private clientService: ClientService) { }

  ngOnInit() {
    const idVendaPlano = parseInt(this.route.snapshot.paramMap.get('id-venda-plano'));

    this.clientService.buscarPorId(this.idCliente).subscribe(cliente => {
      this.cliente = cliente.find(cliente => true)
      this.venda.cliente = cliente.find(cliente => true)
    });

    this.productService.buscarPlanos().subscribe(planos => {
      this.planos = planos;
    })

    this.productService.buscarVendaPlanoPorId(idVendaPlano).subscribe(vendaPlano => {
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
    const numeroTelefone = this.vendaPlano.numeroTelefone;
    const imei = this.vendaPlano.imei;
    this.vendaPlano.numeroTelefone = null;
    this.vendaPlano.imei = null;
    if (this.vendaPlano.status == true)
      this.vendaPlano.status = false;
    this.productService.altVendaPlano(this.vendaPlano).subscribe(() => {
      //this.productService.showMessage('Plano Alterado com sucesso!')
    })

    setTimeout(() => {
      console.log(this.venda)
      this.productService.cadVenda(this.venda).subscribe((venda) => {
        this.venda = venda
        this.vendaPlano.venda = venda
      })
    }, 300)
    
    setTimeout(() => {
      this.vendaPlano.numeroTelefone = numeroTelefone;
      this.vendaPlano.imei = imei;
      this.cadastrarVendaPlano()
    }, 700)
    
    setTimeout(() => {
      this.alterarVenda()
    }, 700)
  }

  cadastrarVendaPlano(): void {
    this.vendaPlano.codVendaPlano = null;
    this.vendaPlano.venda = this.venda;
    this.venda.valorTotal += this.planos[this.selected].valorPlano;
    this.venda.quantidadeChips += 1;
    this.vendaPlano.plano = this.planos[this.selected]
    this.productService.cadVendaPlano(this.vendaPlano).subscribe((vendaPlano) => {
      this.productService.showMessage('Operação Executada com sucesso!!!')
    }),
      console.log(this.vendaPlano);
      console.log(this.venda);
  }

  alterarVenda() {
    this.productService.altVenda(this.venda).subscribe(() => {
      this.productService.showMessage('Compra finalizada com sucesso!')
    })
  }

  cancel() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.router.navigate([`/acompanhamento-de-pedido/alterar-venda/${id}`])
  }
}
