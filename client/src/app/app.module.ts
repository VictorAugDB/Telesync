import { LoginComponent } from './account/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from "@angular/material/toolbar";

import{ MatSidenavModule } from "@angular/material/sidenav";
import{ MatListModule } from "@angular/material/list";
import { HomeComponent } from './views/home/home.component';
import{ MatCardModule } from "@angular/material/card";
import { CadastroClienteComponent } from './component/cliente/cadastro-cliente/cadastro-cliente.component';
import{ MatButtonModule } from "@angular/material/button";
import{ MatSnackBarModule } from "@angular/material/snack-bar";
import{ HttpClient, HttpClientModule } from "@angular/common/http";
import{ FormsModule, ReactiveFormsModule } from "@angular/forms";
import{ MatFormFieldModule } from "@angular/material/form-field";
import{ MatInputModule } from "@angular/material/input";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CadastroPlanoComponent } from './component/servicos/cadastro-plano/cadastro-plano.component';
import { AcompanhamentoDePedidoComponent } from './component/servicos/acompanhamento_de_pedido/acompanhamento-de-pedido.component';
import { AnaliseDeCreditoComponent } from './component/servicos/analise-de-credito/analise-de-credito.component';
import { ContratoComponent } from './component/servicos/contrato/contrato.component';
import { ListarVendasComponent } from './component/servicos/listar-vendas/listar-vendas.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { AcompanharPedidoEspecificoComponent } from './component/servicos/acompanhar-pedido-especifico/acompanhar-pedido-especifico.component';
import { ListarVendaPlanosComponent } from './component/servicos/listar-venda-planos/listar-venda-planos.component';
import { RecuperarSenhaComponent } from './component/recuperar-senha/recuperar-senha.component';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { TaskListComponent } from './views/task-list/task-list.component';

import { httpInterceptorProviders } from './http-interceptors';
import { AlterarVendaPlanoComponent } from './component/servicos/alterar-venda-plano/alterar-venda-plano.component';
import { AlterarVendaComponent } from './component/servicos/alterar-venda/alterar-venda.component';
import { AlterarDadosCadastraisComponent } from './component/cliente/alterar-dados-cadastrais/alterar-dados-cadastrais.component';
import { RelatorioDeVendasComponent } from './component/gerencial/relatorio-de-vendas/relatorio-de-vendas.component';
import { ListarClientesComponent } from './component/servicos/listar-clientes/listar-clientes.component';

registerLocaleData(localePT)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroClienteComponent,
    CadastroPlanoComponent,
    AcompanhamentoDePedidoComponent,
    AnaliseDeCreditoComponent,
    ContratoComponent,
    ListarVendasComponent,
    AcompanharPedidoEspecificoComponent,
    ListarVendaPlanosComponent,
    LoginComponent,
    RecuperarSenhaComponent,
    AuthenticationComponent,
    TaskListComponent,
    AlterarVendaPlanoComponent,
    AlterarVendaComponent,
    AlterarDadosCadastraisComponent,
    RelatorioDeVendasComponent,
    ListarClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    HttpClient,
    {
    provide: LOCALE_ID,
    useValue: 'pt-BR'
    },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
