package com.order.repository.custom;

import com.order.entities.Permission;

import java.util.List;

public interface PermissionCustomRepo {

    List<String> getLink(List<Long> roleIds);
    List<Permission> getByLinkAndMethod(String link, String method);
}
