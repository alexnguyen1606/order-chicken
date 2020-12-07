package com.order.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Data
public class OrderDTO {
  private Long id;

  private Long idAccount;

  private Long idVoucher;

  private String customerPhone;

  @NotBlank(message = "Địa chỉ giao hàng không được bỏ trống")
  private String customerAddress;

  private String createdDate;
  @NotBlank(message = "Thời gian giao không được bỏ trống")
  private String deliveryTime;

  private String note;

  private Integer totalNumber;

  private Long totalPrice;

  private String payment;

  private String voucherCode;

  private String customerName;

  private Integer useCurrentInfo;

  private Integer status;

  private String statusString;

  private List<Long> idsDish = new ArrayList<>();
  private List<Integer> listNumberItem = new ArrayList<>();

  private List<Long> ids = new LinkedList<>();

  private String search;

  private List<DetailOrderDTO> orderDetails = new ArrayList<>();

  private Integer discount;
  
  private Long totalPriceAfterDiscount;
}
