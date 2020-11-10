package com.order.processor;

import com.order.dto.OrderDTO;
import com.order.entities.Order;
import com.order.entities.QOrder;
import com.order.mapper.OrderMapper;
import com.order.service.DetailOrderService;
import com.order.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author:Nguyen Anh Tuan
 *     <p>November 10,2020
 */
@Service
@AllArgsConstructor
public class OrderProcessor {
  private OrderService orderService;
  private DetailOrderService detailOrderService;
  private OrderMapper orderMapper;
  private final QOrder Q = QOrder.order;

  public void create(OrderDTO orderDTO) throws Exception {
    if (orderDTO.getId() != null) {
      throw new Exception("Tạo đơn hàng không thành công");
    }
    Order order = orderMapper.toEntity(orderDTO);
    orderService.save(order);
    
  }
}
