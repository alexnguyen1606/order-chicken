package com.order.security;

import com.order.entities.Account;
import com.order.entities.User;
import com.order.service.AccountRoleMappingService;
import com.order.service.AccountService;
import com.order.service.RoleService;
import com.order.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

  private AccountService accountService;
  private UserService userService;
  private RoleService roleService;
  private AccountRoleMappingService accountRoleMappingService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Account account = accountService.findByUsernameAndStatus(username, 1);
    if (account == null) {
      throw new UsernameNotFoundException("Thông tin tài khoản không đúng");
    }
    List<GrantedAuthority> authorities = fetchRole(account.getId());

    MyUser myUser =
        new MyUser(
            account.getUserName(), account.getPassword(), true, true, true, true, authorities);
    myUser.setId(account.getId());
    User user = userService.findByAccountId(account.getId());
    if (user != null) {
      myUser.setFullName(user.getName());
    }
    return myUser;
  }

  private List<GrantedAuthority> fetchRole(Long accountId) {
    List<Long> roleIds = accountRoleMappingService.fetchRoleIdByAccount(accountId);
    List<String> roles = roleService.fetchRoleCodeByIds(roleIds);
    List<GrantedAuthority> authorities = new ArrayList<>(roleIds.size());
    for (String role : roles) {
      GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role);
      authorities.add(grantedAuthority);
    }
    return authorities;
  }
}
