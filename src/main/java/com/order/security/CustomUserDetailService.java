package com.order.security;

import com.order.entities.Account;
import com.order.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private AccountRepository accountRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account  = accountRepository.findByUserNameAndStatus(username,1);
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
       
        MyUser myUser = new MyUser(account.getUserName(), account.getPassword(), true, true, true, true,
                authorities);
   
        myUser.setId(account.getId());

        return myUser;

    }
}
