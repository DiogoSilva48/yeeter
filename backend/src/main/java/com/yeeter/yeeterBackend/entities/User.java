package com.yeeter.yeeterBackend.entities;

import com.yeeter.yeeterBackend.entities.enums.UserRole;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user")
public class User implements UserDetails {

    @Id
    private String id;

    //@NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Username is required")
    private String username;

    //@Email(message = "Email should be valid")
    //@NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    //@Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private UserRole role;

    @Past(message = "Date of Birth must be in the past")
    //@NotNull(message = "Date of birth is required")
    private Date dateOfBirth;

    //@NotBlank(message = "Country is required")
    private String country;

    private String profilePicture;

    private String bio;

    private List<String> interests;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == UserRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
