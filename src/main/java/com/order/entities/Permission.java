package com.order.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author:Nguyen Anh Tuan
 *     <p>9:56 AM ,December 17,2020
 */
@Table
@Entity
@Getter
@Setter
public class Permission {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  private String link;

  private Integer status;
  
  private String method;
}
