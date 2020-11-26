package com.order.repository;

import com.order.entities.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;

public interface VoucherRepository  extends JpaRepository<Voucher,Long>, QuerydslPredicateExecutor<Voucher> {
    Optional<Voucher> findByCode(String code);
    
    boolean existsByCode(String code);
}
