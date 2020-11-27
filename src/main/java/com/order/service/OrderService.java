package com.order.service;

import com.order.constant.OrderStatus;
import com.order.entities.Order;
import com.order.entities.QOrder;
import com.order.repository.OrderRepository;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAUpdateClause;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService extends CommonRepository<Order, OrderRepository> {
  private final QOrder Q = QOrder.order;

  public OrderService(OrderRepository repo) {
    super(repo);
  }

  public void updateTotalPriceAndTotalItem(Long orderId, Long totalPrice, Integer totalItem) {
    JPAUpdateClause update = new JPAUpdateClause(em, Q);
    update.set(Q.totalPrice, totalPrice);
    update.set(Q.totalPriceAfterDiscount, totalPrice);
    update.set(Q.totalNumber, totalItem);
    update.where(Q.id.eq(orderId));
    update.execute();
  }
  
  public synchronized void updateStatusOrder(Long id, Integer status) {
    JPAUpdateClause update = new JPAUpdateClause(em, Q);
    update.set(Q.status, status);
    update.where(Q.id.eq(id));
    update.execute();
  }

  public List<Tuple> doTuple() {
    JPAQuery<Order> query = new JPAQuery<>(em);
    return query.select(Q.note, Q.customerName).from(Q).fetch();
  }

  public Long sumPriceBetweenDate(LocalDateTime startTime, LocalDateTime endTime, Integer status) {
    JPAQuery<Order> query = new JPAQuery<>(em);
    return query
        .select(Q.totalPrice.sum())
        .from(Q)
        .where(Q.createdDate.between(startTime, endTime).and(Q.status.eq(status)))
        .fetchFirst();
  }

  public Long sumPriceAfterDiscountBetweenDate(
      LocalDateTime startTime, LocalDateTime endTime, Integer status) {
    JPAQuery<Order> query = new JPAQuery<>(em);
    return query
        .select(Q.totalPriceAfterDiscount.sum())
        .from(Q)
        .where(Q.createdDate.between(startTime, endTime).and(Q.status.eq(status)))
        .fetchFirst();
  }

  public List<Order> fetchBetweenDate(LocalDateTime startTime, LocalDateTime endTime,Integer status) {
    JPAQuery<Order> query = new JPAQuery<>(em);
    return query.from(Q).where(Q.createdDate.between(startTime, endTime).and(Q.status.eq(status))).fetch();
  }
  
  public Optional<Order> findByIdAndIdAccount(Long id , Long idAccount){
    return repo.findByIdAndIdAccount(id,idAccount);
  }
  public Long sumPriceByIdAccount(Long idAccount) {
    JPAQuery<Order> query = new JPAQuery<>(em);
    return query.select(Q.totalPriceAfterDiscount.sum()).from(Q).where(Q.idAccount.eq(idAccount).and(Q.status.eq(OrderStatus.COMPLETED))).fetchFirst();
  }
}
