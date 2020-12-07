package com.order.processor.order;

import com.order.dto.OrderDTO;
import com.order.entities.Order;
import com.order.entities.QOrder;
import com.order.mapper.OrderDetailMapper;
import com.order.mapper.OrderMapper;
import com.order.security.MyUser;
import com.order.service.DetailOrderService;
import com.order.service.OrderService;
import com.querydsl.core.BooleanBuilder;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderProcessor {
  private OrderService orderService;
  private OrderMapper orderMapper;
  private OrderDetailMapper orderDetailMapper;
  private DetailOrderService detailOrderService;
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

  public OrderDTO findById(Long id) throws Exception {
    Optional<Order> optionalOrder = orderService.findById(id);
    if (!optionalOrder.isPresent()) {
      throw new Exception("Không tìm thấy đơn hàng");
    }
    Order order = optionalOrder.get();
    return orderMapper.toDTO(order);
  }

  public OrderDTO findByIdAndUserOrdered(Long id) throws Exception {
    MyUser myUser = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Optional<Order> optionalOrder = orderService.findByIdAndIdAccount(id, myUser.getId());
    if (!optionalOrder.isPresent()) {
      throw new Exception("Không tìm thấy đơn hàng");
    }
    return orderMapper.toDTO(optionalOrder.get());
  }

  public List<OrderDTO> getOrderByUser(Pageable pageable) {
    MyUser myUser = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    BooleanBuilder builder = new BooleanBuilder().and(Q.idAccount.eq(myUser.getId()));
    return orderService.findAll(builder, pageable).stream()
        .map(orderMapper::toDTO)
        .collect(Collectors.toList());
  }

  public Long countAllByUser() {
    MyUser myUser = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    BooleanBuilder builder = new BooleanBuilder().and(Q.idAccount.eq(myUser.getId()));
    return orderService.count(builder);
  }

  private BooleanBuilder commonBooleanBuilder(final OrderDTO orderDTO) {
    BooleanBuilder builder = new BooleanBuilder();
    if (orderDTO.getStatus() != null) {
      builder.and(Q.status.eq(orderDTO.getStatus()));
    }
    if (StringUtils.isNotBlank(orderDTO.getSearch())) {
      String textSearch = orderDTO.getSearch();
      builder.and(
          Q.customerPhone
              .containsIgnoreCase(textSearch)
              .or(Q.customerName.containsIgnoreCase(textSearch)));
    }
    return builder;
  }
}
