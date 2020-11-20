package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Map;

public class AbstractDao<T> implements Dao<T> {

    @Override
    public List<T> listar(List<Integer> ids) {
        return null;
    }

    @Override
    public List<T> listar() {
        return null;
    }

    @Override
    public Map<T, Map<Integer, String>> inserir(String entity) throws JsonProcessingException {
        return null;
    }

    @Override
    public void alterar(String entity) throws JsonProcessingException {

    }

    @Override
    public void deletar(List<Integer> ids) {

    }

    @Override
    public T getUsuarioByLogin(UserDetails userDetails) {
        return null;
    }
}
