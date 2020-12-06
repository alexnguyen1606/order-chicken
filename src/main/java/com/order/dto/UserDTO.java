package com.order.dto;

import lombok.Data;

@Data
public class UserDTO {
  private Long id;

  private String name;

  private String phone;

  private String email;

  private String address;

  private String gender;

  private Long idAccount;
}
