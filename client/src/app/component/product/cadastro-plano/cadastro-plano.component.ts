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

  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder, private cliente: Cliente) { }

  plano: Plano = {
    nomePlano: '',
    valorPlano: null,
    cicloDias: null,
    internet: null,
    minutosTelefone: null,
    tipoPlano: null,
  }

  venda: VendaPlano = {
    codVendaPlano: null,
    numeroTelefone: null,
    ddd: '',
    imei: null,
    venda:{
      quantidadeChips: null,
      dtVenda: '2020-02-02',
      dtVencimento: '2020-03-02',
      valorTotal: null,
      obs: '',
      formaPagamento: null,
      statusPagamento: 2,
      cliente: {
        cpfCliente: null,
        nomeCliente: '',
        dtNascCliente: '',
        sexoCliente: '',
        estadoCivilCliente: '',
        nomeMaeCliente: '',
        ufCliente: '',
        cidadeCliente: '',
        logradouroCliente: '',
        cepCliente: null,
        numeroCliente: null,
        bairroCliente: '',
        profissaoCliente: '',
        liberacaoCredito: null,
        dtCadastroCliente: null,
        login: {
          email: '',
          senha: '',
          codPermissao: null
        }
      }
    },
    plano:{
      codPlano: 1,
      nomePlano: "familia",
      valorPlano: 300.0,
      cicloDias: 30,
      internet: {
        codPacInternet: 1,
        quantInternet: 120,
        valorInternet: 200.0
      },
      minutosTelefone: {
        codPacMinutos: 0,
        quantMinutos: 0,
        valorMinutos: 0.0,
        tipoLinha: 1
      },
      tipoPlano: 1
    }
  }

  ngOnInit(): void {
    const id = 1;
    this.productService.buscarPorId(id).subscribe(cliente => {
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
