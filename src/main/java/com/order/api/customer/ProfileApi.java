package com.order.api.customer;

import com.order.dto.ServiceResult;
import com.order.processor.UserProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
@AllArgsConstructor
public class ProfileApi {
    private UserProcessor userProcessor;
    @GetMapping("/current")
    public ResponseEntity<ServiceResult> getCurrentUser(){
        ServiceResult serviceResult = new ServiceResult();
        serviceResult.setData(userProcessor.getCurrentInfo());
        return ResponseEntity.ok(serviceResult);
    }
}
