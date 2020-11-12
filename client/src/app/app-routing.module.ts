import { LoginComponent } from './account/login/login.component';
import { AcompanhamentoDePedidoComponent } from './component/servicos/acompanhamento_de_pedido/acompanhamento-de-pedido.component';
import { ContratoComponent } from './component/servicos/contrato/contrato.component';
import { AnaliseDeCreditoComponent } from './component/servicos/analise-de-credito/analise-de-credito.component';
import { CadastroClienteComponent } from './component/cliente/cadastro-cliente/cadastro-cliente.component';
import { ClientCrudComponent } from './views/client-crud/client-crud.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { CadastroPlanoComponent } from './component/servicos/cadastro-plano/cadastro-plano.component';
import { AcompanharPedidoEspecificoComponent } from './component/servicos/acompanhar-pedido-especifico/acompanhar-pedido-especifico.component';
import { RecuperarSenhaComponent } from './component/recuperar-senha/recuperar-senha.component';
import { TaskListComponent } from './views/task-list/task-list.component';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { AuthGuard } from './account/shared/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", component: TaskListComponent },
      { path: "crud-product", component: ProductCrudComponent },
      { path: "crud-product/cadastro", component: CadastroPlanoComponent },
      { path: "analise", component: AnaliseDeCreditoComponent },
      { path: "contrato", component: ContratoComponent },
      { path: "acompanhamento-de-pedido", component: AcompanhamentoDePedidoComponent },
      { path: "acompanhamento-de-pedido/venda/:id", component: AcompanharPedidoEspecificoComponent },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children:[
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: "login", component: LoginComponent },
      { path: "recuperar-senha", component: RecuperarSenhaComponent },
      { path: "cadastro", component: CadastroClienteComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
