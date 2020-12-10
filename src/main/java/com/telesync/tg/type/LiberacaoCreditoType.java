package com.telesync.tg.type;

public enum LiberacaoCreditoType {
    REPROVADO,
    APROVADO,
    PENDENTE;

    public String getType() {
        return this.toString();
    }
}
