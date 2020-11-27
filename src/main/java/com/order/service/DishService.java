package com.order.service;

import com.order.entities.Dish;
import com.order.entities.QDish;
import com.order.repository.DishRepository;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAUpdateClause;
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
  
  public void updateStatus(Long id,String status){
    JPAUpdateClause update = new JPAUpdateClause(em,Q);
    update.set(Q.status,status);
    update.where(Q.id.eq(id)).execute();
  }
  public void updateAllStatus(List<Long> ids,String status){
    JPAUpdateClause update = new JPAUpdateClause(em,Q);
    update.set(Q.status,status);
    update.where(Q.id.in(ids)).execute();
  }
}
