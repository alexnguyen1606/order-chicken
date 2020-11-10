package com.order.service;

import com.order.repository.VoucherRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VoucherService {
    private VoucherRepository voucherRepository;
}
