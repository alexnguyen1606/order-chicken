package com.order.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "danhsachkhuyenmai")
@Getter
@Setter
public class Voucher {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "ma_khuyen_mai", unique = true)
  private String code;

  @Column(name = "ten_khuyen_mai", columnDefinition = "nvarchar(500)")
  private String name;

  @Column(name = "thoi_gian_bd")
  private LocalDateTime startTime;

  @Column(name = "thoi_gian_kt")
  private LocalDateTime endTime;

  private Integer discount;

  @Column(columnDefinition = "nvarchar(500)")
  private String urlImg;

  @Column(columnDefinition = "ntext")
  private String content;
  
  private Integer status;
  
}
