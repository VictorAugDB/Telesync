package com.telesync.tg.controller;

import com.telesync.tg.dao.Dao;
import com.telesync.tg.entity.Cliente;
import com.telesync.tg.entity.Funcionario;
import com.telesync.tg.helper.ResetSenhaHelper;
import com.telesync.tg.model.AuthorizationRequest;
import com.telesync.tg.model.AuthorizationResponse;
import com.telesync.tg.service.CustomUserDetailService;
import com.telesync.tg.type.PermissaoType;
import com.telesync.tg.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth")
@Slf4j
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CustomUserDetailService userDetailService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    ResetSenhaHelper resetSenhaHelper;

    @Autowired
    Dao<Funcionario> funcionarioDao;

    @Autowired
    Dao<Cliente> clienteDao;

    private final static String FALHA_ATENTITCACAO = "Usuario não existe ou a senha está incorreta. Usuário [%s]";
    private final static String FUNCIONARIO_RESET = "Funcionários devem contatar o administrador para resetar sua senha";
    private final static String FALHA_RESET = "Resposta incorreta";


    @PostMapping(value = "/autenticar")
    public ResponseEntity<?> authenticate(@RequestBody AuthorizationRequest authorizationRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authorizationRequest.getUsername(), authorizationRequest.getPassword()));
        } catch (BadCredentialsException ex) {
            log.error(String.format(FALHA_ATENTITCACAO, authorizationRequest.getUsername()));
            return ResponseEntity.badRequest().body(String.format(FALHA_ATENTITCACAO, authorizationRequest.getUsername()));
        }

        final var userDetails = userDetailService
                .loadUserByUsername(authorizationRequest.getUsername());

        int codUsuario;
        boolean isFuncionario;
        int codPermissao;

        if (userDetails.getAuthorities().size() > 1) {
            final var funcionario = funcionarioDao.getUsuarioByLogin(userDetails);
            codUsuario = funcionario.getCodFuncionario();
            isFuncionario = true;
            if (userDetails.getAuthorities().size() > 2) {
                codPermissao = PermissaoType.GERAR_RELATORIO.ordinal();
            } else {
                codPermissao = PermissaoType.BUSCA_CLIENTES.ordinal();
            }
        } else {
            final var cliente = clienteDao.getUsuarioByLogin(userDetails);
            codUsuario = cliente.getCodCliente();
            isFuncionario = false;
            codPermissao = PermissaoType.BASICO.ordinal();
        }

        final var jwt = jwtUtil.generateToken(userDetails, codUsuario, isFuncionario, codPermissao);

        return ResponseEntity.ok(new AuthorizationResponse(jwt));
    }

    @PostMapping(value = "/resetar-senha")
    public ResponseEntity<?> resetarSenha(@RequestParam String username, @RequestParam String resposta, @RequestParam String novaSenha) {
        final var user = userDetailService.loadUserByUsername(username);

        // Tem mais de uma autoridade, ou seja, funcionario
        if (user.getAuthorities().size() > 1) {
            log.error(FUNCIONARIO_RESET);
            return ResponseEntity.badRequest().body(FUNCIONARIO_RESET);
        }

        final var cliente= clienteDao.getUsuarioByLogin(user);

        final var novoCliente = resetSenhaHelper.resetarSenha(cliente, resposta, novaSenha);

        return novoCliente.isPresent() ? ResponseEntity.ok(novoCliente.get()) : ResponseEntity.badRequest().body(FALHA_RESET);
    }

}
