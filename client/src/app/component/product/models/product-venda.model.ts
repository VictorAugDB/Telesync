import { Cliente } from '../../client/client.model';

export class Venda{
    codVenda?: number;
    quantidadeChips: number;
    dtVenda: string;
    dtVencimento: string;
    valorTotal: number;
    obs?: string;
    formaPagamento: string;
    statusPagamento: number;
    cliente: Cliente;
}