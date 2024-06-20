package com.yeeter.yeeterBackend.dtos;

import com.yeeter.yeeterBackend.entities.enums.UserRole;
import jakarta.validation.constraints.*;
import java.util.Date;
import java.util.List;

public record RegisterDto(
        String fullName,  // Optional field
        @NotBlank(message = "Username is required") String username,
        @Email(message = "Email should be valid")
        @NotBlank(message = "Email is required") String email,
        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters") String password,
        UserRole role,
        @Past(message = "Date of Birth must be in the past")
        Date dateOfBirth,  // Optional field
        String country,  // Optional field
        String profilePicture,  // Optional field
        String bio,  // Optional field
        List<String> interests  // Optional field
) {}