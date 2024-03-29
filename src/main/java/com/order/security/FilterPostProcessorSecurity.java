package com.order.security;

import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.stereotype.Component;

/**
 * @author:Nguyen Anh Tuan
 *     <p>8:37 AM ,December 16,2020
 */
@AllArgsConstructor
public class FilterPostProcessorSecurity implements ObjectPostProcessor<FilterSecurityInterceptor> {
  private final AccessDecisionManager accessDecisionManager;
  private final FilterInvocationSecurityMetadataSource newSource;

  @Override
  public <O extends FilterSecurityInterceptor> O postProcess(O fsi) {
    fsi.setAccessDecisionManager(accessDecisionManager);
    fsi.setSecurityMetadataSource(newSource);
    return fsi;
  }
}
