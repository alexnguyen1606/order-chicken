package com.order.service;

import com.order.entities.RolePermissionMapping;
import com.order.repository.RolePermissionRepository;
import org.springframework.stereotype.Service;

/**
 * @author:Nguyen Anh Tuan
 *     <p>10:08 AM ,December 17,2020
 */
@Service
public class RolePermissionService
    extends CommonRepository<RolePermissionMapping, Long, RolePermissionRepository> {
  public RolePermissionService(RolePermissionRepository repo) {
    super(repo);
  }
}
