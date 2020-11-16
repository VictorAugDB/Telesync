package com.telesync.tg.controller;

import com.telesync.tg.dao.Dao;
import com.telesync.tg.entity.Cliente;
import com.telesync.tg.entity.Venda;
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
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("venda")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class VendaController {

    @Autowired
    Dao<Venda> vendaDao;

    @Autowired
    Dao<Cliente> clienteDao;

    @PreAuthorize("hasAuthority('BASICO')")
    @GetMapping(value = "/listar")
    public List<Venda> listar() {
        return vendaDao.listar();
    }

    @PreAuthorize("hasAuthority('BASICO')")
    @GetMapping(value = "/listarEsp")
    public List<Venda> listar(@RequestParam List<Integer> ids, Boolean isClientId) {
        if (isClientId) {
            if (ids.size() != 1) {
                log.error("Somente um cliente por vez é permitido");
                throw new RuntimeException();
            }
            final var cliente = clienteDao.listar(ids).stream().findFirst();
            final var vendaList = vendaDao.listar();

            if (cliente.isEmpty()) {
                log.error("Cliente não econtrado");
                throw new RuntimeException();
            }

            return vendaList.stream()
                    .filter(venda -> Objects.equals(venda.getCliente(), cliente.get()))
                    .collect(Collectors.toList());
        }
        return vendaDao.listar(ids);
    }

    @PreAuthorize("hasAuthority('BASICO')")
    @DeleteMapping(value = "/deletar")
    public ResponseEntity<String> deletar(@RequestParam List<Integer> ids) {
        try {
            vendaDao.deletar(ids);
            return ResponseEntity.ok("Venda(s) excluidos com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PreAuthorize("hasAuthority('BASICO')")
    @PutMapping(value = "/alterar")
    public ResponseEntity<String> alterar(@RequestBody String Venda) {
        try {
            vendaDao.alterar(Venda);
            return ResponseEntity.ok("Venda alterado com sucesso");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PreAuthorize("hasAuthority('BASICO')")
    @PostMapping(value = "/inserir")
    public Venda inserirVenda(@RequestBody String Venda) {
        try {
            return vendaDao.inserir(Venda);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return null;
        }
    }
}
