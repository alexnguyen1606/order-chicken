package com.order.security;

import com.order.entities.Permission;
import com.order.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
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
  @Autowired private PermissionService permissionService;
  
  private final PathMatcher pathMatcher = new AntPathMatcher();

  @Override
  public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
    String url = ((FilterInvocation) object).getRequestUrl();
    String method = ((FilterInvocation) object).getRequest().getMethod();
    Map<String, List<ConfigAttribute>> resourceMap = loadResourceMatchAuthority(url, method);
    for (Map.Entry<String, List<ConfigAttribute>> resURL : resourceMap.entrySet()) {
      if (pathMatcher.match(resURL.getKey(), url)) {
        return resURL.getValue();
      }
    }
    return resourceMap.get(url);
  }

  private Map<String, List<ConfigAttribute>> loadResourceMatchAuthority(String url, String method) {
    Map<String, List<ConfigAttribute>> resourceMap = new HashMap<>();
    List<Permission> permissions = permissionService.getByLinkAndMethod(url,method);
    for (Permission permission : permissions){
      List<ConfigAttribute> configAttributes = new ArrayList<>();
      ConfigAttribute configAttribute = new SecurityConfig(permission.getLink());
      configAttributes.add(configAttribute);
      resourceMap.put(permission.getLink(),configAttributes);
    }
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
