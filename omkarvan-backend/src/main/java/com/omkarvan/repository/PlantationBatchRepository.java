package com.omkarvan.repository;

import com.omkarvan.entity.PlantationBatch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantationBatchRepository
        extends JpaRepository<PlantationBatch, Long> {
}