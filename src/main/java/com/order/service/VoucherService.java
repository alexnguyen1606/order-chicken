package com.order.service;

import com.order.entities.Voucher;
import com.order.repository.VoucherRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VoucherService extends CommonRepository<Voucher, Long, VoucherRepository> {

  public VoucherService(VoucherRepository repo) {
    super(repo);
  }

  public Optional<Voucher> findByCode(String code) {
    return repo.findByCode(code);
  }

  public boolean exitsByCode(String code) {
    return repo.existsByCode(code);
  }
}
