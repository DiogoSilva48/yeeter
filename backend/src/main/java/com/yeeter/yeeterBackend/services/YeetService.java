package com.yeeter.yeeterBackend.services;

import com.yeeter.yeeterBackend.entities.Yeet;
import com.yeeter.yeeterBackend.repositories.YeetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class YeetService {

    private final YeetRepository yeetRepository;

    @Autowired
    public YeetService(YeetRepository yeetRepository) {
        this.yeetRepository = yeetRepository;
    }

    public List<Yeet> getAllYeets() {
        return yeetRepository.findAll();
    }

    public Yeet getYeetById(String id) {
        return yeetRepository.findById(id).orElse(null);
    }

    public Yeet createYeet(Yeet yeet) {
        return yeetRepository.save(yeet);
    }
}
