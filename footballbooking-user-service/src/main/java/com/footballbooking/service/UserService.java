package com.footballbooking.service;

import java.util.List;

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
	
	public User getByPhoneAndPassword (String phone, String password) {
		return userDao.getByPhoneAndPassword(phone, password);
	}
	
	public List<User> getAllCustomerAndPitchOwner (Integer page, Integer limit, String searchByPhone, Integer roleId) {
		return userDao.getAllCustomerAndPitchOwner(page, limit, searchByPhone, roleId);
	}
	
	@Transactional
	public void toggleStatus (int userId) {
		userDao.toggleStatus(userId);
	}
}
