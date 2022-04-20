package com.footballbooking.dao;

import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.footballbooking.entity.Role;

@Repository
public class RoleDao extends EntityDao<Role>{
	
	public Role getByRoleName (String roleName) {
		String sql = "SELECT * FROM role WHERE role = :roleName";
		Session session = openSession();
		NativeQuery<Role> query = session.createNativeQuery(sql, Role.class)
						.setParameter("roleName", roleName);
		return query.uniqueResult();
	}
}
