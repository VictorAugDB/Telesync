import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../product.model';
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

  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder) { }

  product: Product = {
    nomePlano: '',
    ddd: null,
    numeroChip: null,
    numero: null,
    valorTotal: null
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nomePlano: ['', Validators.required],
      ddd: [null, Validators.required],
      numeroChip: [null, Validators.required],
      numero: [null, Validators.required],
      valorTotal: [null, Validators.required]    
    })
  }

  cadastrarProduto(): void{
    this.productService.cadastrar(this.product).subscribe(()=>{
      this.productService.showMessage('Operação Executada com sucesso!!!')
      this.router.navigate(['/crud-product'])
    })
  }

  cancel(){
    this.router.navigate(['/crud-product'])
  }

}
