package com.telesync.tg.validator;

public interface Validator<T> {
    boolean validate(T entity);
}
