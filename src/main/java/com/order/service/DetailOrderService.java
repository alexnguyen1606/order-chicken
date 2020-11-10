package com.order.service;

import com.order.repository.DetailOrderRespository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DetailOrderService {
    private DetailOrderRespository detailOrderRespository;
}
