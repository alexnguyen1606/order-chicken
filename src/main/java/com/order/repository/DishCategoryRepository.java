package com.order.repository;

import com.order.entities.DishCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishCategoryRepository extends JpaRepository<DishCategory,Long> {
}
