import { ClientService } from './../../client/client.service';
import { Internet } from './../models/product.internet.model';
import { Venda } from './../models/product-venda.model';
import { VendaPlano } from './../models/product-venda-plano.model';
import { Cliente } from './../../client/client.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  formulario: FormGroup;

  constructor(private clientService: ClientService, private productService: ProductService, private router: Router, private fb: FormBuilder) { }

  cliente: Cliente = new Cliente()
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
      codVendaPlano: null,
      numeroTelefone: null,
      ddd: '',
      imei: null,
      venda: this.venda,
      plano: this.plano
    }

  ngOnInit(): void {
      const id = 1;
      this.clientService.buscarPorId(id).subscribe(cliente => {
        this.cliente = cliente
      });

      

      this.formulario = this.fb.group({
        nomePlano: ['', Validators.required],
        ddd: [null, Validators.required],
        numeroChip: [null, Validators.required],
        numero: [null, Validators.required],
        valorTotal: [null, Validators.required]
      })
    }

  cadastrarProduto(): void {
      this.productService.cadastrar(this.plano).subscribe(() => {
        this.productService.showMessage('Operação Executada com sucesso!!!')
        this.router.navigate(['/crud-product'])
      })
    }

  cancel() {
      this.router.navigate(['/crud-product'])
    }

  }
