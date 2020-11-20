package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telesync.tg.entity.Cliente;
import com.telesync.tg.entity.Login;
import com.telesync.tg.repository.JpaClientRepository;
import com.telesync.tg.repository.JpaLoginRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class ClienteDao extends AbstractDao<Cliente> {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    JpaClientRepository clientRepository;

    @Autowired
    JpaLoginRepository loginRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

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
        final var login = usuario.getLogin();
        login.setSenha(passwordEncoder.encode(login.getSenha()));
        usuario.setLogin(login);
        usuario.setRespostaSecreta(passwordEncoder.encode(usuario.getRespostaSecreta()));
        loginRepository.save(login);
        return clientRepository.save(usuario);
    }

    @Override
    public void alterar(String entity) throws JsonProcessingException {
        final var usuario = objectMapper.readValue(entity, Cliente.class);
        if (checkIfUserAlreadyExists(usuario) && checkIfPasswordHasChanged(usuario.getLogin())) {
            clientRepository.save(usuario);
        } else {
            log.error("O usuario {} não existe", usuario.getNomeCliente());
        }
    }

    @Override
    public void deletar(List<Integer> ids) {
        ids.forEach(id -> clientRepository.deleteById(id));
        log.debug("Clientes com os ids {} foram removidos", ids);
    }

    private boolean checkIfUserAlreadyExists(Cliente usuario) {
        return clientRepository.existsById(usuario.getCodCliente());
    }

    private boolean checkIfPasswordHasChanged(Login login) {
        final var previousLogin = loginRepository.findById(login.getCodLogin());
        return previousLogin.filter(value -> Objects.equals(login.getSenha(), value.getSenha())).isPresent();
    }

    @Override
    public Cliente getUsuarioByLogin(UserDetails userDetails) {
        final var login = loginRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Cliente "+userDetails.getUsername()+" não encontrado"));

        return clientRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Nenhum usuario encontrado para login: "+userDetails.getUsername()));
    }
}
