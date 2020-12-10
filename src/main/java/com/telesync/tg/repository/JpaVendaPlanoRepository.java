package com.telesync.tg.repository;

import com.telesync.tg.entity.VendaPlano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaVendaPlanoRepository extends JpaRepository<VendaPlano, Integer> {

    Optional<VendaPlano> findByImeiAndActiveIsTrue(Long imei);
    Optional<VendaPlano> findByNumeroTelefoneAndActiveIsTrue(String numeroTelefone);
}
