package com.omkarvan.controller;

import com.omkarvan.repository.TreeRepository;
import com.omkarvan.repository.DonorRepository;
import com.omkarvan.repository.PlantationBatchRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final TreeRepository treeRepository;
    private final DonorRepository donorRepository;
    private final PlantationBatchRepository batchRepository;

    public DashboardController(
            TreeRepository treeRepository,
            DonorRepository donorRepository,
            PlantationBatchRepository batchRepository
    ) {
        this.treeRepository = treeRepository;
        this.donorRepository = donorRepository;
        this.batchRepository = batchRepository;
    }

    @GetMapping
    public Map<String, Long> getStats() {

        Map<String, Long> stats =
                new HashMap<>();

        stats.put(
                "trees",
                treeRepository.count()
        );

        stats.put(
                "donors",
                donorRepository.count()
        );

        stats.put(
                "batches",
                batchRepository.count()
        );

        return stats;
    }
}