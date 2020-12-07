package com.order.api.customer;

import com.order.dto.ServiceResult;
import com.order.processor.DishCategoryProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController(value = "categoryCustomerApi")
@RequestMapping("/api/category")
public class CategoryApi {
    private DishCategoryProcessor dishCategoryProcessor;
    @GetMapping("/list")
    public ResponseEntity<ServiceResult> getListCategory(){
        ServiceResult serviceResult = new ServiceResult();
        serviceResult.setData(dishCategoryProcessor.findAll());
        return ResponseEntity.ok(serviceResult);
    }
    
}
