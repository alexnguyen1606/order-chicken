package com.order.repository;

import com.order.entities.AccountRoleMapping;
import com.order.repository.custom.AccountRoleMappingCustomRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface AccountRoleMappingRepository extends JpaRepository<AccountRoleMapping,Long> , QuerydslPredicateExecutor<AccountRoleMapping>,
        AccountRoleMappingCustomRepo {


}
