package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface Dao<T> {
    T listar();
    void inserir(String entity) throws JsonProcessingException;
    void alterar(String entity);
    void deletar(List<Integer> ids);
}
