package com.footballbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.footballbooking.dao.RoleDao;
import com.footballbooking.entity.Role;

@Service
public class RoleService {
	
	@Autowired
	private RoleDao roleDao;
	
	public Role getByRoleName (String roleName) {
		return roleDao.getByRoleName(roleName);
	}
}
