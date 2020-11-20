package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telesync.tg.entity.Venda;
import com.telesync.tg.repository.JpaVendaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class VendaDao extends AbstractDao<Venda> {

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
    public Map<Venda, Map<Integer, String>> inserir(String entity) throws JsonProcessingException {
        final var venda = objectMapper.readValue(entity, Venda.class);
        // Validacao ainda nao implementada
        return Map.of(repository.save(venda), Map.of(200, ""));
    }

    @Override
    public void alterar(String entity) throws JsonProcessingException {
        final var venda = objectMapper.readValue(entity, Venda.class);
        if (checkIfVendaExists(venda)) {
            repository.save(venda);
        } else {
            log.error("A venda {} não existe", venda.toString());
        }
    }

    @Override
    public void deletar(List<Integer> ids) {
        final var vendas = listar(ids);
        repository.deleteInBatch(vendas);
    }

    private boolean checkIfVendaExists(Venda venda) {
        return repository.existsById(venda.getCodVenda());
    }
}
