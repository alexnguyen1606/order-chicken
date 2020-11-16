package com.order.processor;

import com.order.dto.DishCategoryDTO;
import com.order.entities.QDishCategory;
import com.order.mapper.DishCategoryMapper;
import com.order.service.DishCategoryService;
import com.querydsl.core.BooleanBuilder;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class DishCategoryProcessor {
    private DishCategoryService dishCategoryService;
    private final QDishCategory qDishCategory = QDishCategory.dishCategory;
    private DishCategoryMapper dishCategoryMapper;

    public void createDishCategory(DishCategoryDTO dishCategoryDTO) {
        dishCategoryService.save(dishCategoryMapper.toEntity(dishCategoryDTO));
    }

    public void changeDishCategory(DishCategoryDTO dishCategoryDTO) {
        dishCategoryService.save(dishCategoryMapper.toEntity(dishCategoryDTO));
    }

    public DishCategoryDTO getCategoryDish(DishCategoryDTO dishCategoryDTO) {
        return dishCategoryMapper.toDTO(dishCategoryService.findById(dishCategoryDTO.getId()).get());
    }

    public DishCategoryDTO getCategoryDish(Long id) {
        return dishCategoryMapper.toDTO(dishCategoryService.findById(id).get());
    }

    public List<DishCategoryDTO> getListDish(DishCategoryDTO dishCategoryDTO, Pageable pageable) {
        BooleanBuilder builder = commonBuilder(dishCategoryDTO);
        return dishCategoryService.findAll(builder, pageable).stream().map(dishCategoryMapper::toDTO).collect(Collectors.toList());
    }

    public Long countListDishCategory(DishCategoryDTO dishCategoryDTO) {
        BooleanBuilder builder = commonBuilder(dishCategoryDTO);
        return dishCategoryService.count(builder);
    }

    public void deleteDishCategory(Long dishCategoryId) {
        dishCategoryService.deleteById(dishCategoryId);
    }

    private BooleanBuilder commonBuilder(DishCategoryDTO dishCategoryDTO) {
        BooleanBuilder result = new BooleanBuilder();
        if (dishCategoryDTO.getName() != null)
            result.and(qDishCategory.name.containsIgnoreCase(dishCategoryDTO.getName()));
        return result;
    }

}