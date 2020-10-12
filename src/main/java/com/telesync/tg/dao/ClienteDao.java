package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telesync.tg.model.Cliente;
import com.telesync.tg.repository.JpaClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteDao implements Dao<Cliente> {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    JpaClientRepository repository;

    @Override
    public Cliente listar() {
        return null;
    }

    @Override
    public void inserir(String entity) throws JsonProcessingException {
        final var cliente = objectMapper.readValue(entity, Cliente.class);
        repository.save(cliente);
    }

    @Override
    public void alterar(String entity) {

    }

    @Override
    public void deletar(List<Integer> ids) {

    }
}
