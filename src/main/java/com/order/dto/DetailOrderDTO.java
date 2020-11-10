package com.order.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/**
 * @author:Nguyen Anh Tuan
 *     <p>November 10,2020
 */
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
  private List<Integer> listItem = new ArrayList<>();
}
