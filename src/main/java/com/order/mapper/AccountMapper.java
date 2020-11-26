package com.order.mapper;

import com.order.dto.AccountDTO;
import com.order.entities.Account;
import com.order.mapper.resolve.AccountResolve;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(uses = AccountResolve.class)
public interface AccountMapper extends CommonMapper<Account, AccountDTO> {
}
