import { AlterarDadosCadastraisComponent } from './component/cliente/alterar-dados-cadastrais/alterar-dados-cadastrais.component';
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
import { AlterarVendaComponent } from './component/servicos/alterar-venda/alterar-venda.component';
import { AlterarVendaPlanoComponent } from './component/servicos/alterar-venda-plano/alterar-venda-plano.component';
import { RelatoriosComponent } from './views/relatorios/relatorios.component';
import { RelatorioDeVendasComponent } from './component/gerencial/relatorio-de-vendas/relatorio-de-vendas.component';

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
},{
  path: "acompanhamento-de-pedido",
  component: AcompanhamentoDePedidoComponent
},{
  path: "acompanhamento-de-pedido/venda/:id",
  component: AcompanharPedidoEspecificoComponent
},{
  path: "acompanhamento-de-pedido/alterar-venda/:id",
  component: AlterarVendaComponent
},{
  path: "acompanhamento-de-pedido/alterar-venda/:id/alterar-plano/:id-venda-plano",
  component: AlterarVendaPlanoComponent
},{
  path: "alterar-dados-cadastrais",
  component: AlterarDadosCadastraisComponent
},{
  path: "relatórios",
  component: RelatoriosComponent
},{
  path: "relatórios/relatório-vendas",
  component: RelatorioDeVendasComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
