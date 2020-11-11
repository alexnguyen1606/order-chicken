package com.order.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

/**
 * @author:Nguyen Anh Tuan
 *     <p>November 10,2020
 */
@Data
public class OrderDTO {
  private Long id;

  private Long idAccount;

  private Long idVoucher;
  
  private Long customerPhone;
  @NotBlank(message = "Địa chỉ giao hàng không được bỏ trống")
  private String customerAddress;

  private LocalDateTime createdDate;

  private String deliveryTime;

  private String note;

  private Integer totalNumber;

  private Long totalPrice;

  private String payment;
  
  private String voucherCode;
  
  private String customerName;
  
  private Integer useCurrentInfo;
  
  private Integer status;
  
}
