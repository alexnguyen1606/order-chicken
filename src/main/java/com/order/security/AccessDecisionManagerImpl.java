package com.order.security;

import com.order.service.RoleService;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.FilterInvocation;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Iterator;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author:Nguyen Anh Tuan
 *     <p>8:42 AM ,December 16,2020
 */
@Component
public class AccessDecisionManagerImpl implements AccessDecisionManager {

  @Override
  public void decide(
      Authentication authentication, Object o, Collection<ConfigAttribute> collection)
      throws AccessDeniedException, InsufficientAuthenticationException {
    if (collection==null){
      return;
    }

    Set<String> grantedAuthorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet());
    for (ConfigAttribute configAttribute : collection) {
      String functionId = configAttribute.getAttribute();
      if (grantedAuthorities.contains(functionId)) {
        return;
      }
    }
    throw new AuthenticationServiceException("Không có quyền đăng nhập");
  }

  @Override
  public boolean supports(ConfigAttribute configAttribute) {
    return false;
  }

  @Override
  public boolean supports(Class<?> aClass) {
    return false;
  }
}
