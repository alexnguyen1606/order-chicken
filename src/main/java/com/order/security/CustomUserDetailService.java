package com.order.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class CustomUserDetailService implements UserDetailsService {



    protected UserModel loadUserByApi(String userName, Integer status) {
        UserModel userModel = new UserModel();
        return userModel;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userEntity = loadUserByApi(username, 1);

        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (String userPermistion : userEntity.getPermissionNames()) {

            authorities.add(new SimpleGrantedAuthority(userPermistion));
        }

        MyUser myUser = new MyUser(userEntity.getUsername(), userEntity.getPassword(), true, true, true, true,
                authorities);
        myUser.setFullName(userEntity.getFullName());
        myUser.setId(userEntity.getId() + "");

        return myUser;

    }
}
