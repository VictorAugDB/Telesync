package com.telesync.tg.controller;

import com.telesync.tg.dao.Dao;
import com.telesync.tg.model.Venda;
import com.telesync.tg.model.VendaPlano;
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
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("vendaPlano")
@Slf4j
public class VendaPlanoController {

    @Autowired
    Dao<VendaPlano> vendaPlanoDao;

    @Autowired
    Dao<Venda> vendaDao;

    @GetMapping(value = "/listar")
    public List<VendaPlano> listar() {
        return vendaPlanoDao.listar();
    }

    @GetMapping(value = "/listarEsp")
    public List<VendaPlano> listar(@RequestParam List<Integer> ids, Boolean isVendaId) {
        if (isVendaId) {
            if (ids.size() != 1) {
                log.error("Somente uma venda por vez é permitido");
                throw new RuntimeException();
            }
            final var venda = vendaDao.listar(ids).stream().findFirst();
            final var vendaPlanoList = vendaPlanoDao.listar();

            if (venda.isEmpty()) {
                log.error("Venda não encontrada");
                throw new RuntimeException();
            }

            return vendaPlanoList.stream()
                    .filter(vendaPlano -> Objects.equals(vendaPlano.getVenda(), venda.get()))
                    .collect(Collectors.toList());
        }
        return vendaPlanoDao.listar(ids);
    }

    @DeleteMapping(value = "/deletar")
    public ResponseEntity<String> deletar(@RequestParam List<Integer> ids) {
        try {
            vendaPlanoDao.deletar(ids);
            return ResponseEntity.ok("Venda Plano(s) excluidos com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/alterar")
    public ResponseEntity<String> alterar(@RequestBody String VendaPlano) {
        try {
            vendaPlanoDao.alterar(VendaPlano);
            return ResponseEntity.ok("Venda Plano alterado com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/inserir")
    public VendaPlano inserirVendaPlano(@RequestBody String VendaPlano) {
        try {
            return vendaPlanoDao.inserir(VendaPlano);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return null;
        }
    }
}
