package com.order.repository;

import com.order.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface UserRepository  extends JpaRepository<User,Long>, QuerydslPredicateExecutor<User> {
    
    User findByIdAccount(Long idAccount);
}
