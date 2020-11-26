package com.order.service;

import com.order.entities.QUser;
import com.order.entities.User;
import com.order.repository.UserRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserService extends CommonRepository<User,UserRepository> {
    private QUser Q = QUser.user;
    
    public UserService(UserRepository repo) {
        super(repo);
    }
    
    public User findByAccountId(Long accountId){
        return repo.findByIdAccount(accountId);
    }

    public List<Long> findAllAccountIdBySearch(String search) {
        JPAQuery<User> query = new JPAQuery<>(em);
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(Q.name.containsIgnoreCase(search).or(Q.email.containsIgnoreCase(search)));
        return query.select(Q.idAccount).from(Q).where(builder).fetch();
    }
    
}
