package com.order.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "ct_hoadon")
@Getter
@Setter
public class DetailBill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_hoa_don")
    private Long idBill;

    @Column(name = "id_mon")
    private Long idDish;

    @Column(name = "so_luong")
    private Integer number;

    @Column(name = "don_gia")
    private Long price;

    @Column(name = "thanh_tien")
    private Long totalPrice;
}
