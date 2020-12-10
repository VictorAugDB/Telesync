package com.telesync.tg.repository;

import com.telesync.tg.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaLogRepository extends JpaRepository<Log, Integer> {
}
