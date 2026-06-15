package com.omkarvan.controller;

import com.omkarvan.entity.Donor;
import com.omkarvan.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin("*")
public class DonorController {

    @Autowired
    private DonorRepository donorRepository;

    @PostMapping
    public Donor createDonor(
            @RequestBody Donor donor
    ) {
        return donorRepository.save(donor);
    }

    @GetMapping
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }
}