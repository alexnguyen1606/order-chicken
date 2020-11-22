package com.order.service;

import com.order.entities.AccountRoleMapping;
import com.order.entities.QAccountRoleMapping;
import com.order.repository.AccountRoleMappingRepository;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author:Nguyen Anh Tuan
 *     <p>1:07 AM ,November 22,2020
 */
@Component
public class AccountRoleMappingService
    extends CommonRepository<AccountRoleMapping, AccountRoleMappingRepository> {
  private final QAccountRoleMapping Q = QAccountRoleMapping.accountRoleMapping;

  public AccountRoleMappingService(AccountRoleMappingRepository repo) {
    super(repo);
  }

  public List<Long> fetchRoleIdByAccount(Long accountId) {
    JPAQuery<AccountRoleMapping> query = new JPAQuery<>(em);
    return query.select(Q.roleId).from(Q).where(Q.accountId.eq(accountId)).fetch();
  }
}
