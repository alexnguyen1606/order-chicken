package com.order.dto;

import lombok.Data;

/**
 * @author:Nguyen Anh Tuan
 *     <p>1:31 AM ,November 22,2020
 */
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
