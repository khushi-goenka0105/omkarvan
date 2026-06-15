package com.omkarvan.repository;

import com.omkarvan.entity.Tree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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

    @Query("""
SELECT t.species, COUNT(t)
FROM Tree t
GROUP BY t.species
""")
    List<Object[]> getSpeciesInventory();

}