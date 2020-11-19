package com.telesync.tg.controller;

import com.telesync.tg.dao.Dao;
import com.telesync.tg.entity.PerguntaSecreta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "listar-perguntas")
public class PerguntaSecretaController {

    @Autowired
    Dao<PerguntaSecreta> dao;

    @GetMapping
    public ResponseEntity<List<PerguntaSecreta>> listar() {
        return ResponseEntity.ok(dao.listar());
    }
}
