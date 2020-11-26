package com.order.processor.account;

import com.order.dto.AccountDTO;
import com.order.dto.UserDTO;
import com.order.entities.Account;
import com.order.entities.QAccount;
import com.order.entities.QUser;
import com.order.entities.User;
import com.order.mapper.AccountMapper;
import com.order.mapper.UserMapper;
import com.order.service.AccountService;
import com.order.service.UserService;
import com.querydsl.core.BooleanBuilder;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class AccountProcessor {
    private final QAccount qAccount = QAccount.account;
    private final QUser qUser = QUser.user;
    private AccountService accountService;
    private UserService userService;
    private AccountMapper accountMapper;
    private UserMapper userMapper;
    private PasswordEncoder passwordEncoder;


    private BooleanBuilder commonBuilder(AccountDTO accountDTO) {
        BooleanBuilder result = new BooleanBuilder();
//        result.and(qAccount.status.eq(1));
        if (accountDTO.getSearch() != null) {
            List<Long> idAccountContainFullName = userService.findAllAccountIdBySearch(accountDTO.getSearch());
            result.and(qAccount.userName.containsIgnoreCase(accountDTO.getSearch()).or(qAccount.id.in(idAccountContainFullName)));
        }
        return result;
    }

    public Long countAll(AccountDTO accountDTO) {
        BooleanBuilder builder = commonBuilder(accountDTO);
        return accountService.count(builder);
    }

    public List<AccountDTO> findAll(AccountDTO accountDTO, Pageable pageable) {
        BooleanBuilder builder = commonBuilder(accountDTO);

        return accountService.findAll(builder, pageable).stream().map(accountMapper::toDTO).collect(Collectors.toList());
    }

    public void createAccount(AccountDTO accountDTO) {
        Account account = accountMapper.toEntity(accountDTO);
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        account = accountService.save(account);

        User user = userMapper.toEntity(accountDTO.getUser());
        user.setIdAccount(account.getId());
        userService.save(user);
    }

    public void updateAccount(AccountDTO accountDTO) throws Exception {
        if (accountDTO.getId() == null) throw new Exception("No Account ID");
        Optional<Account> optionalAccount = accountService.findById(accountDTO.getId());
        if (!optionalAccount.isPresent()) throw new Exception("Wrong Account ID");
        Account account = optionalAccount.get();
        if (accountDTO.getStatus() != null) account.setStatus(accountDTO.getStatus());
        if (accountDTO.getPassword() != null) {
            if (!accountDTO.getPassword().isEmpty()) account.setPassword(passwordEncoder.encode(accountDTO.getPassword()));
        }
        accountService.save(account);
        updateUser(accountDTO.getUser());
    }
    public void updateUser(UserDTO userDTO) throws Exception {
        if (userDTO == null) return;
        User user = new User();
        if (userDTO.getId() != null) {
            Optional<User> optionalUser = userService.findById(userDTO.getId());
            if (!optionalUser.isPresent()) throw new Exception("Wrong User ID");
            user= optionalUser.get();
        }

        if (userDTO.getAddress() != null) user.setAddress(userDTO.getAddress());
        if (userDTO.getEmail() != null) user.setEmail(userDTO.getEmail());
        if (userDTO.getName() != null) user.setName(userDTO.getName());
        if (userDTO.getPhone() != null) user.setPhone(userDTO.getPhone());
        if (userDTO.getGender() != null) user.setGender(userDTO.getGender());
        userService.save(user);
    }
    public AccountDTO findById(Long id) {
        return accountMapper.toDTO(accountService.findById(id).get());
    }
}
