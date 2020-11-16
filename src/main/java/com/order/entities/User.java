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

    @Column(name = "ten_khach_hang",columnDefinition = "nvarchar(500)")
    private String name;

    @Column(name = "sdt")
    private Long phone;

    @Column(name = "email")
    private String email;

    @Column(name = "dia_chi",columnDefinition = "nvarchar(500)")
    private String address;

    @Column(name = "gioi_tinh",columnDefinition = "nvarchar(255)")
    private String gender;
}
