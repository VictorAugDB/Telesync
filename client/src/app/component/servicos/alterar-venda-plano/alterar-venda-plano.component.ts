import { Venda } from './../models/product-venda.model';
import { VendaPlano } from './../models/product-venda-plano.model';
import { Plano } from './../models/product-plano.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alterar-venda-plano',
  templateUrl: './alterar-venda-plano.component.html',
  styleUrls: ['./alterar-venda-plano.component.css']
})
export class AlterarVendaPlanoComponent implements OnInit {

  formVendaPlano: FormGroup;

  venda: Venda = null;

  selected = null;

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
    venda: this.venda,
    plano: this.planos[this.selected]
  }

  constructor(private fb: FormBuilder, private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const idVendaPlano = parseInt(this.route.snapshot.paramMap.get('id-venda-plano'));

    this.productService.buscarPlanos().subscribe(planos => {
      this.planos = planos;
    })

    this.productService.buscarVendaPlanoPorId(idVendaPlano).subscribe(vendaPlano => {
      const vendaPlan = vendaPlano.find(vendaPlano => true);
      this.vendaPlano = vendaPlan;
      this.venda = vendaPlan.venda;
      this.selected = vendaPlan.plano.codPlano -1;
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
    this.gerarNumeroImei()
    this.gerarNumeroTelefone()
  }

  alterarVendaPlano() {
    this.vendaPlano.plano = this.planos[this.selected];
    this.productService.altVendaPlano(this.vendaPlano).subscribe(() => {
      this.productService.showMessage('Plano Alterado com sucesso!')
      this.cancel();
    })
  }

  cancel(){
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.router.navigate([`/acompanhamento-de-pedido/alterar-venda/${id}`])
  }
}
