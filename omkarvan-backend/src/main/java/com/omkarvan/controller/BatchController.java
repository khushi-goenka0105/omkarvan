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

    private String getScientificName(String species) {

        switch (species.toLowerCase()) {

            case "mango":
                return "Mangifera indica";

            case "neem":
                return "Azadirachta indica";

            case "peepal":
                return "Ficus religiosa";

            case "banana":
                return "Musa paradisiaca";

            case "banyan":
                return "Ficus benghalensis";

            case "ashoka":
                return "Saraca asoca";

            case "arjun":
                return "Terminalia arjuna";

            case "kadamb":
                return "Neolamarckia cadamba";

            case "jamun":
                return "Syzygium cumini";

            case "amla":
                return "Phyllanthus emblica";

            case "guava":
                return "Psidium guajava";

            case "lemon":
                return "Citrus limon";

            case "pomegranate":
                return "Punica granatum";

            case "tulsi":
                return "Ocimum tenuiflorum";

            case "aloe vera":
                return "Aloe barbadensis Miller";

            case "brahmi":
                return "Bacopa monnieri";

            case "ashwagandha":
                return "Withania somnifera";

            case "lemongrass":
                return "Cymbopogon citratus";

            case "giloy":
                return "Tinospora cordifolia";

            case "kachnar":
                return "Bauhinia variegata";

            case "parijat":
                return "Nyctanthes arbor-tristis";

            case "gulmohar":
                return "Delonix regia";

            case "amaltas":
                return "Cassia fistula";

            case "tabebuia":
                return "Tabebuia rosea";

            case "lagerstroemia":
                return "Lagerstroemia speciosa";

            case "bamboo":
                return "Bambusoideae";

            case "hibiscus":
                return "Hibiscus rosa-sinensis";

            case "ixora":
                return "Ixora coccinea";

            case "lantana":
                return "Lantana camara";

            case "cosmos":
                return "Cosmos bipinnatus";

            case "zinnia":
                return "Zinnia elegans";

            default:
                return "Scientific name not available";
        }
    }

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

                tree.setScientificName(
                        getScientificName(item.getSpecies())
                );

                tree.setSection(
                        request.getSection()
                );

                tree.setSource(
                        request.getSource()
                );

                tree.setPlantDate(
                        LocalDate.now()
                );

                tree.setStatus(
                        "PLANTED"
                );

                tree.setBatch(batch);

                tree.setDonor(donor);

                treeRepository.save(tree);
            }
        }



        return "Trees Generated Successfully";
    }
}