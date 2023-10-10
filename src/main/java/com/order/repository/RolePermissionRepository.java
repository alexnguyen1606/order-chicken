package com.order.repository;

import com.order.entities.RolePermissionMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

/**
 * @author:Nguyen Anh Tuan
 *     <p>10:06 AM ,December 17,2020
 */
public interface RolePermissionRepository
    extends JpaRepository<RolePermissionMapping, Long>,
        QuerydslPredicateExecutor<RolePermissionMapping> {}
