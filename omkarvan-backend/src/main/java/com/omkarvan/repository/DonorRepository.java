package com.omkarvan.repository;

import com.omkarvan.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonorRepository
        extends JpaRepository<Donor, Long> {
}