package com.yeeter.yeeterBackend.controllers;

import com.yeeter.yeeterBackend.config.security.TokenService;
import com.yeeter.yeeterBackend.dtos.AuthenticationDto;
import com.yeeter.yeeterBackend.dtos.LoginResponseDTO;
import com.yeeter.yeeterBackend.dtos.RegisterDto;
import com.yeeter.yeeterBackend.entities.User;
import com.yeeter.yeeterBackend.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final TokenService tokenService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDto data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDto data){
    if(this.userRepository.findByUsername(data.username()) != null) return ResponseEntity.badRequest().build();

    String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = User.builder()
                .fullName(data.fullName())
                .username(data.username())
                .email(data.email())
                .password(encryptedPassword)
                .role(data.role())
                .dateOfBirth(data.dateOfBirth())
                .country(data.country())
                .profilePicture(data.profilePicture())
                .bio(data.bio())
                .interests(data.interests())
                .build();

        userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
}
