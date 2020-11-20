package com.telesync.tg.controller;

import com.telesync.tg.dao.Dao;
import com.telesync.tg.entity.Plano;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
}
