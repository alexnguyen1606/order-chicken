package com.order.api;

import com.order.dto.DetailOrderDTO;
import com.order.dto.ServiceResult;
import com.order.processor.DetailOrderProcessor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * November 10,2020
 */
@RestController
@RequestMapping("/api/admin/order-detail")
public class OrderDetailApi {
    private DetailOrderProcessor detailOrderProcessor;
    @PostMapping
    public ResponseEntity<ServiceResult> create(@RequestBody DetailOrderDTO detailOrderDTO){
        ServiceResult serviceResult = new ServiceResult();
        try {
            detailOrderProcessor.create(detailOrderDTO);
            serviceResult.setMessage("Thêm thành công");
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
        }
        return ResponseEntity.ok(serviceResult);
    }
  
}
