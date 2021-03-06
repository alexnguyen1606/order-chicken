package com.order.repository;

import com.order.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface RoleRepository  extends JpaRepository<Role,Long>, QuerydslPredicateExecutor<Role> {
}
