package com.order.repository;

import com.order.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AccountRepository
        extends JpaRepository<Account, Long> {
}
