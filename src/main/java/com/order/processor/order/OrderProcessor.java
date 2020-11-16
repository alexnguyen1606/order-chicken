package com.order.processor.order;

import com.order.dto.OrderDTO;
import com.order.entities.QOrder;
import com.order.mapper.OrderMapper;
import com.order.service.*;
import com.querydsl.core.BooleanBuilder;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author:Nguyen Anh Tuan
 *     <p>November 10,2020
 */
@Service
@AllArgsConstructor
public class OrderProcessor {
  private OrderService orderService;
  private OrderMapper orderMapper;
  private final QOrder Q = QOrder.order;

  public List<OrderDTO> findAll(OrderDTO orderDTO, Pageable pageable) {
    BooleanBuilder builder = commonBooleanBuilder(orderDTO);
    return orderService.findAll(builder, pageable).stream()
        .map(orderMapper::toDTO)
        .collect(Collectors.toList());
  }

  public Long count(OrderDTO orderDTO) {
    BooleanBuilder builder = commonBooleanBuilder(orderDTO);
    return orderService.count(builder);
  }

  private BooleanBuilder commonBooleanBuilder(final OrderDTO orderDTO) {
    BooleanBuilder builder = new BooleanBuilder();
    if (orderDTO.getStatus() != null) {
      builder.and(Q.status.eq(orderDTO.getStatus()));
    }
    if (StringUtils.isNotBlank(orderDTO.getSearch())) {
      String textSearch = orderDTO.getSearch();
    }
    return builder;
  }
}
