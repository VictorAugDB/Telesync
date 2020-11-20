package com.telesync.tg.dao;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.telesync.tg.entity.Plano;
import com.telesync.tg.repository.JpaPlanoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class PlanoDao extends AbstractDao<Plano> {

    @Autowired
    JpaPlanoRepository repository;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public List<Plano> listar(List<Integer> ids) {
        return repository.findAllById(ids);
    }

    @Override
    public List<Plano> listar() {
        return repository.findAll();
    }

    @Override
    public void deletar(List<Integer> ids) {
        final var planos = listar(ids);
        repository.deleteInBatch(planos);
        log.debug("Plano(s) com o(s) id(s) {} foram excluído(s) com sucesso", ids);
    }
}
