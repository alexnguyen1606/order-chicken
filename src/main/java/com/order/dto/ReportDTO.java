package com.order.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

/**
 * @author:Nguyen Anh Tuan
 *     <p>9:01 AM ,November 25,2020
 */
@Data
public class ReportDTO {
  private Long id;

  private String code;

  @NotNull(message = "Thời gian bắt đầu không được bỏ trống")
  private LocalDateTime startTime;

  @NotNull(message = "Thời gian cuối không được bỏ trống")
  private LocalDateTime endTime;

  private String sourceReport;

  private Long totalPriceTake;

  private Long totalCharge;
  
  private List<Long> ids = new LinkedList<>();
  
  private String fileName;
}
