package com.telesync.tg.repository;

import com.telesync.tg.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaVendaRepository extends JpaRepository<Venda, Integer> {
}
