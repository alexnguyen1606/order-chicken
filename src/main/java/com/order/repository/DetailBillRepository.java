package com.order.repository;

import com.order.entities.DetailBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface DetailBillRepository extends JpaRepository<DetailBill,Long>, QuerydslPredicateExecutor<DetailBill> {
}
