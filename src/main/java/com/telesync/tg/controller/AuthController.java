package com.telesync.tg.controller;

import com.telesync.tg.dao.Dao;
import com.telesync.tg.entity.Cliente;
import com.telesync.tg.entity.Funcionario;
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
    Dao<Funcionario> funcionarioDao;

    @Autowired
    Dao<Cliente> clienteDao;

    @PostMapping
    public ResponseEntity<?> authenticate(@RequestBody AuthorizationRequest authorizationRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authorizationRequest.getUsername(), authorizationRequest.getPassword()));
        } catch (BadCredentialsException ex) {
            log.error("The user does not exist or password is incorrect. User[{}]", authorizationRequest.getUsername());
            throw ex;
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

}
