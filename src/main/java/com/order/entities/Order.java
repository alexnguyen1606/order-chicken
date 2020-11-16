package com.order.entities;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Table(name = "dondathang")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tai_khoan")
    private Long idAccount;

    @Column(name = "id_km")
    private Long idVoucher;

    @Column(name = "sdt_kh",columnDefinition = "nvarchar(255)")
    private Long customerPhone;

    @Column(name = "dia_chi",columnDefinition = "nvarchar(500)")
    private String customerAddress;

    @CreatedDate
    @Column(name = "ngay_dat")
    private LocalDateTime createdDate;

    @Column(name = "thoi_gian_nhan")
    private String deliveryTime;

    @Column(name = "ghi_chu")
    private String note;

    @Column(name = "tong_sp")
    private Integer totalNumber;

    @Column(name = "tong_tien")
    private Long totalPrice;

    @Column(name = "phuong_thuc_thanh_toan",columnDefinition = "nvarchar(500)")
    private String payment;
    
    @Column(name = "ten_kh")
    private String customerName;
    
    private Integer status;

}
