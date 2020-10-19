import { Internet } from './product.internet.model';
import { MinutosTelefone } from './product.minutos-telefone.model';

export class Plano{
    codPlano?: number;
    nomePlano: string;
    valorPlano: number;
    cicloDias: number;
    internet: Internet;
    minutosTelefone: MinutosTelefone;
    tipoPlano: number;
}