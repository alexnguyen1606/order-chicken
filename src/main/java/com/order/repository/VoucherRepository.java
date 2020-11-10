package com.order.repository;

import com.order.entities.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository  extends JpaRepository<Voucher,Long> {
}
