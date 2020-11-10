package com.order.api;

import com.order.dto.OrderDTO;
import com.order.dto.ServiceResult;
import com.order.processor.OrderProcessor;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
@RequestMapping("/api/admin/order")
public class OrderApi extends ExceptionHandlerApi {
    private OrderProcessor orderProcessor;
    
    @PostMapping
    public ResponseEntity<ServiceResult> create(@RequestBody OrderDTO orderDTO){
        
        return null;
    }
    
}
