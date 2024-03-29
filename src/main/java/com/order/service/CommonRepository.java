package com.order.service;

import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

public abstract class CommonRepository<
    T, ID, R extends JpaRepository<T, ID> & QuerydslPredicateExecutor<T>> {
  public CommonRepository(R repo) {

    this.repo = repo;
  }

  @PersistenceContext EntityManager em;
  protected R repo;

  public EntityManager getEm() {
    return em;
  }

  public Page<T> findAll(Pageable pageable) {
    return repo.findAll(pageable);
  }

  public Iterable<T> findAll(Predicate predicate) {
    return repo.findAll(predicate);
  }

  public List<T> findAll() {
    return repo.findAll();
  }

  public List<T> findAll(Predicate predicate, Pageable pageable) {
    return repo.findAll(predicate, pageable).getContent();
  }

  public Long count(Predicate predicate) {
    return repo.count(predicate);
  }

  public Optional<T> findById(ID id) {
    return repo.findById(id);
  }

  public Optional<T> findOne(Predicate predicate) {
    return repo.findOne(predicate);
  }

  public T save(T t) {
    return repo.save(t);
  }

  public void delete(T t) {
    repo.delete(t);
  }

  public void deleteById(ID id) {
    repo.deleteById(id);
  }

  public void delete(Predicate predicate) {
    Optional<T> t = repo.findOne(predicate);
    t.ifPresent(t1 -> repo.delete(t1));
  }

  public Long count() {
    return repo.count();
  }

  public boolean exist(Predicate predicate) {
    long count = repo.count(predicate);
    return count != 0;
  }

  public List<T> saveAll(List<T> list) {
    repo.saveAll(list);
    return list;
  }

  public void deleteAll(List<T> list) {
    repo.deleteAll(list);
  }

  public Boolean exitsById(ID id) {
    return repo.existsById(id);
  }
}
