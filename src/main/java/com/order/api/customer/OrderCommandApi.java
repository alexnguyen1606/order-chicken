package com.order.api.customer;

import com.order.api.ExceptionHandlerApi;
import com.order.dto.OrderDTO;
import com.order.dto.ServiceResult;
import com.order.processor.order.OrderCommadProcessor;
import com.order.processor.order.OrderProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 8:28 AM ,November 19,2020
 */
@RequestMapping("/api/order")
@RestController(value = "orderCommandCustomerApi")
@AllArgsConstructor
public class OrderCommandApi extends ExceptionHandlerApi {
    private OrderCommadProcessor orderCommadProcessor;
    
    @PostMapping
    public ResponseEntity<ServiceResult> create(@RequestBody OrderDTO orderDTO){
        ServiceResult serviceResult = new ServiceResult("Đặt hàng thành công");
        try {
            orderCommadProcessor.create(orderDTO);
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
    
    
}
