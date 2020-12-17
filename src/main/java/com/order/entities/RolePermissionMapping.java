package com.order.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author:Nguyen Anh Tuan
 *     <p>10:01 AM ,December 17,2020
 */
@Table
@Entity
@Getter
@Setter
public class RolePermissionMapping {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long permisstionId;

  private Long roleId;
}
