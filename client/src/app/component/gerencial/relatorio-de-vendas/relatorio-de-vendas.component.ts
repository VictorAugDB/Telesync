import { FormBuilder, FormGroup } from '@angular/forms';
import { Plano } from './../../servicos/models/product-plano.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/account/shared/authentication.service';
import { VendaPlano } from '../../servicos/models/product-venda-plano.model';
import { ProductService } from '../../servicos/product.service';
import * as moment from 'moment';

@Component({
  selector: 'app-relatorio-de-vendas',
  templateUrl: './relatorio-de-vendas.component.html',
  styleUrls: ['./relatorio-de-vendas.component.css']
})
export class RelatorioDeVendasComponent implements OnInit {

  formulario: FormGroup;

  quantidade = 0;
  unidades = 0;
  valorTotal = 0;

  dataInicio
  dataFim

  relatorios = []

  planos: Plano[];
  vendaPlanos: VendaPlano[];

  constructor(private authenticationService: AuthenticationService, private router: Router, private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      dataInicio: '',
      dataFim: ''
    })
    this.productService.buscarVendaPlanos().subscribe((vendaPlanos) => {
      this.vendaPlanos = vendaPlanos;
    })

    this.productService.buscarPlanos().subscribe(planos => {
      this.planos = planos;
    })
  }


  gerarRelatorio() {
    let newDate1: moment.Moment = moment.utc(this.dataInicio).local();
    let nDateI = parseInt(newDate1.format("YYYYMMDD"));
    let newDate2: moment.Moment = moment.utc(this.dataFim).local();
    let nDateF = parseInt(newDate2.format("YYYYMMDD"));
    this.planos.forEach((el, i) => {
      this.vendaPlanos.forEach((el2, i) => {
        let newDate3: moment.Moment = moment.utc(el2.venda.dtVenda).local();
        let dataVenda = parseInt(newDate3.format("YYYYMMDD")) + 1;
        console.log(dataVenda)
        if (el.nomePlano == el2.plano.nomePlano && dataVenda >= nDateI && nDateF >= dataVenda) {
          this.quantidade++;
          this.unidades++;
          this.valorTotal += el.valorPlano;
          console.log(dataVenda >= nDateI && nDateF >= dataVenda)
        }
      })
      this.relatorios.push({ tipoPlano: el.tipoPlano, nomePlano: el.nomePlano, quantidade: this.quantidade, unidades: this.unidades, valorTotal: this.valorTotal })
      console.log(this.relatorios[i])
      this.quantidade = 0;
      this.unidades = 0;
      this.valorTotal = 0;
    })
  }
}
