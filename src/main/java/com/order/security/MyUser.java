package com.order.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class MyUser extends User {

  private String fullName;
  private Long id;
  private String code;

  public MyUser(
      String username,
      String password,
      boolean enabled,
      boolean accountNonExpired,
      boolean credentialsNonExpired,
      boolean accountNonLocked,
      Collection<? extends GrantedAuthority> authorities) {
    super(
        username,
        password,
        enabled,
        accountNonExpired,
        credentialsNonExpired,
        accountNonLocked,
        authorities);
  }

  private MyUser(UserBuilder UserBuilder) {
    super(UserBuilder.username, UserBuilder.password, UserBuilder.enabled, UserBuilder.accountNonExpired, UserBuilder.credentialsNonExpired, UserBuilder.accountNonLocked, UserBuilder.authorities);
    this.fullName = UserBuilder.fullName;
    this.code = UserBuilder.code;
    this.id = UserBuilder.id;
  }

    public static UserBuilder userBuilder() {
    return new UserBuilder();
  }
  
  public static class UserBuilder {
    private String fullName;
    private Long id;
    private String code;
    private boolean enabled = true;
    private boolean accountNonExpired = true;
    private boolean credentialsNonExpired = true;
    private boolean accountNonLocked = true;
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;



    public UserBuilder setFullName(String fullName) {
      this.fullName = fullName;
      return this;
    }

    public UserBuilder setId(Long id) {
      this.id = id;
      return this;
    }

    public UserBuilder setCode(String code) {
      this.code = code;
      return this;
    }

    public UserBuilder setEnabled(boolean enabled) {
      this.enabled = enabled;
      return this;
    }

    public UserBuilder setAccountNonExpired(boolean accountNonExpired) {
      this.accountNonExpired = accountNonExpired;
      return this;
    }

    public UserBuilder setCredentialsNonExpired(boolean credentialsNonExpired) {
      this.credentialsNonExpired = credentialsNonExpired;
      return this;
    }

    public UserBuilder setAccountNonLocked(boolean accountNonLocked) {
      this.accountNonLocked = accountNonLocked;
      return this;
    }

    public UserBuilder setUsername(String username) {
      this.username = username;
      return this;
    }

    public UserBuilder setPassword(String password) {
      this.password = password;
      return this;
    }

    public UserBuilder setAuthorities(Collection<? extends GrantedAuthority> authorities) {
      this.authorities = authorities;
      return this;
    }
    
    public MyUser build() {
      return new MyUser(this);
    }
    
  }

}
