import { Internet } from './../models/product.internet.model';
import { Venda } from './../models/product-venda.model';
import { VendaPlano } from './../models/product-venda-plano.model';
import { Cliente } from './../../client/client.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Plano } from '../models/product-plano.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MinutosTelefone } from '../models/product.minutos-telefone.model';

@Component({
  selector: 'app-cadastro-plano',
  templateUrl: './cadastro-plano.component.html',
  styleUrls: ['./cadastro-plano.component.css']
})
export class CadastroPlanoComponent implements OnInit {

  formulario: FormGroup;

  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder, private cliente: Cliente) { }

  minutosTelefone: MinutosTelefone = {
      codPacMinutos: 0,
      quantMinutos: 0,
      valorMinutos: 0.0,
      tipoLinha: 1
    }

  internet: Internet = {
      codPacInternet: 1,
      quantInternet: 120,
      valorInternet: 200.0
    }

  plano: Plano = {
      codPlano: 1,
      nomePlano: "familia",
      valorPlano: 300.0,
      cicloDias: 30,
      internet: {
        codPacInternet: this.internet.codPacInternet,
        quantInternet: this.internet.quantInternet,
        valorInternet: this.internet.valorInternet
      },
      minutosTelefone: {
        codPacMinutos: this.minutosTelefone.codPacMinutos,
        quantMinutos: this.minutosTelefone.quantMinutos,
        valorMinutos: this.minutosTelefone.valorMinutos,
        tipoLinha: this.minutosTelefone.tipoLinha
      },
      tipoPlano: 1
    }

  venda: Venda = {
      quantidadeChips: null,
      dtVenda: '2020-02-02',
      dtVencimento: '2020-03-02',
      valorTotal: null,
      obs: '',
      formaPagamento: null,
      statusPagamento: 2,
      cliente: {
        cpfCliente: this.cliente.cpfCliente,
        nomeCliente: this.cliente.nomeCliente,
        dtNascCliente: this.cliente.dtNascCliente,
        sexoCliente: this.cliente.sexoCliente,
        estadoCivilCliente: this.cliente.estadoCivilCliente,
        nomeMaeCliente: this.cliente.nomeMaeCliente,
        ufCliente: this.cliente.ufCliente,
        cidadeCliente: this.cliente.cidadeCliente,
        logradouroCliente: this.cliente.logradouroCliente,
        cepCliente: this.cliente.cepCliente,
        numeroCliente: this.cliente.numeroCliente,
        bairroCliente: this.cliente.bairroCliente,
        profissaoCliente: this.cliente.profissaoCliente,
        liberacaoCredito: this.cliente.liberacaoCredito,
        dtCadastroCliente: this.cliente.dtCadastroCliente,
        login: {
          email: this.cliente.login.email,
          senha: this.cliente.login.senha,
          codPermissao: this.cliente.login.codPermissao,
        }
      }
    }

  vendaPlano: VendaPlano = {
      codVendaPlano: null,
      numeroTelefone: null,
      ddd: '',
      imei: null,
      venda: {
        quantidadeChips: this.venda.quantidadeChips,
        dtVenda: this.venda.dtVenda,
        dtVencimento: this.venda.dtVencimento,
        valorTotal: this.venda.valorTotal,
        obs: this.venda.obs,
        formaPagamento: null,
        statusPagamento: 2,
        cliente: {
          cpfCliente: this.cliente.cpfCliente,
          nomeCliente: this.cliente.nomeCliente,
          dtNascCliente: this.cliente.dtNascCliente,
          sexoCliente: this.cliente.sexoCliente,
          estadoCivilCliente: this.cliente.estadoCivilCliente,
          nomeMaeCliente: this.cliente.nomeMaeCliente,
          ufCliente: this.cliente.ufCliente,
          cidadeCliente: this.cliente.cidadeCliente,
          logradouroCliente: this.cliente.logradouroCliente,
          cepCliente: this.cliente.cepCliente,
          numeroCliente: this.cliente.numeroCliente,
          bairroCliente: this.cliente.bairroCliente,
          profissaoCliente: this.cliente.profissaoCliente,
          liberacaoCredito: this.cliente.liberacaoCredito,
          dtCadastroCliente: this.cliente.dtCadastroCliente,
          login: {
            email: this.cliente.login.email,
            senha: this.cliente.login.senha,
            codPermissao: this.cliente.login.codPermissao,
          }
        }
      },
      plano: {
        codPlano: this.plano.codPlano,
        nomePlano: this.plano.nomePlano,
        valorPlano: this.plano.valorPlano,
        cicloDias: this.plano.cicloDias,
        internet: {
          codPacInternet: this.internet.codPacInternet,
          quantInternet: this.internet.quantInternet,
          valorInternet: this.internet.valorInternet
        },
        minutosTelefone: {
          codPacMinutos: this.minutosTelefone.codPacMinutos,
          quantMinutos: this.minutosTelefone.quantMinutos,
          valorMinutos: this.minutosTelefone.valorMinutos,
          tipoLinha: this.minutosTelefone.tipoLinha
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
