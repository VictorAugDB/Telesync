import { CadastroClienteComponent } from './component/client/cadastro-cliente/cadastro-cliente.component';
import { ClientCrudComponent } from './views/client-crud/client-crud.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { CadastroProdutoComponent } from './component/product/cadastro-produto/cadastro-produto.component';

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
  component: CadastroProdutoComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
