package com.order.processor;

import com.order.dto.DishDTO;
import com.order.entities.QDish;
import com.order.entities.QDishCategory;
import com.order.mapper.DishCategoryMapper;
import com.order.mapper.DishMapper;
import com.order.service.DishCategoryService;
import com.order.service.DishService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor

public class DishProcessor {
    private DishService dishService;
    private DishCategoryService dishCategoryService;
    private final QDish qDish = QDish.dish;
    private final QDishCategory qDishCategory = QDishCategory.dishCategory;
    private DishMapper dishMapper;
    private DishCategoryMapper dishCategoryMapper;

    public void createDish(DishDTO dishDTO) {

    }

}
