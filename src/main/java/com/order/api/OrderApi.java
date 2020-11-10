package com.order.api;

import com.order.dto.OrderDTO;
import com.order.dto.ServiceResult;
import com.order.processor.OrderProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * November 10,2020
 */
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/order")
public class OrderApi extends ExceptionHandlerApi {
    private OrderProcessor orderProcessor;
    
    @PostMapping
    public ResponseEntity<ServiceResult> createByAdmin(@Valid @RequestBody OrderDTO orderDTO){
        ServiceResult serviceResult = new ServiceResult();
        try {
            orderProcessor.createByAdmin(orderDTO);
            serviceResult.setMessage("Đặt thành công");
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
    
}
