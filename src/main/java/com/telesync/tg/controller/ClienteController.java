package com.telesync.tg.controller;

import com.telesync.tg.dao.Dao;
import com.telesync.tg.entity.Cliente;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("cliente")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class ClienteController {

    @Autowired
    Dao<Cliente> dao;

    @PreAuthorize("hasAuthority('BUSCA_CLIENTES')")
    @GetMapping(value = "/listar")
    public List<Cliente> listar() {
        return dao.listar();
    }

    @GetMapping(value = "/listarEsp")
    public List<Cliente> listar(@RequestParam List<Integer> ids) {
        return dao.listar(ids);
    }

    @PreAuthorize("hasAuthority('BUSCA_CLIENTES')")
    @DeleteMapping(value = "/deletar")
    public ResponseEntity<String> deletar(@RequestParam List<Integer> ids) {
        try {
            dao.deletar(ids);
            return ResponseEntity.ok("Cliente(s) excluidos com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/alterar")
    public ResponseEntity<String> alterar(@RequestBody String cliente) {
        try {
            dao.alterar(cliente);
            return ResponseEntity.ok("Cliente alterado com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/inserir")
    public ResponseEntity<?> inserirCliente(@RequestBody String cliente) {
        try {
            return ResponseEntity.ok(dao.inserir(cliente));
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
