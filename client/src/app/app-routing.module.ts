import { ContratoComponent } from './component/servicos/contrato/contrato.component';
import { AnaliseDeCreditoComponent } from './component/servicos/analise-de-credito/analise-de-credito.component';
import { CadastroClienteComponent } from './component/cliente/cadastro-cliente/cadastro-cliente.component';
import { ClientCrudComponent } from './views/client-crud/client-crud.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { CadastroPlanoComponent } from './component/servicos/cadastro-plano/cadastro-plano.component';

const routes: Routes = [{
  path: "",
  component: HomeComponent
},
{
  path: "crud-cliente",
  component: ClientCrudComponent
},{
  path: "crud-cliente/cadastro",
  component: CadastroClienteComponent
},{
  path: "crud-product",
  component: ProductCrudComponent
},{
  path: "crud-product/cadastro",
  component: CadastroPlanoComponent
},{
  path: "analise",
  component: AnaliseDeCreditoComponent
},{
  path: "contrato",
  component: ContratoComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
