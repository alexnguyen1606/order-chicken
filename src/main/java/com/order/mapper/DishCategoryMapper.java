package com.order.mapper;

import com.order.dto.DishCategoryDTO;
import com.order.entities.DishCategory;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface DishCategoryMapper extends CommonMapper<DishCategory, DishCategoryDTO> {
}
