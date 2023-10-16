package com.order.processor.account;

import com.order.dto.AccountDTO;
import com.order.dto.UserDTO;
import com.order.entities.Account;
import com.order.entities.QAccount;
import com.order.entities.User;
import com.order.mapper.AccountMapper;
import com.order.mapper.UserMapper;
import com.order.security.MyUser;
import com.order.service.AccountService;
import com.order.service.OrderService;
import com.order.service.UserService;
import com.querydsl.core.BooleanBuilder;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;
import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class AccountProcessor {
  private static final QAccount qAccount = QAccount.account;
  private static final ExecutorService threadPool = Executors.newFixedThreadPool(5);

  private AccountService accountService;
  private UserService userService;
  private AccountMapper accountMapper;
  private UserMapper userMapper;
  private PasswordEncoder passwordEncoder;
  private OrderService orderService;


  private BooleanBuilder commonBuilder(AccountDTO accountDTO) {
    BooleanBuilder result = new BooleanBuilder();
    //        result.and(qAccount.status.eq(1));
    if (accountDTO.getSearch() != null) {
      List<Long> idAccountContainFullName =
          userService.findAllAccountIdBySearch(accountDTO.getSearch());
      result.and(
          qAccount
              .userName
              .containsIgnoreCase(accountDTO.getSearch())
              .or(qAccount.id.in(idAccountContainFullName)));
    }
    return result;
  }

  public Long countAll(AccountDTO accountDTO) {
    BooleanBuilder builder = commonBuilder(accountDTO);
    return accountService.count(builder);
  }

  public List<AccountDTO> findAll(AccountDTO accountDTO, Pageable pageable) throws InterruptedException, ExecutionException {
    BooleanBuilder builder = commonBuilder(accountDTO);
    List<AccountDTO> result =
        accountService.findAll(builder, pageable).stream()
            .map(accountMapper::toDTO)
            .collect(Collectors.toList());
    if (!result.isEmpty()) {
      CompletableFuture.allOf(
              result.stream()
                      .map(account -> (Runnable)() -> account.setTotalPaid(orderService.totalPaidSuccess(account.getId())))
                      .map(runnable -> CompletableFuture.runAsync(runnable, threadPool))
                      .toArray(CompletableFuture[]::new))
              .get();
      }
    return result;
  }

  @Transactional
  public void createAccount(AccountDTO accountDTO) {
    String randomSalt = UUID.randomUUID().toString();
    Account account = Account.createAccount(accountDTO.getUserName(), passwordEncoder.encode(accountDTO.getPassword() + randomSalt), randomSalt);
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
    if (StringUtils.isNotBlank(accountDTO.getPassword())) {
      String randomSalt = UUID.randomUUID().toString();
      account.setSalt(randomSalt);
      account.setPassword(passwordEncoder.encode(accountDTO.getPassword()) + randomSalt);
    }
    accountService.save(account);
    accountDTO.getUser().setIdAccount(account.getId());
    updateUser(accountDTO.getUser());
  }

  public void updateUser(UserDTO userDTO) throws Exception {
    if (userDTO == null) return;
    User user = new User();
    if (userDTO.getId() != null) {
      Optional<User> optionalUser = userService.findById(userDTO.getId());
      if (!optionalUser.isPresent()) throw new Exception("Wrong User ID");
      user = optionalUser.get();
    }

    if (userDTO.getAddress() != null) user.setAddress(userDTO.getAddress());
    if (userDTO.getEmail() != null) user.setEmail(userDTO.getEmail());
    if (userDTO.getName() != null) user.setName(userDTO.getName());
    if (userDTO.getPhone() != null) user.setPhone(userDTO.getPhone());
    if (userDTO.getGender() != null) user.setGender(userDTO.getGender());
    if (userDTO.getIdAccount() != null) user.setIdAccount(userDTO.getIdAccount());
    userService.save(user);
  }

  public AccountDTO findById(Long id) {
    return accountMapper.toDTO(accountService.findById(id).get());
  }

  public AccountDTO getCurrentAccount() {
    MyUser myUsers = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return accountMapper.toDTO(accountService.findById(myUsers.getId()).get());
  }

  public void updatePassword(AccountDTO accountDTO) throws Exception {
    if (accountDTO.getId() == null) throw new Exception("No id");
    Account account = accountService.findById(accountDTO.getId()).get();
    boolean check =
        !passwordEncoder.matches(
            accountDTO.getOldPassword() + account.getSalt(), account.getPassword());
    if (check) throw new Exception("Mật khẩu xác nhận k chính xác");

    account.setPassword(passwordEncoder.encode(accountDTO.getPassword()+account.getSalt()));
    accountService.save(account);
  }
}
