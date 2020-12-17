package com.order.service;

import com.order.entities.Permission;
import com.order.repository.PermissionRepository;

/**
 * @author:Nguyen Anh Tuan
 *     <p>10:08 AM ,December 17,2020
 */
public class PermissionService extends CommonRepository<Permission, Long, PermissionRepository> {
  public PermissionService(PermissionRepository repo) {
    super(repo);
  }
}
