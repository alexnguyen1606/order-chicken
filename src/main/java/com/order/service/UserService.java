package com.order.service;

import com.order.entities.QUser;
import com.order.entities.User;
import com.order.repository.UserRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserService extends CommonRepository<User,Long, UserRepository> {
    private QUser Q = QUser.user;

    public UserService(UserRepository repo) {
        super(repo);
    }

    public User findByAccountId(Long accountId) {
        return repo.findByIdAccount(accountId)
                .orElse(null);
    }

    public User findByAccountIdOrElseThrow(Long accountId) {
        return repo.findByIdAccount(accountId)
                .orElseThrow(RuntimeException::new);
    }

    public List<Long> findAllAccountIdBySearch(String search) {
        JPAQuery<User> query = new JPAQuery<>(em);
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(Q.name.containsIgnoreCase(search).or(Q.email.containsIgnoreCase(search)).or(Q.phone.containsIgnoreCase(search)));
        return query.select(Q.idAccount).from(Q).where(builder).fetch();
    }

}
