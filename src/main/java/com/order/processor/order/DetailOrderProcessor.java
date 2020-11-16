package com.order.processor.order;

import com.order.dto.DetailOrderDTO;
import com.order.entities.QDetailOrder;
import com.order.mapper.OrderDetailMapper;
import com.order.service.DetailOrderService;
import com.querydsl.core.BooleanBuilder;
import lombok.AllArgsConstructor;
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
public class DetailOrderProcessor {
  private DetailOrderService detailOrderService;

  private OrderDetailMapper orderDetailMapper;
  private final QDetailOrder Q = QDetailOrder.detailOrder;

  public List<DetailOrderDTO> findByOrderId(Long orderId, Pageable pageable) {
    BooleanBuilder builder = new BooleanBuilder().and(Q.id.eq(orderId));
    return detailOrderService.findAll(builder, pageable).stream()
        .map(orderDetailMapper::toDTO)
        .collect(Collectors.toList());
  }

  public Long countByOrderId(Long orderId) {
    BooleanBuilder builder = new BooleanBuilder().and(Q.id.eq(orderId));
    return detailOrderService.count(builder);
  }
}
