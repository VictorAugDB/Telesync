package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telesync.tg.entity.VendaPlano;
import com.telesync.tg.repository.JpaVendaPlanoRepository;
import com.telesync.tg.validator.Validator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Slf4j
public class VendaPlanoDao extends AbstractDao<VendaPlano> {

    @Autowired
    JpaVendaPlanoRepository repository;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    Validator<VendaPlano> validator;

    @Override
    public List<VendaPlano> listar(List<Integer> ids) {
        return repository.findAllById(ids);
    }

    @Override
    public List<VendaPlano> listar() {
        return repository.findAll();
    }

    @Override
    public VendaPlano inserir(String entity) throws JsonProcessingException {
        final var vendaPlano = objectMapper.readValue(entity, VendaPlano.class);
        if (!validator.validate(vendaPlano)) {
            throw new NoSuchElementException(String.format("A venda plano [%s] não é válida", vendaPlano));
        }
        return repository.save(vendaPlano);
    }

    @Override
    public void alterar(String entity) throws JsonProcessingException {
        final var vendaPlano = objectMapper.readValue(entity, VendaPlano.class);
        if (checkIfVendaPlanoExists(vendaPlano)) {
            repository.save(vendaPlano);
        } else  {
            log.error("A venda plano {} não existe", vendaPlano.toString());
        }
    }

    @Override
    public void deletar(List<Integer> ids) {
        final var vendaPlanos = listar(ids);
        repository.deleteInBatch(vendaPlanos);
    }

    private boolean checkIfVendaPlanoExists(VendaPlano vendaPlano) {
        return repository.existsById(vendaPlano.getCodVendaPlano());
    }
}
