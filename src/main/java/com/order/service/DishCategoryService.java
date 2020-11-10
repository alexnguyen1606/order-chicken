package com.order.service;

import com.order.repository.DishCategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DishCategoryService {
    private DishCategoryRepository dishCategoryRepository;
}
