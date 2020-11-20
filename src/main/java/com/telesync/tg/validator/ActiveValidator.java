package com.telesync.tg.validator;

import com.telesync.tg.entity.VendaPlano;
import com.telesync.tg.repository.JpaVendaPlanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ActiveValidator implements Validator<VendaPlano> {

    @Autowired
    JpaVendaPlanoRepository repository;

    private final Integer HTTP_STATUS_FAILED = 400;

    @Override
    public Map<Integer, String> validate(VendaPlano entity) {
        if (entity.isActive()) {
            return checarSeImeiOuTelefoneSaoIguais(entity);
        }
        return Map.of(HTTP_STATUS_FAILED, "Esta VendaPlano não está ativa");
    }

    private Map<Integer, String> checarSeImeiOuTelefoneSaoIguais(VendaPlano entity) {
        if (repository.findByNumeroTelefoneAndActiveIsTrue(entity.getNumeroTelefone()).isPresent()) {
            return Map.of(HTTP_STATUS_FAILED, String.format("O Telefone [%s] já possui um plano", entity.getNumeroTelefone()));
        }
        if (repository.findByImeiAndActiveIsTrue(entity.getImei()).isPresent()) {
            return Map.of(HTTP_STATUS_FAILED, String.format("O chip  com Imei [%s] já possui um plano", entity.getImei()));
        }
        return Map.of(200, "");
    }
}
