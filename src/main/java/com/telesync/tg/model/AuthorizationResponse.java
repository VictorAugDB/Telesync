package com.telesync.tg.model;

import lombok.Getter;

@Getter
public class AuthorizationResponse {

    private final String jwt;

    public AuthorizationResponse(String jwt) {
        this.jwt = jwt;
    }
}
