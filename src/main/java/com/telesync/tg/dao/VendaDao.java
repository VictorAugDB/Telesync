package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telesync.tg.model.Venda;
import com.telesync.tg.repository.JpaVendaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class VendaDao implements Dao<Venda> {

    @Autowired
    JpaVendaRepository repository;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public List<Venda> listar(List<Integer> ids) {
        return repository.findAllById(ids);
    }

    @Override
    public List<Venda> listar() {
        return repository.findAll();
    }

    @Override
    public void inserir(String entity) throws JsonProcessingException {
        final var venda = objectMapper.readValue(entity, Venda.class);
        repository.save(venda);
    }

    @Override
    public void alterar(String entity) throws JsonProcessingException {
        inserir(entity);
    }

    @Override
    public void deletar(List<Integer> ids) {
        final var vendas = listar(ids);
        repository.deleteInBatch(vendas);
        log.debug("Venda(s) com o(s) id(s) {} foram excluido(s) com sucesso", ids);
    }
}
