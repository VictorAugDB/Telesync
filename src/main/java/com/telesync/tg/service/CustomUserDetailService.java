package com.telesync.tg.service;

import com.telesync.tg.repository.JpaLoginRepository;
import com.telesync.tg.type.PermissaoType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    JpaLoginRepository loginRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final var user = loginRepository.findByEmail(username);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("Cliente com o nome: "+username+" não foi encontrado");
        }

        List<GrantedAuthority> authorities;

        switch (user.get().getPermissao()) {
            case BUSCA_CLIENTES:
                authorities = AuthorityUtils.createAuthorityList(PermissaoType.BASICO.name(), PermissaoType.BUSCA_CLIENTES.name());
                break;
            case GERAR_RELATORIO:
                authorities = AuthorityUtils.createAuthorityList(PermissaoType.BASICO.name(), PermissaoType.BUSCA_CLIENTES.name(), PermissaoType.GERAR_RELATORIO.name());
                break;
            default:
                authorities = AuthorityUtils.createAuthorityList(PermissaoType.BASICO.name());
        }

        return new User(user.get().getEmail(), user.get().getSenha(), authorities);
    }
}
