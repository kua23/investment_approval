package com.example.investment_approval.controller;

import com.example.investment_approval.entity.User;
import com.example.investment_approval.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered!";
    }

    @GetMapping("/all")
public List<User> getAllUsers() {
    return userRepository.findAll();
}

    // Optional: add /login handler later for JWT or session auth
}
