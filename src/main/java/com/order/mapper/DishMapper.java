package com.order.mapper;

import com.order.dto.DishDTO;
import com.order.entities.Dish;
import com.order.mapper.resolve.DishResolve;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(uses = DishResolve.class)
@Component
public interface DishMapper extends CommonMapper<Dish, DishDTO> {
}
