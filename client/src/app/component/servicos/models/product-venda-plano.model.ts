import { Plano } from './product-plano.model';
import { Venda } from './product-venda.model';

export class VendaPlano{
    codVendaPlano?: number;
    numeroTelefone: number;
    ddd: string;
    imei: number;
    status: boolean;
    venda: Venda;
    plano: Plano;
}