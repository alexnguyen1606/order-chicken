package com.order.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
public class DetailOrderDTO {
  private Long id;

  @NotNull(message = "Đơn đặt chưa được tạo thành công")
  private Long idOrder;

  private Long idDish;

  private Integer number;

  private Long price;

  private Long totalPrice;

  private List<Long> idsDish = new ArrayList<>();
  
  private List<Integer> listNumberItem = new ArrayList<>();
  
  private String productName;
}
