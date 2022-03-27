package com.footballbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.footballbooking.dao.StatusDao;
import com.footballbooking.entity.Status;

@Service
public class StatusService {
	
	@Autowired
	private StatusDao statusDao;
	
	public Status getByStatusName (String statusName) {
		return statusDao.getByStatusName(statusName);
	}
}
