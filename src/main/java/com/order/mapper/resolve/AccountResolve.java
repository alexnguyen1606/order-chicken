package com.order.mapper.resolve;

import com.order.dto.AccountDTO;
import com.order.dto.DishDTO;
import com.order.entities.Account;
import com.order.entities.Dish;
import com.order.entities.User;
import com.order.mapper.UserMapper;
import com.order.service.UserService;
import lombok.AllArgsConstructor;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
public class AccountResolve {
    private UserService userService;
    private UserMapper userMapper;
    @ObjectFactory
    public AccountDTO revolve(Account account, @TargetType Class<AccountDTO> type) {
        AccountDTO result = new AccountDTO();
        User user = userService.findByAccountId(account.getId());
        if (user != null) {
            result.setUser(userMapper.toDTO(user));
        }
        result.setPassword("");
        return result;
    }
}
