package com.order.security;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  private CustomSuccessHandler customSuccessHandler;
  private CustomUserDetailService customUserDetailsService;
  private CustomFailHandler customFailHandler;
  private PasswordEncoder passwordEncoder;

  //  @Bean
  //  public HttpSessionEventPublisher httpSessionEventPublisher() {
  //    return new HttpSessionEventPublisher();
  //  }

  @Bean
  public AuthenticationSuccessHandler myAuthenticationSuccessHandler() {
    return customSuccessHandler;
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder managerBuilder) throws Exception {
    managerBuilder.authenticationProvider(customUserDetailsService);
  }

  protected void configure(HttpSecurity http) throws Exception {

    http.csrf().disable();
    http.authorizeRequests().antMatchers("/").permitAll();
    http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/account").permitAll();
    http.authorizeRequests().antMatchers("/api/**").permitAll();
    http.authorizeRequests().antMatchers("/admin/**").hasAuthority("ADMIN");
    http.authorizeRequests().antMatchers("/**").authenticated();

    http.authorizeRequests()
        .and()
        .formLogin()
        .loginPage("/login")
        .usernameParameter("username")
        .passwordParameter("password")
        .loginProcessingUrl("/j_spring_security")
        .successHandler(customSuccessHandler)
        .failureHandler(customFailHandler)
        .permitAll();
    http.authorizeRequests()
        .and()
        .logout()
        .logoutUrl("/logout")
        .logoutSuccessUrl("/login")
        .invalidateHttpSession(true)
        .and();
  }

  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring()
        .antMatchers(
            "/admin/image/**",
            "/admin/template/**",
            "/admin/plugins/**",
            "/admin/css/**",
            "/customer/**",
            "/admin/js/**");
  }
}
