import { Cliente } from '../../cliente/client.model';

export class Venda{
    codVenda?: number;
    quantidadeChips: number;
    dtVenda: string;
    dtVencimento: string;
    valorTotal: number;
    obs?: string;
    formaPagamento: string;
    status: boolean;
    cliente: Cliente;
}