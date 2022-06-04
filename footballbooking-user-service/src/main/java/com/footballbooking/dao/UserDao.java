package com.footballbooking.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.footballbooking.constant.RoleConst;
import com.footballbooking.entity.Role;
import com.footballbooking.entity.User;

@Repository
public class UserDao extends EntityDao<User> {

	private static final String GET_BY_PHONE = "SELECT * FROM user WHERE phone = :phone";

	@Autowired
	private RoleDao roleDao;

	public void insert(User user) {
		super.insert(user);
	}
	
	public void update (User user) {
		String sql = "UPDATE user SET fullname = :fullname, email = :email, password = :password WHERE user_id = :userId";
		NativeQuery<User> query = getCurrentSession().createNativeQuery(sql, User.class);
		User currentUser = getById(user.getUserId());
		if (user.getFullname() == null) {
			query.setParameter("fullname", currentUser.getFullname());
		} else {
			query.setParameter("fullname", user.getFullname());
		}
		
		if (user.getEmail() == null) {
			query.setParameter("email", currentUser.getEmail());
		} else {
			query.setParameter("email", user.getEmail());
		}
		
		if (user.getPassword() == null) {
			query.setParameter("password", currentUser.getPassword());
		} else {
			query.setParameter("password", user.getPassword());
		}
		query.setParameter("userId", user.getUserId());
		query.executeUpdate();
	}

	public User getById(Integer userId) {
		return super.getById(User.class, userId);
	}

	public User getByPhone(String phone) {
		NativeQuery<User> query = openSession().createNativeQuery(GET_BY_PHONE, User.class);
		query.setParameter("phone", phone);
		return query.uniqueResult();
	}

	public User getByPhoneAndPassword(String phone, String password) {
		String sql = "SELECT * FROM user WHERE phone = :phone AND password = :password";
		NativeQuery<User> query = openSession().createNativeQuery(sql, User.class);
		query.setParameter("phone", phone).setParameter("password", password);
		return query.uniqueResult();
	}

	public List<User> getAllCustomerAndPitchOwner(Integer page, Integer limit, String searchByPhone, Integer roleId) {
		List<Integer> roleIdList = new ArrayList<Integer>();
		if (roleId == null) {
			Role customerRole = roleDao.getByRoleName(RoleConst.ROLE_CUSTOMER);
			Role pitchOwnerRole = roleDao.getByRoleName(RoleConst.ROLE_PITCHOWNER);
			roleIdList.add(customerRole.getRoleId());
			roleIdList.add(pitchOwnerRole.getRoleId());
		} else {
			roleIdList.add(roleId);
		}
		String sql = "SELECT * FROM user WHERE role_id IN (:roleIdList) AND (phone LIKE :searhByNameOrPhone OR fullname LIKE :searhByNameOrPhone)";
		NativeQuery<User> query = openSession().createNativeQuery(sql, User.class)
				.setParameterList("roleIdList", roleIdList).setParameter("searhByNameOrPhone","%" + searchByPhone + "%");
		if (page != null) {
			query.setMaxResults(limit).setFirstResult((page - 1) * limit);
		}
		return query.getResultList();
	}

	public void toggleStatus(int userId) {
		User user = super.getById(User.class, userId);
		String sql = "UPDATE user SET status = :status WHERE user_id = :userId";
		NativeQuery<User> query = getCurrentSession().createNativeQuery(sql, User.class)
				.setParameter("status", !user.getStatus()).setParameter("userId", userId);
		query.executeUpdate();
	}
}
