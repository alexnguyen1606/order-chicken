package com.order.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

/**
 * @author:Nguyen Anh Tuan
 *     <p>10:54 PM ,November 24,2020
 */
@Data
public class AccountDTO {
  private Long id;

  @NotBlank(message = "Tên tài khoản không được bỏ trống")
  private String userName;

  @NotBlank(message = "Password không được bỏ trống")
  private String password;

  @NotBlank(message = "Password lặp lại không được bỏ trống")
  private String repeatPassword;

  private LocalDateTime createdDate;

  private Integer status;

  @NotBlank(message = "Họ và tên không được bỏ trống")
  private String name;

  @NotBlank(message = "Số điện thoại không được bỏ trống")
  private String phone;

  private String email;

  @NotBlank(message = "Địa chỉ không được bỏ trống")
  private String address;

  private String gender;
}
