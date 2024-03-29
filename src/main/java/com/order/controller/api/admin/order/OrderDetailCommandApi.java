package com.order.controller.api.admin.order;

import com.order.dto.DetailOrderDTO;
import com.order.dto.ServiceResult;
import com.order.processor.order.DetailOrderCommandProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/order-detail")
@AllArgsConstructor
public class OrderDetailCommandApi {
    private DetailOrderCommandProcessor detailOrderProcessor;
    @PostMapping
    public ResponseEntity<ServiceResult> create(@RequestBody DetailOrderDTO detailOrderDTO){
        ServiceResult serviceResult = new ServiceResult();
        try {
            detailOrderProcessor.createOrUpdate(detailOrderDTO);
            serviceResult.setMessage("Thêm thành công");
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
        }
        return ResponseEntity.ok(serviceResult);
    }
    
}
