package com.telesync.tg.converter;

import com.telesync.tg.type.LiberacaoCreditoType;

import javax.persistence.AttributeConverter;

public class LiberacaoCreditoConverter implements AttributeConverter<LiberacaoCreditoType, String> {
    @Override
    public String convertToDatabaseColumn(LiberacaoCreditoType liberacaoCredito) {
        return liberacaoCredito.getType();
    }

    @Override
    public LiberacaoCreditoType convertToEntityAttribute(String dbData) {
        return LiberacaoCreditoType.valueOf(dbData);
    }
}
