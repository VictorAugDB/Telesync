package com.telesync.tg.repository;

import com.telesync.tg.entity.Cliente;
import com.telesync.tg.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaClientRepository extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findByLogin(Login login);
}
