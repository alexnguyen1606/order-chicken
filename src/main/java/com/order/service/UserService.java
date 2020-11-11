package com.order.service;

import com.order.entities.User;
import com.order.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service

public class UserService extends CommonRepository<User,UserRepository> {
    
    public UserService(UserRepository repo) {
        super(repo);
    }
    
    public User findByAccountId(Long accountId){
        return repo.findByIdAccount(accountId);
    }
}
