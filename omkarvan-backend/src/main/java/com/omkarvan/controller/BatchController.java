package com.omkarvan.controller;

import org.springframework.web.bind.annotation.*;
import com.omkarvan.dto.BatchRequest;
import com.omkarvan.dto.BatchSpeciesRequest;
import com.omkarvan.entity.Donor;
import com.omkarvan.entity.PlantationBatch;
import com.omkarvan.entity.Tree;
import com.omkarvan.repository.DonorRepository;
import com.omkarvan.repository.PlantationBatchRepository;
import com.omkarvan.repository.TreeRepository;

import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin("*")
public class BatchController {
    @Autowired
    private PlantationBatchRepository batchRepository;

    @Autowired
    private TreeRepository treeRepository;

    @Autowired
    private DonorRepository donorRepository;

    @GetMapping("/{batchId}/trees")
    public List<Tree> getTreesByBatch(
            @PathVariable Long batchId
    ) {
        return treeRepository.findByBatchId(batchId);
    }

    @GetMapping
    public List<PlantationBatch> getAllBatches() {
        return batchRepository.findAll();
    }

    @PostMapping("/generate")
    public String generateBatch(
            @RequestBody BatchRequest request
    ) {

        PlantationBatch batch =
                new PlantationBatch();

        batch.setBatchCode(
                "BATCH-" +
                        (batchRepository.count() + 1)
        );

        batch.setSource(
                request.getSource()
        );

        batch.setEventName(
                request.getEventName()
        );

        batch.setCreatedDate(
                LocalDate.now()
        );

        int totalTrees = 0;

        for (BatchSpeciesRequest item :
                request.getSpeciesList()) {

            totalTrees += item.getQuantity();
        }

        batch.setTotalTrees(totalTrees);

        batchRepository.save(batch);

        Donor donor = null;

        if (request.getDonorId() != null) {
            donor = donorRepository
                    .findById(request.getDonorId())
                    .orElse(null);
        }

        for (BatchSpeciesRequest item :
                request.getSpeciesList()) {

            for (int i = 0;
                 i < item.getQuantity();
                 i++) {

                Tree tree = new Tree();

                long count =
                        treeRepository.count() + 1;

                tree.setTreeCode(
                        String.format(
                                "OMK-%06d",
                                count
                        )
                );

                tree.setSpecies(
                        item.getSpecies()
                );

                tree.setSource(
                        request.getSource()
                );

                tree.setStatus(
                        "AVAILABLE"
                );

                tree.setBatch(batch);

                tree.setDonor(donor);

                treeRepository.save(tree);
            }
        }

        return "Trees Generated Successfully";
    }
}