package com.order.security;

import com.order.entities.Account;
import com.order.entities.User;
import com.order.service.AccountRoleMappingService;
import com.order.service.AccountService;
import com.order.service.RoleService;
import com.order.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CustomUserDetailService implements AuthenticationProvider {

  private AccountService accountService;
  private UserService userService;
  private RoleService roleService;
  private AccountRoleMappingService accountRoleMappingService;
  private PasswordEncoder passwordEncoder;

  //  @Override
  //  public UserDetails loadUserByUsername(String username)  {
  //    Account account = accountService.findByUsernameAndStatus(username, 1);
  //    if (account == null) {
  //      throw new AuthenticationServiceException("Thông tin tài khoản không đúng");
  //    }
  //    String password = (String)
  // SecurityContextHolder.getContext().getAuthentication().getCredentials();
  //    String salt = account.getSalt();
  //    if (!passwordEncoder.matches(password+salt,account.getPassword())){
  //      throw new AuthenticationServiceException("Tài khoản hoặc mật khẩu không chính xác");
  //    }
  //    List<GrantedAuthority> authorities = fetchRole(account.getId());
  //    MyUser myUser =
  //        new MyUser(
  //            account.getUserName(), account.getPassword(), true, true, true, true, authorities);
  //    myUser.setId(account.getId());
  //    User user = userService.findByAccountId(account.getId());
  //    if (user != null) {
  //      myUser.setFullName(user.getName());
  //    }
  //    return myUser;
  //  }

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

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    String username = authentication.getName();
    Account account = accountService.findByUsernameAndStatus(username, 1);
    if (account == null) {
      throw new AuthenticationServiceException("Thông tin tài khoản không đúng");
    }
    String password = (String) authentication.getCredentials();
    String salt = account.getSalt();
    if (!passwordEncoder.matches(password + salt, account.getPassword())) {
      throw new AuthenticationServiceException("Tài khoản hoặc mật khẩu không chính xác");
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
    return new UsernamePasswordAuthenticationToken(myUser,passwordEncoder.encode(password+salt), authorities);
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
  }
}
