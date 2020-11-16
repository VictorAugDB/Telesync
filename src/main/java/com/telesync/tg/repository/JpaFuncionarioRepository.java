package com.telesync.tg.repository;

import com.telesync.tg.entity.Funcionario;
import com.telesync.tg.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaFuncionarioRepository extends JpaRepository<Funcionario, Integer> {
    Optional<Funcionario> findByLogin(Login login);
}
