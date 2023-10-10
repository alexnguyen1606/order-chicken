package com.order.repository;

import com.order.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface AccountRepository
    extends JpaRepository<Account, Long>, QuerydslPredicateExecutor<Account> {

  Account findByUserNameAndStatus(String username, Integer status);
  
  Boolean existsByUserName(String userName);


  
}
