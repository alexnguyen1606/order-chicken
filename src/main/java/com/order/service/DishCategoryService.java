package com.order.service;

import com.order.entities.DishCategory;
import com.order.repository.DishCategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DishCategoryService extends CommonRepository<DishCategory,Long,DishCategoryRepository> {


    public DishCategoryService(DishCategoryRepository repo) {
        super(repo);
    }
}
