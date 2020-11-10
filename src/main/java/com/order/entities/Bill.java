package com.order.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="hoadon")
@Data
public class Bill {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_don_hang")
    private Long idOrder;

    @Column(name = "sdt_kh")
    private Long customerPhone;

    @Column(name = "dia_chi")
    private String customerAddress;

    @Column(name = "sdt_ch")
    private Long resPhone;

    @Column(name = "dia_chi_ch")
    private String resAddress;

    @Column(name = "ghi_chu")
    private String note;

    @Column(name = "tong_sp")
    private Integer totalNumber;

    @Column(name = "tong_tien")
    private Long totalPrice;

    @Column(name = "phuong_thuc_thanh_toan")
    private String payment;

    @Column(name = "ten_kh")
    private String customerName;

}
