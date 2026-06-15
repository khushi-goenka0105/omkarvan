package com.omkarvan.controller;

import com.omkarvan.entity.Tree;
import com.omkarvan.repository.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trees")
@CrossOrigin("*")
public class TreeController {

    @Autowired
    private TreeRepository treeRepository;

    @PostMapping
    public Tree createTree(@RequestBody Tree tree) {

        long count = treeRepository.count() + 1;

        String treeCode = String.format(
                "OMK-%06d",
                count
        );

        tree.setTreeCode(treeCode);

        return treeRepository.save(tree);
    }

    @GetMapping
    public List<Tree> getAllTrees() {
        return treeRepository.findAll();
    }

    @GetMapping("/{treeCode}")
    public Tree getTreeByCode(
            @PathVariable String treeCode
    ) {
        return treeRepository.findByTreeCode(treeCode);
    }
}