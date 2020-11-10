package com.order.service;

import com.order.repository.BillRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BillService {
    private BillRepository billRepository;
}
