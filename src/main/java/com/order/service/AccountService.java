package com.order.service;

import com.order.entities.Account;
import com.order.repository.AccountRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class AccountService  extends CommonRepository<Account,AccountRepository>{
    
    public AccountService(AccountRepository repo) {
        super(repo);
    }
}
