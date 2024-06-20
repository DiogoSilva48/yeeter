package com.yeeter.yeeterBackend.repositories;

import com.yeeter.yeeterBackend.entities.Yeet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface YeetRepository extends MongoRepository<Yeet, String> {

}
