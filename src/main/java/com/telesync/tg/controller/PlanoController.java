package com.telesync.tg.controller;

import com.telesync.tg.dao.Dao;
import com.telesync.tg.model.Plano;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("plano")
public class PlanoController {

    @Autowired
    Dao<Plano> dao;

    @GetMapping(value = "/listar")
    public List<Plano> listar() {
        return dao.listar();
    }
}
