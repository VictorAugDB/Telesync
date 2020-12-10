package com.telesync.tg.validator;

import com.telesync.tg.entity.VendaPlano;
import com.telesync.tg.repository.JpaVendaPlanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActiveValidator implements Validator<VendaPlano> {

    @Autowired
    JpaVendaPlanoRepository repository;

    @Override
    public boolean validate(VendaPlano entity) {
        if (entity.isActive()) {
            return checarSeImeiOuTelefoneSaoIguais(entity);
        }
        return false;
    }

    private boolean checarSeImeiOuTelefoneSaoIguais(VendaPlano entity) {
        return repository.findByNumeroTelefoneAndActiveIsTrue(entity.getNumeroTelefone()).isEmpty()
                || repository.findByImeiAndActiveIsTrue(entity.getImei()).isEmpty();
    }
}
