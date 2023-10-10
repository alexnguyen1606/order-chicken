package com.order.entities;

import com.order.constant.EntityConstant;
import com.order.constant.SystemConstant;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nguoidung")
@Getter
@Setter
public class Account {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "ten_tai_khoan", unique = true)
  private String userName;

  @Column(name = "mat_khau")
  private String password;

  @CreatedDate
  @Column(name = "ngay_dang_ky")
  private LocalDateTime createdDate;

  private Integer status;

  private String salt;

  public Account(String userName) {
    this.userName = userName;
  }

  public Account() {
  }

  public static Account createAccount(String userName, String password, String salt) {
    Account account = new Account(userName);
    account.status = SystemConstant.ENABLE;
    account.password = password;
    account.salt = salt;
    return account;
  }
}
