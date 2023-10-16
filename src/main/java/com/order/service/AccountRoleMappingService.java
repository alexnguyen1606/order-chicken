package com.order.service;

import com.order.entities.AccountRoleMapping;
import com.order.entities.QAccountRoleMapping;
import com.order.repository.AccountRoleMappingRepository;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AccountRoleMappingService
    extends CommonRepository<AccountRoleMapping,Long, AccountRoleMappingRepository> {

  public AccountRoleMappingService(AccountRoleMappingRepository repo) {
    super(repo);
  }

  public List<Long> fetchRoleIdByAccount(Long accountId) {
    return repo.fetchRoleIdByAccount(accountId);
  }
}
