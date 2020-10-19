package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.telesync.tg.model.Venda;
import com.telesync.tg.repository.JpaVendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendaDao implements Dao<Venda> {

    @Autowired
    JpaVendaRepository repository;

    @Override
    public List<Venda> listar(List<Integer> ids) {
        return null;
    }

    @Override
    public List<Venda> listar() {
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
