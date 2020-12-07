package com.order.mapper.resolve;

import com.order.dto.DishDTO;
import com.order.entities.Dish;
import com.order.entities.DishCategory;
import com.order.service.DishCategoryService;
import lombok.AllArgsConstructor;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DishResolve {
    private DishCategoryService dishCategoryService;

    @ObjectFactory
    public DishDTO revolve(Dish dish, @TargetType Class<DishDTO> type) {
        DishDTO result = new DishDTO();
        result.setDishCategory(dishCategoryService.findById(dish.getIdCategory()).get());
        return result;
    }
}
