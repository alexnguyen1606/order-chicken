package com.order.repository;

import com.order.entities.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface BillRepository extends JpaRepository<Bill,Long>, QuerydslPredicateExecutor<Bill> {
}
