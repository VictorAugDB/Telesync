package com.telesync.tg.repository;

import com.telesync.tg.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaLoginRepository extends JpaRepository<Login, Integer> {
    Optional<Login> findByEmail(String username);
}
