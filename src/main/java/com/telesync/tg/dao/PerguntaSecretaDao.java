package com.telesync.tg.dao;

import com.telesync.tg.entity.PerguntaSecreta;
import com.telesync.tg.repository.JpaPerguntaSecretaRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerguntaSecretaDao extends AbstractDao<PerguntaSecreta> {

    @Autowired
    JpaPerguntaSecretaRespository respository;

    @Override
    public List<PerguntaSecreta> listar() {
        return respository.findAll();
    }
}
