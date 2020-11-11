package com.order.repository;

import com.order.entities.DetailOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.transaction.annotation.Transactional;

public interface DetailOrderRespository extends JpaRepository<DetailOrder,Long>, QuerydslPredicateExecutor<DetailOrder> {
    @Transactional
    @Modifying
    void deleteByIdOrder(Long idOrder);
}
