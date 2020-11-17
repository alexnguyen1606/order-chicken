package com.order.service;

import com.order.entities.Order;
import com.order.entities.QOrder;
import com.order.repository.OrderRepository;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAUpdateClause;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService extends CommonRepository<Order, OrderRepository> {
  private final QOrder Q = QOrder.order;

  public OrderService(OrderRepository repo) {
    super(repo);
  }

  public void updateTotalPriceAndTotalItem(Long orderId, Long totalPrice, Integer totalItem) {
    JPAUpdateClause update = new JPAUpdateClause(em, Q);
    update.set(Q.totalPrice, totalPrice);
    update.set(Q.totalNumber, totalItem);
    update.where(Q.id.eq(orderId));
    update.execute();
  }

  public void updateStatusOrder(Long id, Integer status) {
    JPAUpdateClause update = new JPAUpdateClause(em, Q);
    update.set(Q.status, status);
    update.where(Q.id.eq(id));
    update.execute();
  }

  public List<Tuple> doTuple() {
    JPAQuery<Order> query = new JPAQuery<>(em);
    return query.select(Q.note, Q.customerName).from(Q).fetch();
  }
}
