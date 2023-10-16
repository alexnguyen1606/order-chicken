package com.order.repository.custom;

import java.util.List;

public interface AccountRoleMappingCustomRepo {
    List<Long> fetchRoleIdByAccount(Long accountId);

}
