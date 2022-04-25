package com.footballbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.footballbooking.dao.BookingStatusDao;
import com.footballbooking.entity.BookingStatus;

@Service
public class BookingStatusService {
	
	@Autowired
	private BookingStatusDao bookingStatusDao;
	
	@Transactional
	public void insert (BookingStatus bookingStatus) {
		bookingStatusDao.insert(bookingStatus);
	}
}
