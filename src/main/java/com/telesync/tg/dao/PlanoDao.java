package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.telesync.tg.model.Plano;
import com.telesync.tg.repository.JpaPlanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanoDao implements Dao<Plano> {

    @Autowired
    JpaPlanoRepository repository;

    @Override
    public List<Plano> listar(List<Integer> ids) {
        return null;
    }

    @Override
    public List<Plano> listar() {
        return repository.findAll();
    }

    @Override
    public void inserir(String entity) throws JsonProcessingException {

    }

    @Override
    public void alterar(String entity) {

    }

    @Override
    public void deletar(List<Integer> ids) {

    }
}
