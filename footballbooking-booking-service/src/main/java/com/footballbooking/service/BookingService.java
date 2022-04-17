package com.footballbooking.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.footballbooking.dao.BookingDao;
import com.footballbooking.entity.Booking;

@Service
public class BookingService {
	
	@Autowired
	private BookingDao bookingDao;
	
	public List<Integer> getNotBookedMiniPitch (List<Integer> miniPitchIds, LocalDate bookingDate, LocalTime timeSlot) {
		List<Integer> miniPitchIdsClone = new ArrayList<>();
		for (Integer id : miniPitchIds) {
			miniPitchIdsClone.add(id);
		}
		
		List<Booking> bookings = bookingDao.getBookingByBookingDataAndHour(bookingDate, timeSlot);
		List<Integer> bookedMiniPitchId = bookings.stream().map(Booking::getMiniPitchId).collect(Collectors.toList());
		miniPitchIdsClone.removeAll(bookedMiniPitchId);
		return miniPitchIdsClone;
	}
	
	public boolean checkBookedMiniPitchByBookingDateAndTime(int miniPitchId, LocalDate bookingDate, LocalTime hourStart) {
		return bookingDao.checkBookedMiniPitchByBookingDateAndTime(miniPitchId, bookingDate, hourStart);
	}
	
	@Transactional
	public void insert (Booking booking) {
		bookingDao.insert(booking);
	}
	
	public List<Booking> getWaitingBooking (List<Integer> miniPitchIds){
		return bookingDao.getWaitingBooking(miniPitchIds);
	}
}
