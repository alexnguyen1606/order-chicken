package com.order.config;

import com.order.security.FilterPostProcessorSecurity;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;

/**
 * @author:Nguyen Anh Tuan
 *     <p>11:39 AM ,December 15,2020
 */
@Configuration
@AllArgsConstructor
public class BeanConfig {
  private final AccessDecisionManager accessDecisionManager;
  private final FilterInvocationSecurityMetadataSource newSource;

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public ObjectPostProcessor<FilterSecurityInterceptor> objectPostProcessor(){
    return new FilterPostProcessorSecurity(accessDecisionManager,newSource);
  }
  
}
