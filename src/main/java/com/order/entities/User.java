package com.order.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="khachhang")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tai_khoan",unique = true)
    private Long idAccount;

    @Column(name = "ten_khach_hang",columnDefinition = "nvarchar(500)")
    private String name;

    @Column(name = "sdt")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "dia_chi",columnDefinition = "nvarchar(500)")
    private String address;

    @Column(name = "gioi_tinh",columnDefinition = "nvarchar(255)")
    private String gender;

    public User() {
    }

    public static User createUser(Account account, String address, String email, String name) {
        User user = new User();
        user.idAccount = account.getId();
        user.address = address;
        user.email = email;
        user.name = name;
        return user;
    }

}
