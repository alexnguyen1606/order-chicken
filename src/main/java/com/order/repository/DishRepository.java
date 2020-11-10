package com.order.repository;

import com.order.entities.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface DishRepository extends JpaRepository<Dish,Long>, QuerydslPredicateExecutor<Dish> {
}
