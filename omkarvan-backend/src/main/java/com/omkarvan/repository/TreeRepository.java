package com.omkarvan.repository;

import com.omkarvan.entity.Tree;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface TreeRepository extends JpaRepository<Tree, Long> {

    Tree findByTreeCode(String treeCode);

    List<Tree> findByBatchId(Long batchId);

    List<Tree> findBySpeciesContainingIgnoreCase(
            String species
    );

    List<Tree> findByDonorNameContainingIgnoreCase(
            String donorName
    );

}