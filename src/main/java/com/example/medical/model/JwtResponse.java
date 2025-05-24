package com.example.medical.model;

public class JwtResponse {
    private String token;
    private Long id;

    public JwtResponse(String token, Long id) {
        this.token = token;
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public Long getId() {
        return id;
    }
}

