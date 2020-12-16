package com.order.security;

import com.order.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;

import java.util.*;

/**
 * @author:Nguyen Anh Tuan
 *     <p>8:40 AM ,December 16,2020
 */
@Component
public class CustomMetadataSource implements FilterInvocationSecurityMetadataSource {
  @Autowired private RoleService roleService;

  private Map<String, List<ConfigAttribute>> resourceMap = new HashMap<>();
  private PathMatcher pathMatcher = new AntPathMatcher();

  @Override
  public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
    String url = ((FilterInvocation) object).getRequestUrl();
    String method = ((FilterInvocation) object).getRequest().getMethod();
    resourceMap = loadResourceMatchAuthority(url, method);
    for (Map.Entry<String, List<ConfigAttribute>> resURL : resourceMap.entrySet()) {
      if (pathMatcher.match(resURL.getKey(), url)) {
        return resURL.getValue();
      }
    }
    return resourceMap.get(url);
  }

  private Map<String, List<ConfigAttribute>> loadResourceMatchAuthority(String url, String method) {
    Map<String, List<ConfigAttribute>> resourceMap = new HashMap<>();

    return resourceMap;
  }

  @Override
  public Collection<ConfigAttribute> getAllConfigAttributes() {
    return Collections.emptyList();
  }

  @Override
  public boolean supports(Class<?> aClass) {
    return FilterInvocation.class.isAssignableFrom(aClass);
  }
}
