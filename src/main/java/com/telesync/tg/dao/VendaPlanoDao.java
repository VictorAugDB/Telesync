package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telesync.tg.entity.Log;
import com.telesync.tg.entity.VendaPlano;
import com.telesync.tg.repository.JpaLogRepository;
import com.telesync.tg.repository.JpaVendaPlanoRepository;
import com.telesync.tg.type.AlteracaoType;
import com.telesync.tg.validator.Validator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Slf4j
public class VendaPlanoDao extends AbstractDao<VendaPlano> {

    @Autowired
    JpaVendaPlanoRepository vendaPlanoRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    Validator<VendaPlano> validator;

    @Autowired
    JpaLogRepository logRepository;

    @Override
    public List<VendaPlano> listar(List<Integer> ids) {
        return vendaPlanoRepository.findAllById(ids);
    }

    @Override
    public List<VendaPlano> listar() {
        return vendaPlanoRepository.findAll();
    }

    @Override
    public VendaPlano inserir(String entity) throws JsonProcessingException {
        final var vendaPlano = objectMapper.readValue(entity, VendaPlano.class);
        if (!validator.validate(vendaPlano)) {
            throw new NoSuchElementException(String.format("A venda plano [%s] não é válida", vendaPlano));
        }
        final var newVendaPlano = vendaPlanoRepository.save(vendaPlano);
        logRepository.save(buildLog(newVendaPlano, AlteracaoType.NOVO_PLANO.ordinal()));
        return newVendaPlano;
    }

    @Override
    public void alterar(String entity) throws JsonProcessingException {
        final var vendaPlano = objectMapper.readValue(entity, VendaPlano.class);
        if (checkIfVendaPlanoExists(vendaPlano)) {
            vendaPlanoRepository.save(vendaPlano);
        } else  {
            log.error("A venda plano {} não existe", vendaPlano.toString());
        }
        if (vendaPlano.isActive()) {
            logRepository.save(buildLog(vendaPlano, AlteracaoType.ALTERACAO.ordinal()));
        } else {
            logRepository.save(buildLog(vendaPlano, AlteracaoType.CANCELAMENTO.ordinal()));
        }
    }

    private boolean checkIfVendaPlanoExists(VendaPlano vendaPlano) {
        return vendaPlanoRepository.existsById(vendaPlano.getCodVendaPlano());
    }

    private Log buildLog(VendaPlano vendaPlano, int tipoAlteracao) {
        return Log.builder()
                .dataAlteracao(new Date())
                .tipoAlteracao(tipoAlteracao)
                .vendaPlano(vendaPlano)
                .build();
    }
}
