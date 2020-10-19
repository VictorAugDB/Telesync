package com.telesync.tg.repository;

import com.telesync.tg.model.VendaPlano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaVendaPlanoRepository extends JpaRepository<VendaPlano, Integer> {
}
