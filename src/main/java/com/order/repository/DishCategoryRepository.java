package com.order.repository;

import com.order.entities.DishCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface DishCategoryRepository extends JpaRepository<DishCategory,Long>, QuerydslPredicateExecutor<DishCategory> {
}
