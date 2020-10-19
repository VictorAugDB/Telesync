package com.telesync.tg.controller;

import com.telesync.tg.dao.Dao;
import com.telesync.tg.model.Venda;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
