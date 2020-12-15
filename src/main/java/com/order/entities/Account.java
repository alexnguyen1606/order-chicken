package com.order.entities;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nguoidung")
@Data
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_tai_khoan",unique = true)
    private String userName;

    @Column(name = "mat_khau")
    private String password;

    @CreatedDate
    @Column(name = "ngay_dang_ky")
    private LocalDateTime createdDate;
    
    private Integer status;
    
    private String salt;

}
