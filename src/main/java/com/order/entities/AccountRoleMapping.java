package com.order.entities;

import lombok.Data;

import javax.persistence.*;

/**
 * @author:Nguyen Anh Tuan
 *     <p>1:01 AM ,November 22,2020
 */
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
