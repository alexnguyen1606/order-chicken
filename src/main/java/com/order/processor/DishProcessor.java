package com.order.processor;

import com.order.service.DishCategoryService;
import com.order.service.DishService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DishProcessor {
    @Autowired
    private DishService dishService;
    @Autowired
    private DishCategoryService dishCategoryService;
}
