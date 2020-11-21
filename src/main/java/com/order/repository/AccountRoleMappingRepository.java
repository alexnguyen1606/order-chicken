package com.order.repository;

import com.order.entities.AccountRoleMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 1:02 AM ,November 22,2020
 */
public interface AccountRoleMappingRepository extends JpaRepository<AccountRoleMapping,Long> , QuerydslPredicateExecutor<AccountRoleMapping> {


}
