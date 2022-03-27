package com.footballbooking.dao;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.footballbooking.entity.User;

@Repository
public class UserDao extends EntityDao<User> {
	
	private static final String GET_BY_PHONE = "SELECT * FROM user WHERE phone = :phone";

	public void insert(User user) {
		super.insert(user);
	}
	
	public User getById(Integer userId) {
		return super.getById(User.class, userId);
	}
	
	public User getByPhone (String phone) {
		NativeQuery<User> query = openSession().createNativeQuery(GET_BY_PHONE, User.class);
		query.setParameter("phone", phone);
		return query.uniqueResult();
	}

}
