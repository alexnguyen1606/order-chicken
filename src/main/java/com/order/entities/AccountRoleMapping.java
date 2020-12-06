package com.order.entities;

import lombok.Data;

import javax.persistence.*;

@Table
@Entity
@Data
public class AccountRoleMapping {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long accountId;
  private Long roleId;
}
