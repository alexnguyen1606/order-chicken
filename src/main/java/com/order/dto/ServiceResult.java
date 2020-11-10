package com.order.dto;

import lombok.Data;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * November 10,2020
 */
@Data
public class ServiceResult {
    private String message;
    private Object data;
    private Integer totalPage;
    private Integer currentPage;
    
    public ServiceResult() {
    }
    
    public ServiceResult(Object data, Integer totalPage, Integer currentPage) {
        this.data = data;
        this.totalPage = totalPage;
        this.currentPage = currentPage;
    }
}
