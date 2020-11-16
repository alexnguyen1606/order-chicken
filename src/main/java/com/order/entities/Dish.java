package com.order.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "danhsachthucdon")
@Data
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_mon")
    private String name;

    @Column(name = "don_gia")
    private Long price;

    @Column(name = "don_vi_tinh")
    private String unit;

    @Column(name = "trang_thai")
    private String status;

    @Column(columnDefinition = "nvarchar(500)")
    private String urlImg;

    @Column(columnDefinition = "nvarchar(255)")
    private String content;

    @Column(name="id_danhmuc")
    private Long idCategory;
}
