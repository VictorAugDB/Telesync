package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telesync.tg.entity.Venda;
import com.telesync.tg.repository.JpaVendaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public Venda inserir(String entity) throws JsonProcessingException {
        final var venda = objectMapper.readValue(entity, Venda.class);
        return repository.save(venda);
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
        if (vendas.isEmpty()) {
            log.error("Vendas não encontradas");
        } else {
            vendas.forEach(v -> v.setStatus(false));
            repository.saveAll(vendas);
            log.debug("Venda(s) com o(s) id(s) {} foram cancelado(s) com sucesso", ids);
        }
    }

    private boolean checkIfVendaExists(Venda venda) {
        return repository.existsById(venda.getCodVenda());
    }
}
