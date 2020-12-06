package com.order.mapper.resolve;

import com.order.dto.OrderDTO;
import com.order.entities.Order;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.stereotype.Component;

@Component
public class OrderResolve {
  @ObjectFactory
  public OrderDTO resolve(Order order, @TargetType Class<OrderDTO> type) {
    OrderDTO orderDTO = new OrderDTO();
    switch (order.getStatus()) {
      case 1:
        orderDTO.setStatusString("Đã nhận đơn");
        break;
      case 0:
        orderDTO.setStatusString("Chờ xác nhận đơn");
        break;
      case 3:
        orderDTO.setStatusString("Đã hoàn thành");
        break;
      case 2:
        orderDTO.setStatusString("Đã bị hủy");
        break;
    }
    return orderDTO;
  }
}
