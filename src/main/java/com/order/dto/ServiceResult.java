package com.order.dto;

import lombok.Data;

@Data
public class ServiceResult {
  private String message;
  private Object data;
  private Integer totalPage;
  private Integer currentPage;
  private String status;

  public ServiceResult() {}

  public ServiceResult(Object data, Integer totalPage, Integer currentPage) {
    this.data = data;
    this.totalPage = totalPage;
    this.currentPage = currentPage;
  }

  public ServiceResult(String message, String status) {
    this.status = status;
    this.message = message;
  }

  public ServiceResult(Object data, String message, String status) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public ServiceResult(String message) {
    this.message = message;
  }
}
