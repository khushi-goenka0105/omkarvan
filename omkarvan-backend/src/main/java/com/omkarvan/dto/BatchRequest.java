package com.omkarvan.dto;

import lombok.Data;

import java.util.List;

@Data
public class BatchRequest {

    private String source;

    private Long donorId;

    private String eventName;

    private String section;

    private List<BatchSpeciesRequest> speciesList;
}