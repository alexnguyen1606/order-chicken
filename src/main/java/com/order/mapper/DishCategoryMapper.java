package com.order.mapper;

import com.order.dto.DishCategoryDTO;
import com.order.entities.DishCategory;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

/**
 * @author:Nguyen Anh Tuan
 * <p>November 10,2020
 */
@Mapper
@Component
public interface DishCategoryMapper extends CommonMapper<DishCategory, DishCategoryDTO> {
}
