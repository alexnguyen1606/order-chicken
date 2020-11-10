package com.order.service;

import com.order.repository.DishRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DishService {
    private DishRepository dishRepository;
}
