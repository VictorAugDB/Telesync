package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telesync.tg.model.VendaPlano;
import com.telesync.tg.repository.JpaVendaPlanoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class VendaPlanoDao implements Dao<VendaPlano> {

    @Autowired
    JpaVendaPlanoRepository repository;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public List<VendaPlano> listar(List<Integer> ids) {
        return repository.findAllById(ids);
    }

    @Override
    public List<VendaPlano> listar() {
        return repository.findAll();
    }

    @Override
    public void inserir(String entity) throws JsonProcessingException {
        final var vendaPlano = objectMapper.readValue(entity, VendaPlano.class);
        repository.save(vendaPlano);
    }

    @Override
    public void alterar(String entity) throws JsonProcessingException {
        inserir(entity);
    }

    @Override
    public void deletar(List<Integer> ids) {
        final var vendaPlanos = listar(ids);
        repository.deleteInBatch(vendaPlanos);
        log.debug("Venda plano(s) com o(s) id(s) {} exlcluido(s) com sucesso", ids);
    }
}
