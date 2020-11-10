package com.order.service;

import com.order.entities.Dish;
import com.order.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DishService extends CommonRepository<Dish, DishRepository> {
   

    public DishService(DishRepository repo) {
        super(repo);
    }
}
