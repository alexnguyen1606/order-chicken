package com.order.api;

import com.order.dto.DishDTO;
import com.order.dto.ServiceResult;
import com.order.processor.DishProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/dish")
@AllArgsConstructor
public class DishApi {
    private DishProcessor dishProcessor;

    @PostMapping
    public ResponseEntity<ServiceResult> createDish(@RequestBody DishDTO dishDTO) {
        dishProcessor.createDish(dishDTO);
        return new ResponseEntity<>(new ServiceResult("success","200"), HttpStatus.OK);
    }
}
