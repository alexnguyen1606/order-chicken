package com.order.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author:Nguyen Anh Tuan
 *     <p>4:20 PM ,December 07,2020
 */
@Component
public class CustomFailHandler extends SimpleUrlAuthenticationFailureHandler {
  private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
  
  public void onAuthenticationFailure(
      HttpServletRequest request, HttpServletResponse response, AuthenticationException e)
      throws IOException, ServletException {
    System.out.println(e.getMessage());
    redirectStrategy.sendRedirect(request, response, "/login?message=" + e.getMessage());
  }
}
