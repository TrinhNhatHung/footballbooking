package com.footballbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.footballbooking.dao.UserDao;
import com.footballbooking.entity.User;

@Service
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Transactional
	public void insert(User user) {
		userDao.insert(user);
	}
	
	public User getByPhone (String phone) {
		return userDao.getByPhone(phone);
	}
	
	public User getById (Integer userId) {
		return userDao.getById(userId);
	}
}
