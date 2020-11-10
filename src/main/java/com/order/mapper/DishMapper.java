package com.order.mapper;

import com.order.dto.DishDTO;
import com.order.entities.Dish;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

/**
 * @author:Nguyen Anh Tuan
 * <p>November 10,2020
 */
@Mapper
@Component
public interface DishMapper extends CommonMapper<Dish, DishDTO> {
}
