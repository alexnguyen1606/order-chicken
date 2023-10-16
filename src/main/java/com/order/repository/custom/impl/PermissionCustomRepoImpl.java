package com.order.repository.custom.impl;

import com.order.entities.Permission;
import com.order.entities.QPermission;
import com.order.entities.QRolePermissionMapping;
import com.order.entities.RolePermissionMapping;
import com.order.repository.custom.PermissionCustomRepo;
import com.querydsl.jpa.impl.JPAQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PermissionCustomRepoImpl implements PermissionCustomRepo {

    private static final QPermission Q = QPermission.permission;
    private static final QRolePermissionMapping qRolePermissionMapping = QRolePermissionMapping.rolePermissionMapping;

    private final EntityManager em;

    @Override
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

    @Override
    public List<Permission> getByLinkAndMethod(String link, String method) {
        JPAQuery<Permission> query = new JPAQuery<>(em);
        return query.from(Q)
                .where(Q.link.eq(link).and(Q.method.eq(method)))
                .fetch();
    }
}
