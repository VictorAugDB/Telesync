package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface Dao<T> {
    List<T> listar(List<Integer> ids);
    List<T> listar();
    void inserir(String entity) throws JsonProcessingException;
    void alterar(String entity) throws JsonProcessingException;
    void deletar(List<Integer> ids);
}
