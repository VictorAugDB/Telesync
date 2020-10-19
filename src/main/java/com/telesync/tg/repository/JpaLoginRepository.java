package com.telesync.tg.repository;

import com.telesync.tg.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaLoginRepository extends JpaRepository<Login, Integer> {
}
