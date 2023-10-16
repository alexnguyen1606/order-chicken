package com.order.repository;

import com.order.entities.Permission;
import com.order.repository.custom.PermissionCustomRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

/**
 * @author:Nguyen Anh Tuan
 *     <p>10:05 AM ,December 17,2020
 */
public interface PermissionRepository
    extends JpaRepository<Permission, Long>, QuerydslPredicateExecutor<Permission> , PermissionCustomRepo {}
