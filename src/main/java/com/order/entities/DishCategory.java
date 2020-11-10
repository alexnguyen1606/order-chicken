package com.order.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "danhsachkhuyenmai")
@Data
public class DishCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_dm")
    private String name;
}
