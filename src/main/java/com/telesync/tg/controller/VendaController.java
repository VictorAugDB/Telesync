package com.telesync.tg.controller;

import com.telesync.tg.dao.Dao;
import com.telesync.tg.model.Venda;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("venda")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class VendaController {

    @Autowired
    Dao<Venda> dao;

    @GetMapping(value = "/listar")
    public List<Venda> listar() {
        return dao.listar();
    }

    @GetMapping(value = "/listarEsp")
    public List<Venda> listar(@RequestParam List<Integer> ids) {
        return dao.listar(ids);
    }

    @DeleteMapping(value = "/deletar")
    public ResponseEntity<String> deletar(@RequestParam List<Integer> ids) {
        try {
            dao.deletar(ids);
            return ResponseEntity.ok("Venda(s) excluidos com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/alterar")
    public ResponseEntity<String> alterar(@RequestBody String Venda) {
        try {
            dao.alterar(Venda);
            return ResponseEntity.ok("Venda alterado com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/inserir")
    public Venda inserirVenda(@RequestBody String Venda) {
        try {
            return dao.inserir(Venda);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return null;
        }
    }
}
