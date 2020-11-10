package com.order.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="khachhang")
@Data
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tai_khoan")
    private Long idAccount;

    @Column(name = "ten_khach_hang")
    private String name;

    @Column(name = "sdt")
    private Long phone;

    @Column(name = "email")
    private String email;

    @Column(name = "dia_chi")
    private String address;

    @Column(name = "gioi_tinh")
    private String gender;
}
