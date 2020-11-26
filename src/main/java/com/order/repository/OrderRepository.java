package com.order.repository;

import com.order.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;

public interface OrderRepository  extends JpaRepository<Order,Long>, QuerydslPredicateExecutor<Order> {
    
    Optional<Order> findByIdAndIdAccount(Long id,Long idAccount);
}
