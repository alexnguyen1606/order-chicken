package com.order.mapper;

import com.order.dto.AccountDTO;
import com.order.entities.Account;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 10:58 PM ,November 24,2020
 */
@Mapper
@Component
public interface AccountMapper extends CommonMapper<Account, AccountDTO> {
}
