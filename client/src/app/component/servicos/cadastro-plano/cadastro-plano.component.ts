import { AuthenticationService } from 'src/app/account/shared/authentication.service';
import { Observable } from 'rxjs';
import { ClientService } from './../../cliente/client.service';
import { Venda } from './../models/product-venda.model';
import { VendaPlano } from './../models/product-venda-plano.model';
import { Cliente } from './../../cliente/client.model';
import { Plano } from '../models/product-plano.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

function setActualDate() {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
function setdtVencimento() {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 2}-${date.getDate()}`;
}

@Component({
  selector: 'app-cadastro-plano',
  templateUrl: './cadastro-plano.component.html',
  styleUrls: ['./cadastro-plano.component.css']
})


export class CadastroPlanoComponent implements OnInit {

  constructor(private clientService: ClientService, private productService: ProductService, private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService) { }

  formVendaPlano: FormGroup;
  formVenda: FormGroup;

  selected = null;

  codClienteVend = null;

  cliente: Cliente = null

  codigosVendaPlano = []

  profile = {
    imei: null,
    numeroTelefone: null,
  }

  planos: Array<Plano> = [{
    codPlano: null,
    nomePlano: '',
    valorPlano: null,
    cicloDias: null,
    tipoPlano: null
  }]

  plano: Plano = new Plano()

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


  vendaPlano: VendaPlano = {
    numeroTelefone: null,
    ddd: '',
    imei: null,
    status: null,
    venda: this.venda,
    plano: this.planos[this.selected]
  }

  ngOnInit(): void {
    const deCodeToken = this.authenticationService.decodePayLoadJWT()
    const id = deCodeToken.codUsuario;
    if (!deCodeToken.isFuncionario) {
      this.clientService.buscarPorId(id).subscribe(cliente => {
        this.cliente = cliente.find(cliente => true)
        this.venda.cliente = cliente.find(cliente => true)
      });
    }

    this.buscarPlanos();

    this.formVendaPlano = this.fb.group({
      nomePlano: ['', Validators.required],
      valorPlano: [{ value: '', disabled: true }, Validators.required],
      cicloDias: [{ value: '', disabled: true }, Validators.required],
      tipoPlano: [{ value: '', disabled: true }, Validators.required],
      ddd: ['', Validators.required],
      imei: [{ value: '', disabled: true }, Validators.required],
      numeroTelefone: [{ value: '', disabled: true }, Validators.required],
      quantidadeChips: [{ value: '', disabled: true }, Validators.required],
      formaPagamento: ['', Validators.required],
      valorTotal: [{ value: '', disabled: true }, Validators.required],
      codCliente: [{ value: '' }, Validators.required],
      nomeCliente: [''],
      cpfCliente: [''],
    })
  }

  buscarPlanos(): void {
    this.productService.buscarPlanos().subscribe(planos => {
      this.planos = planos;
    })
  }

  gerarNumeroImei(): void {
    this.vendaPlano.imei = Math.floor(Math.random() * (93456789245612) + 300000000000000)
  }

  gerarNumeroTelefone() {
    this.vendaPlano.numeroTelefone = Math.floor(Math.random() * (9999999) + 990000000)

  }

  gerarImeiTelefone() {
    this.gerarNumeroTelefone();
    this.gerarNumeroImei();
  }

  buscarPlano(): void {
    this.productService.buscarPlanoPorId(this.selected).subscribe(plano => {
      this.plano = plano.find(plano => true)
    });
  }

  cadastrarVenda(): void {
    if (this.venda.codVenda == null) {
      this.productService.cadVenda(this.venda).subscribe((venda) => {
        this.venda = venda
        this.vendaPlano.venda = venda
      })
    }
  }

  excluirVenda(): void {
    this.productService.deletarVenda(this.venda.codVenda).subscribe(() => {
      this.productService.showMessage('Venda Cancelada!')
      this.router.navigate([''])
    })
  }

  excluirVendaPlanos(): void {
    this.venda.quantidadeChips = 0;
    this.venda.valorTotal = 0;
    this.productService.deletarVendaPlanos(this.codigosVendaPlano).subscribe(() => {
    })
  }

  habilitaBtnFinalizar() {
    let el = <HTMLButtonElement>document.getElementById("finalizar")
    if (this.codigosVendaPlano.length < 1) {
      el.disabled = true;
    } else {
      el.disabled = false;
    }
  }

  excluirTudo() {
    if (this.codigosVendaPlano.length > 0) {
      this.excluirVendaPlanos();
      setTimeout(() => {
        this.excluirVenda();
      }, 500)
    } else {
      this.router.navigate([''])
    }
  }

  cadastrarVendaVendaPlano() {
    this.cadastrarVenda()
    setTimeout(() => {
      this.cadastrarVendaPlano()
    }, 500)
  }

  cadastrarVendaPlano(): void {
    this.vendaPlano.venda = this.venda;
    this.venda.valorTotal += this.planos[this.selected].valorPlano;
    this.venda.quantidadeChips += 1;
    this.vendaPlano.plano = this.planos[this.selected]
    this.productService.cadVendaPlano(this.vendaPlano).subscribe((vendaPlano) => {
      this.codigosVendaPlano.push(vendaPlano.codVendaPlano)
      this.productService.showMessage('Operação Executada com sucesso!!!')
      console.log(vendaPlano)
    }),
      console.log(this.vendaPlano);
    console.log(this.venda);
  }

  alterarVenda() {
    this.productService.altVenda(this.venda).subscribe(() => {
      this.productService.showMessage('Compra finalizada com sucesso!')
      this.router.navigate(['/analise'])
    })
  }

  getPermissao() {
    const token = this.authenticationService.decodePayLoadJWT()
    return token.isFuncionario;
  }

  cancel() {
    this.router.navigate(['/crud-product'])
  }

  buscarClienteOnChange() {
    const busca = document.getElementById('codCliente')
    busca.addEventListener('change', (event) => {
      this.clientService.buscarPorId(this.codClienteVend).subscribe(cliente => {
        this.cliente = cliente.find(cliente => true)
        this.venda.cliente = cliente.find(cliente => true)
      });
    })
  }

}
