package com.telesync.tg.controller;

import com.telesync.tg.dao.Dao;
import com.telesync.tg.model.Plano;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("plano")
@Slf4j
public class PlanoController {

    @Autowired
    Dao<Plano> dao;

    @GetMapping(value = "/listar")
    public List<Plano> listar() {
        return dao.listar();
    }

    @GetMapping(value = "/listarEsp")
    public List<Plano> listar(@RequestParam List<Integer> ids) {
        return dao.listar(ids);
    }

    @DeleteMapping(value = "/deletar")
    public ResponseEntity<String> deletar(@RequestParam List<Integer> ids) {
        try {
            dao.deletar(ids);
            return ResponseEntity.ok("Plano(s) excluidos com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/alterar")
    public ResponseEntity<String> alterar(@RequestBody String Plano) {
        try {
            dao.alterar(Plano);
            return ResponseEntity.ok("Plano alterado com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/inserir")
    public ResponseEntity<String> inserirPlano(@RequestBody String Plano) {
        try {
            dao.inserir(Plano);
            return ResponseEntity.ok("Plano inserido com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
