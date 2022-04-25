package com.footballbooking.dao;

import org.springframework.stereotype.Repository;

import com.footballbooking.entity.BookingStatus;

@Repository
public class BookingStatusDao extends EntityDao<BookingStatus>{
	
	public void insert (BookingStatus bookingStatus) {
		super.insert(bookingStatus);
	}
}
