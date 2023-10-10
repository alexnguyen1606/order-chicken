package com.order.processor;

import com.order.constant.EntityConstant;
import com.order.dto.DishDTO;
import com.order.entities.QDish;
import com.order.mapper.DishMapper;
import com.order.service.DishService;
import com.querydsl.core.BooleanBuilder;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

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
    dishService.updateStatus(dishId, EntityConstant.INACTIVE_STATUS_DISH);
  }

  public DishDTO getDish(DishDTO dishDTO) {
    return getDish(dishDTO.getId());
  }

  public DishDTO getDish(Long id) {
    return dishService.findById(id)
            .map(dishMapper::toDTO)
            .orElseGet(null);
  }

  public List<DishDTO> getListDish(DishDTO dishDTO, Pageable pageable) {
    BooleanBuilder builder = commonBuilder(dishDTO);

    return dishService.findAll(builder, pageable).stream()
        .map(dishMapper::toDTO)
        .collect(Collectors.toList());
  }

  public Long countListDish(DishDTO dishDTO) {
    BooleanBuilder builder = commonBuilder(dishDTO);
    return dishService.count(builder);
  }

  private BooleanBuilder commonBuilder(DishDTO dishDTO) {
    BooleanBuilder result = new BooleanBuilder();

    if (dishDTO.getName() != null) {
      result.and(qDish.name.containsIgnoreCase(dishDTO.getName()));
    }
    if (dishDTO.getIdCategory() != null) {
      result.and(qDish.idCategory.eq(dishDTO.getIdCategory()));
    }
    if (dishDTO.getStatus() != null) {
      result.and(qDish.status.eq(dishDTO.getStatus()));
    }
    if (StringUtils.isNotBlank(dishDTO.getSearch())){
      result.and(qDish.name.containsIgnoreCase(dishDTO.getSearch()));
    }
    return result;
  }

  @Transactional
  public void deleteDishes(List<Long> ids) {
    dishService.updateAllStatus(ids, EntityConstant.INACTIVE_STATUS_DISH);
  }

  public List<DishDTO> findCategoryAndActive(Long category) {
    return dishService.findByCategoryAndStatus(category, EntityConstant.ACTIVE_STATUS_DISH).stream()
        .map(dishMapper::toDTO)
        .collect(Collectors.toList());
  }
}
