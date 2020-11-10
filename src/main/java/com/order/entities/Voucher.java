package com.order.entities;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "danhsachkhuyenmai")
@Data
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_khuyen_mai")
    private String code;

    @Column(name = "ten_khuyen_mai")
    private String name;

    @Column(name = "thoi_gian_bd")
    private LocalDateTime startTime;

    @Column(name = "thoi_gian_kt")
    private LocalDateTime endTime;

}
