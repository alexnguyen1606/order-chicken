package com.order.service;

import com.order.entities.QRole;
import com.order.entities.Role;
import com.order.repository.RoleRepository;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService extends CommonRepository<Role, RoleRepository> {
  private final QRole Q = QRole.role;

  public RoleService(RoleRepository repo) {
    super(repo);
  }

  public List<String> fetchRoleCodeByIds(List<Long> ids) {
    JPAQuery<Role> query = new JPAQuery<>(em);
    return query.select(Q.code).from(Q).where(Q.id.in(ids)).fetch();
  }
}
