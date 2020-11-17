package com.order.processor;

import com.order.dto.DishDTO;
import com.order.entities.Dish;
import com.order.entities.QDish;
import com.order.entities.QDishCategory;
import com.order.mapper.DishCategoryMapper;
import com.order.mapper.DishMapper;
import com.order.service.DishCategoryService;
import com.order.service.DishService;
import com.querydsl.core.BooleanBuilder;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor

public class DishProcessor {
    private DishService dishService;
    private final QDish qDish = QDish.dish;
    private DishMapper dishMapper;

    public void createDish(DishDTO dishDTO) {
        dishService.save(dishMapper.toEntity(dishDTO));
    }

    public void changeDish(DishDTO dishDTO) {
        dishService.save(dishMapper.toEntity(dishDTO));
    }

    public void deleteDish(Long dishId) {
        dishService.deleteById(dishId);
    }

    public DishDTO getDish(DishDTO dishDTO) {
        return dishMapper.toDTO(dishService.findById(dishDTO.getId()).get());
    }
    public DishDTO getDish(Long id) {
        return dishMapper.toDTO(dishService.findById(id).get());
    }

    public List<DishDTO> getListDish(DishDTO dishDTO, Pageable pageable) {
        BooleanBuilder builder = commonBuilder(dishDTO);
        return dishService.findAll(builder, pageable).stream().map(dishMapper::toDTO).collect(Collectors.toList());
    }

    public Long countListDish(DishDTO dishDTO) {
        BooleanBuilder builder = commonBuilder(dishDTO);
        return dishService.count(builder);
    }

    private BooleanBuilder commonBuilder(DishDTO dishDTO) {
        BooleanBuilder result = new BooleanBuilder();
        if (dishDTO.getName() != null) result.and(qDish.name.containsIgnoreCase(dishDTO.getName()));
        if (dishDTO.getIdCategory() != null) result.and(qDish.idCategory.eq(dishDTO.getIdCategory()));
        if (dishDTO.getStatus() != null) result.and(qDish.status.eq(dishDTO.getStatus()));
        return result;
    }

    public void deleteDishes(List<Long> ids) {
        for (Long id: ids) {
            dishService.deleteById(id);
        }
    }
}
