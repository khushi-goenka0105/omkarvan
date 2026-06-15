package com.omkarvan.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "donors")
public class Donor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phone;

    private String email;

    private String occasion;
}