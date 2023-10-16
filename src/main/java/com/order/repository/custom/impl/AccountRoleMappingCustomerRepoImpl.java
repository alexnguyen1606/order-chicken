package com.order.repository.custom.impl;

import com.order.entities.AccountRoleMapping;
import com.order.entities.QAccountRoleMapping;
import com.order.repository.custom.AccountRoleMappingCustomRepo;
import com.querydsl.jpa.impl.JPAQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class AccountRoleMappingCustomerRepoImpl implements AccountRoleMappingCustomRepo {

    private final QAccountRoleMapping Q = QAccountRoleMapping.accountRoleMapping;

    private final EntityManager em;


    @Override
    public List<Long> fetchRoleIdByAccount(Long accountId) {
        JPAQuery<AccountRoleMapping> query = new JPAQuery<>(em);
        return query.select(Q.roleId).from(Q).where(Q.accountId.eq(accountId)).fetch();
    }
}
