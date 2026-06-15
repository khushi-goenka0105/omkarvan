package com.omkarvan.entity;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.time.LocalDate;
import com.omkarvan.entity.PlantationBatch;

@Entity
@Data
@Table(name = "trees")
public class Tree {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String treeCode;

    private String species;

    private String scientificName;

    private String section;

    private Double latitude;

    private Double longitude;

    private String source;

    private LocalDate plantDate;

    private String status;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private PlantationBatch batch;

    @ManyToOne
    @JoinColumn(name = "donor_id")
    private Donor donor;
}