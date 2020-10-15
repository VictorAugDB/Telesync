package com.telesync.tg.repository;

import com.telesync.tg.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaLoginRepository extends JpaRepository<Login, Integer> {
}
