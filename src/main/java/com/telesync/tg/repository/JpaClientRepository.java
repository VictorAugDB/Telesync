package com.telesync.tg.repository;

import com.telesync.tg.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaClientRepository extends JpaRepository<Cliente, Integer> {
}
