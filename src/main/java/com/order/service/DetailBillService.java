package com.order.service;

import com.order.repository.DetailBillRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DetailBillService {
    private DetailBillRepository detailBillRepository;
}
