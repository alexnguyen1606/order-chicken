package com.order.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

/**
 * @author:Nguyen Anh Tuan
 *     <p>2:06 PM ,November 17,2020
 */
@Data
public class VoucherDTO {

  private Long id;

  @NotBlank(message = "Mã khuyến mại không được bỏ trống")
  private String code;

  private String name;

  @NotNull(message = "Thời gian bắt đầu khuyến mại không hợp lệ")
  private LocalDateTime startTime;

  @NotNull(message = "Thời gian kết thúc khuyến mại không hợp lệ")
  private LocalDateTime endTime;

  @NotNull(message = "Discount không được bỏ trống")
  private Integer discount;

  private String search;

  private String urlImg;

  private String content;

  private String startTimeString;
  
  private String endTimeString;

  @NotNull(message = "Trạng thái không được bỏ trống")
  private Integer status;
  
  private List<Long> ids = new LinkedList<>();
}
