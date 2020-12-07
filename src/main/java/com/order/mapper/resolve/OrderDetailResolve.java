package com.order.mapper.resolve;

import com.order.dto.DetailOrderDTO;
import com.order.entities.DetailOrder;
import com.order.service.DishService;
import lombok.AllArgsConstructor;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OrderDetailResolve {
  private DishService dishService;

  @ObjectFactory
  public DetailOrderDTO revolve(DetailOrder detailOrder, @TargetType Class<DetailOrderDTO> type) {
    DetailOrderDTO detailOrderDTO = new DetailOrderDTO();
    detailOrderDTO.setProductName(dishService.getNameById(detailOrder.getIdDish()));
    return detailOrderDTO;
  }
}
