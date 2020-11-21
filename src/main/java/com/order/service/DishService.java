package com.order.service;

import com.order.entities.Dish;
import com.order.entities.QDish;
import com.order.repository.DishRepository;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DishService extends CommonRepository<Dish, DishRepository> {
  public DishService(DishRepository repo) {
    super(repo);
  }

  private final QDish Q = QDish.dish;

  public String getNameById(Long id) {
    JPAQuery<Dish> query = new JPAQuery<>(em);
    return query.select(Q.name).from(Q).where(Q.id.eq(id)).fetchFirst();
  }

  public List<Dish> findByCategoryAndStatus(Long categoryId, String status) {
    return repo.findByIdCategoryAndStatus(categoryId, status);
  }
}
