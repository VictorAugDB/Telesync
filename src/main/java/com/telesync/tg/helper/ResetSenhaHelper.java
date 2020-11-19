package com.telesync.tg.helper;

import com.telesync.tg.entity.Cliente;
import com.telesync.tg.entity.Login;
import com.telesync.tg.repository.JpaLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ResetSenhaHelper {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JpaLoginRepository loginRepository;

    public Optional<Cliente> resetarSenha(Cliente cliente, String resposta, String novaSenha) {
        if (passwordEncoder.matches(resposta, cliente.getRespostaSecreta())) {
            cliente.getLogin().setSenha(passwordEncoder.encode(novaSenha));
            salvarNovaSenha(cliente.getLogin());
            return Optional.of(cliente);
        }
        return Optional.empty();
    }

    private void salvarNovaSenha(Login login) {
       loginRepository.save(login);
    }
}
