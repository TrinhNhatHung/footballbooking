package com.footballbooking.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Table(name = "booking")
@Entity(name = "booking")
public class Booking {

	@Id
	@Column(name = "booking_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer bookingId;

	@Column(name = "hour_start")
	private LocalTime hourStart;

	@Column(name = "hour_end")
	private LocalTime hourEnd;

	@Column(name = "booking_date")
	private LocalDate bookingDate;

	@Column(name = "minipitch_id")
	private Integer miniPitchId;

	@Column(name = "user_id")
	private Integer userId;

	@Column(name = "message")
	private String message;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "booking", cascade = CascadeType.ALL)
	private List<BookingStatus> bookingStatuses;

	public Booking() {
		super();
	}

	public Integer getBookingId() {
		return bookingId;
	}

	public void setBookingId(Integer bookingId) {
		this.bookingId = bookingId;
	}

	public LocalTime getHourStart() {
		return hourStart;
	}

	public void setHourStart(LocalTime hourStart) {
		this.hourStart = hourStart;
	}

	public LocalTime getHourEnd() {
		return hourEnd;
	}

	public void setHourEnd(LocalTime hourEnd) {
		this.hourEnd = hourEnd;
	}

	public LocalDate getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDate bookingDate) {
		this.bookingDate = bookingDate;
	}

	public Integer getMiniPitchId() {
		return miniPitchId;
	}

	public void setMiniPitchId(Integer miniPitchId) {
		this.miniPitchId = miniPitchId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public List<BookingStatus> getBookingStatuses() {
		return bookingStatuses;
	}

	public void setBookingStatuses(List<BookingStatus> bookingStatuses) {
		this.bookingStatuses = bookingStatuses;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
