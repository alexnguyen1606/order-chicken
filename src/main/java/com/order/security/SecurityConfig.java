package com.order.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired private CustomSuccessHandler customSuccessHandler;
  @Autowired private CustomUserDetailService customUserDetailsService;

  //  @Bean
  //  public HttpSessionEventPublisher httpSessionEventPublisher() {
  //    return new HttpSessionEventPublisher();
  //  }

  @Bean
  public AuthenticationSuccessHandler myAuthenticationSuccessHandler() {
    return customSuccessHandler;
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    return bCryptPasswordEncoder;
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder managerBuilder) throws Exception {
    managerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
  }

  protected void configure(HttpSecurity http) throws Exception {

    http.csrf().disable();
    http.authorizeRequests()
        .antMatchers("/**").permitAll();

    http.authorizeRequests()
        .and()
        .formLogin()
        .loginPage("/login")
        .usernameParameter("username")
        .passwordParameter("password")
        .loginProcessingUrl("/j_spring_security")
        .successHandler(customSuccessHandler)
        .failureUrl("/login?accessDenied=true")
        .permitAll();
    http.authorizeRequests()
        .and()
        .logout()
        .logoutUrl("/logout")
        .logoutSuccessUrl("/login")
        .invalidateHttpSession(true)
        .and()
        .exceptionHandling()
        .accessDeniedPage("/login");

  }


  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring()
        .antMatchers(
            "/image/**",
            "/template/**",
            "/plugins/**",
            "/css/**");
  }
}
