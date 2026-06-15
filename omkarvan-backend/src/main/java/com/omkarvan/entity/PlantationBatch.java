package com.omkarvan.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "plantation_batches")
public class PlantationBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String batchCode;

    private String source;

    private String eventName;

    private Integer totalTrees;

    private LocalDate createdDate;
}