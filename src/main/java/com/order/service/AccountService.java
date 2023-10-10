package com.order.service;

import com.order.entities.Account;
import com.order.repository.AccountRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class AccountService  extends CommonRepository<Account,Long,AccountRepository>{
    
    public AccountService(AccountRepository repo) {
        super(repo);
    }
    
    public Account findByUsernameAndStatus(String username,Integer status){
        return repo.findByUserNameAndStatus(username,status);
    }
    
    public boolean exitsByUserName(String userName){
        return repo.existsByUserName(userName);
    }
}
