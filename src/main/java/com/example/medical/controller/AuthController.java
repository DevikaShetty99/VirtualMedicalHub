package com.example.medical.controller;

import com.example.medical.model.LoginRequest;
import com.example.medical.repository.AdminRepository;
import com.example.medical.model.JwtResponse;
import com.example.medical.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.medical.model.Admin;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    // Fetch admin by email from DB (pseudo code)
    Admin admin = adminRepository.findByEmail(loginRequest.getEmail());
    if (admin == null) {
        return ResponseEntity.status(401).body("Invalid credentials");
    }
    
    String hashedPasswordFromDb = admin.getPasswordHash();

    if (passwordEncoder.matches(loginRequest.getPassword(), hashedPasswordFromDb)) {
        String token = jwtUtil.generateToken(loginRequest.getEmail());
        return ResponseEntity.ok(new JwtResponse(token, admin.getId()));
    } else {
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        try {
            // Remove "Bearer " prefix if present
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractEmail(token);
                return ResponseEntity.ok("Token is valid for user: " + email);
            } else {
                return ResponseEntity.status(401).body("Invalid token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }
}