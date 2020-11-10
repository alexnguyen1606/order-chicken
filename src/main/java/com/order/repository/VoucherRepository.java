package com.order.repository;

import com.order.entities.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface VoucherRepository  extends JpaRepository<Voucher,Long>, QuerydslPredicateExecutor<Voucher> {
}
