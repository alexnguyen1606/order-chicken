package com.order.security;

import com.order.entities.Account;
import com.order.entities.User;
import com.order.service.*;
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
public class CustomAuthenticationProvider implements AuthenticationProvider {

  private final AccountService accountService;
  private final UserService userService;
  private final RoleService roleService;
  private final AccountRoleMappingService accountRoleMappingService;
  private final PasswordEncoder passwordEncoder;
  private final PermissionService permissionService;

  private List<GrantedAuthority> fetchRole(Long accountId) {
    List<Long> roleIds = accountRoleMappingService.fetchRoleIdByAccount(accountId);
    List<String> roles = roleService.fetchRoleCodeByIds(roleIds);
    List<String> links = permissionService.getLink(roleIds);
    List<GrantedAuthority> authorities = new ArrayList<>(roleIds.size() + links.size());
    for (String role : roles) {
      GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role);
      authorities.add(grantedAuthority);
    }
    for (String link : links) {
      GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(link);
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
    User user = userService.findByAccountIdOrElseThrow(account.getId());

    MyUser myUser = MyUser.userBuilder()
            .setId(account.getId())
            .setFullName(user.getName())
            .setPassword(account.getPassword())
            .setAuthorities(authorities)
            .build();
    return new UsernamePasswordAuthenticationToken(
        myUser, passwordEncoder.encode(password + salt), authorities);
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
  }
}
