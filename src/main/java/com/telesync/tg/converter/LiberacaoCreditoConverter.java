package com.telesync.tg.converter;

import com.telesync.tg.type.LiberacaoCreditoType;

import javax.persistence.AttributeConverter;
import java.util.Objects;

public class LiberacaoCreditoConverter implements AttributeConverter<LiberacaoCreditoType, String> {
    @Override
    public String convertToDatabaseColumn(LiberacaoCreditoType liberacaoCredito) {
        if (Objects.equals(liberacaoCredito, LiberacaoCreditoType.REPROVADO)) {
            return LiberacaoCreditoType.REPROVADO.toString();
        }
        return LiberacaoCreditoType.APROVADO.toString();
    }

    @Override
    public LiberacaoCreditoType convertToEntityAttribute(String dbData) {
        return LiberacaoCreditoType.valueOf(dbData);
    }
}
