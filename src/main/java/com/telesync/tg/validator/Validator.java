package com.telesync.tg.validator;

import java.util.Map;

public interface Validator<T> {
    // Retorna HTTP Status e mensagem para Response Entity
    Map<Integer, String> validate(T entity);
}
