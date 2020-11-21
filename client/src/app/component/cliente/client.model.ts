import { PerguntaSecreta } from './pergunta.secreta.model';
import { Login } from './login.model';

export class Cliente{
    codCliente?: number
    cpfCliente: number
    nomeCliente: string
    dtNascCliente: string
    sexoCliente: string
    estadoCivilCliente: string
    nomeMaeCliente: string
    ufCliente: string
    cidadeCliente: string
    logradouroCliente: string
    cepCliente: number
    numeroCliente: number
    complementoCliente?: string
    bairroCliente: string
    profissaoCliente: string
    liberacaoCredito: number
    dtCadastroCliente: string
    perguntaSecreta: PerguntaSecreta
    respostaSecreta: string
    login: Login;
}