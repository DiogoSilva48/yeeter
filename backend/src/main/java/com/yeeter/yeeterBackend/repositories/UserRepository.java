package com.yeeter.yeeterBackend.repositories;

import com.yeeter.yeeterBackend.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    UserDetails findByUsername(String username);
}
