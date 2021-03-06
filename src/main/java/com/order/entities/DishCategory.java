package com.order.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "danhmucthucdon")
@Data
public class DishCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_dm",columnDefinition = "nvarchar(255)")
    private String name;
}
