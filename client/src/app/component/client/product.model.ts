export interface Cliente{
    codigoCliente: number
    cpfCliente: number
    nomeCliente: string
    dtNascCliente: number
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
    liberacaoCredito?: number
    dtCadastroCliente: number
    codLogin: number   
}