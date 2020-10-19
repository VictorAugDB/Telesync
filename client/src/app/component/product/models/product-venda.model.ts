import { Cliente } from '../../client/client.model';

export class Venda{
    codVenda?: number;
    quantidadeChips: number;
    dtVenda: string;
    dtVencimento: string;
    valorTotal: number;
    obs?: string;
    formaPagamento: number;
    statusPagamento: number;
    cliente: Cliente;
}