package com.order.service;

import com.order.entities.Permission;
import com.order.entities.QPermission;
import com.order.entities.QRolePermissionMapping;
import com.order.entities.RolePermissionMapping;
import com.order.repository.PermissionRepository;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author:Nguyen Anh Tuan
 *     <p>10:08 AM ,December 17,2020
 */
@Service
public class PermissionService extends CommonRepository<Permission, Long, PermissionRepository> {
  public PermissionService(PermissionRepository repo) {
    super(repo);
  }



  public List<String> getLink(List<Long> roleIds) {
    return repo.getLink(roleIds);
  }
  
  public List<Permission> getByLinkAndMethod(String link, String method) {
    return repo.getByLinkAndMethod(link, method);
  }
}
