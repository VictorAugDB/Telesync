import { AuthenticationService } from 'src/app/account/shared/authentication.service';
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

enum Liberacao {
  REPROVADO = 0,
  APROVADO = 1,
  PENDENTE = 2
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

  liberacaoCliente = 0;

  deCodeToken = this.authenticationService.decodePayLoadJWT()
  idCliente = this.deCodeToken.codUsuario;

  codClienteVend = null;

  cliente: Cliente = null

  codigosVendaPlano = [];

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
    active: true,
    venda: this.venda,
    plano: this.planos[this.selected]
  }

  vendaPlanos = [];

  ngOnInit(): void {
    if (!this.deCodeToken.isFuncionario) {
      this.clientService.buscarPorId(this.idCliente).subscribe(cliente => {
        this.cliente = cliente.find(cliente => true)
        this.venda.cliente = cliente.find(cliente => true)
        const client = this.cliente
        this.liberacaoCliente = parseInt(Liberacao[client.liberacaoCredito])
        if (this.liberacaoCliente === 0) {
          alert('Você não pode adquirir planos, pois seu crédito está reprovado!!!')
          this.router.navigate([''])
        }
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

  cadastrarVendaVendaPlano() {
    if (this.vendaPlano.numeroTelefone !== null && this.vendaPlano.imei !== null) {
      this.plano = this.planos[this.selected]
      console.log(this.plano);
      this.vendaPlanos.push({
        numeroTelefone: this.vendaPlano.numeroTelefone,
        ddd: this.vendaPlano.ddd,
        imei: this.vendaPlano.imei,
        active: this.vendaPlano.active,
        plano: this.plano,
        venda: this.vendaPlano.venda,
      });
      this.vendaPlano.numeroTelefone = null;
      this.vendaPlano.imei = null;
      this.venda.valorTotal += this.planos[this.selected].valorPlano;
      this.venda.quantidadeChips += 1;
        this.productService.showMessage("Plano Adicionado Com sucesso!")
    } else {
      alert("Escolha um novo plano ou finalize a compra")
    }
  }

  cadastrarVendaPlano(): void {
    this.vendaPlanos.forEach((el, i) => {
      setTimeout(() => {
        el.venda = this.venda;
        this.productService.cadVendaPlano(el).subscribe((vendaPlano) => {
          this.codigosVendaPlano.push(vendaPlano.codVendaPlano)
          console.log(vendaPlano)
        })
      }, 300)
    })
  }

  alterarVenda() {
    this.productService.altVenda(this.venda).subscribe(() => {
      this.productService.showMessage('Compra finalizada com sucesso!')
      if (this.deCodeToken.isFuncionario) {
        this.router.navigate([`analise/${this.venda.cliente.codCliente}/venda/${this.venda.codVenda}`])
      } else {
        this.router.navigate([`/analise/${this.venda.codVenda}`])
      }
    })
  }

  finalizarVenda() {
    this.cadastrarVenda()

    setTimeout(() => {
      this.cadastrarVendaPlano()
      console.log(this.venda)
    }, 500)

    setTimeout(() => {
      this.alterarVenda()
    }, 500)
  }

  getPermissao() {
    const token = this.authenticationService.decodePayLoadJWT()
    return token.isFuncionario;
  }

  cancel() {
    this.router.navigate([''])
  }

  addEventListenerAll(element, events, fn) {
    events.split(' ').forEach((event) => {
      element.addEventListener(event, fn, false)
    })
  }

  buscarClienteOnChange() {
    const busca = document.getElementById('codCliente')
    this.addEventListenerAll(busca, 'change keyup', (event) => {
      this.clientService.buscarPorId(this.codClienteVend).subscribe(cliente => {
        this.cliente = cliente.find(cliente => true)
        this.venda.cliente = cliente.find(cliente => true)
      });
    })
  }

  liberaFinalizar() {
    if (this.vendaPlanos.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  zerarNumeroTelImei() {
    this.vendaPlano.numeroTelefone = null;
    this.vendaPlano.imei = null;
  }
}
