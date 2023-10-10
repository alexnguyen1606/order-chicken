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

  private final QPermission Q = QPermission.permission;
  private final QRolePermissionMapping qRolePermissionMapping =
      QRolePermissionMapping.rolePermissionMapping;

  public List<String> getLink(List<Long> roleIds) {
    JPAQuery<Permission> query = new JPAQuery<>(em);
    JPAQuery<RolePermissionMapping> query1 = new JPAQuery<>(em);
    return query
        .select(Q.link)
        .from(Q)
        .where(
            Q.id.in(
                query1
                    .select(qRolePermissionMapping.permisstionId)
                    .from(qRolePermissionMapping)
                    .where(qRolePermissionMapping.id.in(roleIds))))
        .fetch();
  }
  
  public List<Permission> findByLinkAndMetod(String link,String method){
    JPAQuery<Permission> query = new JPAQuery<>(em);
    return query.from(Q).where(Q.link.eq(link).and(Q.method.eq(method))).fetch();
  }
}
