package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telesync.tg.model.Cliente;
import com.telesync.tg.repository.JpaClientRepository;
import com.telesync.tg.repository.JpaLoginRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ClienteDao implements Dao<Cliente> {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    JpaClientRepository clientRepository;

    @Autowired
    JpaLoginRepository loginRepository;

    @Override
    public List<Cliente> listar(List<Integer> ids) {
        return clientRepository.findAllById(ids);
    }

    @Override
    public List<Cliente> listar() {
        return clientRepository.findAll();
    }

    @Override
    public Cliente inserir(String entity) throws JsonProcessingException {
        final var usuario = objectMapper.readValue(entity, Cliente.class);
        loginRepository.save(usuario.getLogin());
        return clientRepository.save(usuario);
    }

    @Override
    public void alterar(String entity) throws JsonProcessingException {
        final var usuario = objectMapper.readValue(entity, Cliente.class);
        clientRepository.save(usuario);
    }

    @Override
    public void deletar(List<Integer> ids) {
        ids.forEach(id -> clientRepository.deleteById(id));
        log.debug("Clientes com os ids {} foram removidos", ids);
    }
}
