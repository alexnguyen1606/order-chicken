package com.order.repository;

import com.order.entities.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface DishRepository extends JpaRepository<Dish,Long>, QuerydslPredicateExecutor<Dish> {
    
     List<Dish> findByIdCategoryAndStatus(Long categoryId,String status);
}
