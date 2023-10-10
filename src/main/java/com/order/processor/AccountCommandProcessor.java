package com.order.processor;

import com.order.constant.SystemConstant;
import com.order.dto.AccountDTO;
import com.order.entities.Account;
import com.order.entities.User;
import com.order.mapper.AccountMapper;
import com.order.service.AccountService;
import com.order.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@AllArgsConstructor
public class AccountCommandProcessor {

    private AccountService accountService;

    private AccountMapper accountMapper;

    private PasswordEncoder passwordEncoder;

    private UserService userService;

    @Transactional
    public void createAccountAndUserInfo(AccountDTO accountDTO) throws Exception {
        if (!accountDTO.getPassword().equals(accountDTO.getRepeatPassword())) {
            throw new Exception("Password lặp lại không khớp");
        }
        if (accountService.exitsByUserName(accountDTO.getUserName())) {
            throw new Exception("Tài khoản đã tồn tại trong hệ thống");
        }
        String salt = UUID.randomUUID().toString();
        String passwordEncoded = passwordEncoder.encode(accountDTO.getPassword() + salt);
        Account account = Account.createAccount(accountDTO.getUserName(), passwordEncoded, salt);
        accountService.save(account);

        User user = User.createUser(account, accountDTO.getAddress(), accountDTO.getEmail(), accountDTO.getName());
        userService.save(user);
    }
}
