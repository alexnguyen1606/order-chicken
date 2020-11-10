package com.order.service;

import com.order.entities.Order;
import com.order.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService extends CommonRepository<Order, OrderRepository> {
  private OrderRepository orderRepository;

  public OrderService(OrderRepository repo) {
    super(repo);
  }
}
