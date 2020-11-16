package com.telesync.tg.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telesync.tg.entity.Funcionario;
import com.telesync.tg.repository.JpaFuncionarioRepository;
import com.telesync.tg.repository.JpaLoginRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class FuncionarioDao extends AbstractDao<Funcionario> {

    @Autowired
    JpaFuncionarioRepository funcionarioRepository;

    @Autowired
    JpaLoginRepository loginRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public List<Funcionario> listar(List<Integer> ids) {
        return funcionarioRepository.findAllById(ids);
    }

    @Override
    public List<Funcionario> listar() {
        return funcionarioRepository.findAll();
    }

    @Override
    public Funcionario inserir(String entity) throws JsonProcessingException {
        final var usuario = objectMapper.readValue(entity, Funcionario.class);
        final var login  = usuario.getLogin();
        login.setSenha(passwordEncoder.encode(login.getSenha()));
        usuario.setLogin(login);
        loginRepository.save(login);
        return funcionarioRepository.save(usuario);
    }

    @Override
    public void alterar(String entity) throws JsonProcessingException {
        final var funcionario = objectMapper.readValue(entity, Funcionario.class);
        if (checkIfFuncionarioExists(funcionario)) {
            funcionarioRepository.save(funcionario);
        } else {
            log.error("O Funcionario {} não existe", funcionario.toString());
        }
    }

    @Override
    public void deletar(List<Integer> ids) {
        ids.forEach(id -> funcionarioRepository.deleteById(id));
        log.debug("Funcionarios com os ids {} foram removidos", ids);
    }

    private boolean checkIfFuncionarioExists(Funcionario funcionario) {
        return funcionarioRepository.existsById(funcionario.getCodFuncionario());
    }

    @Override
    public Funcionario getUsuarioByLogin(UserDetails userDetails) {
        final var login = loginRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Funcioanrio "+userDetails.getUsername()+" não encontrado"));

        return funcionarioRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Nenhum usuario encontrado para login: "+userDetails.getUsername()));

    }
}
