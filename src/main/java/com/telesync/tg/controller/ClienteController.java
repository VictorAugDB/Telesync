package com.telesync.tg.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.telesync.tg.dao.Dao;
import com.telesync.tg.model.Cliente;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class ClienteController {

    @Autowired
    Dao<Cliente> dao;

    @PostMapping(value = "/inserir")
    public ResponseEntity<String> inserirCliente(@RequestBody String cliente) {
        try {
            dao.inserir(cliente);
            return ResponseEntity.ok("Cliente inserido com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
