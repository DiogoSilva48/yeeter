package com.yeeter.yeeterBackend.controllers;

import com.yeeter.yeeterBackend.entities.Yeet;
import com.yeeter.yeeterBackend.services.YeetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/yeets")
public class YeetController {

    private final YeetService yeetService;

    @Autowired
    public YeetController(YeetService yeetService) {
        this.yeetService = yeetService;
    }


@GetMapping
public List<Yeet> getAllYeets() {
    return yeetService.getAllYeets();
}

@GetMapping("/{id}")
public Yeet getYeetById(@PathVariable String id) {
    return yeetService.getYeetById(id);
}

@PostMapping
public Yeet createYeet(@RequestBody Yeet yeet) {
    return yeetService.createYeet(yeet);
}

}
