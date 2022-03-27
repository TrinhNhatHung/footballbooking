package com.footballbooking.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Table(name = "booking_status")
@Entity(name = "booking_status")
public class BookingStatus {

	@EmbeddedId
	private Id bookingStatusId;

	@Column(name = "create_at")
	@CreationTimestamp
	private LocalDateTime createAt;

	public BookingStatus() {
		super();
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("statusId")
	@JoinColumn(name = "status_id", referencedColumnName = "status_id")
	private Status status;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("bookingId")
	@JoinColumn(name = "booking_id", referencedColumnName = "booking_id")
	private Booking booking;

	public Id getBookingStatusId() {
		return bookingStatusId;
	}

	public void setBookingStatusId(Id bookingStatusId) {
		this.bookingStatusId = bookingStatusId;
	}

	public LocalDateTime getCreateAt() {
		return createAt;
	}

	public void setCreateAt(LocalDateTime createAt) {
		this.createAt = createAt;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Booking getBooking() {
		return booking;
	}

	public void setBooking(Booking booking) {
		this.booking = booking;
	}

	public static class Id implements Serializable {

		private static final long serialVersionUID = 4648729234954997773L;

		@Column(name = "booking_id")
		private Integer bookingId;

		@Column(name = "status_id")
		private Integer statusId;

		public Id() {
			super();
		}

		public Id(Integer bookingId, Integer statusId) {
			super();
			this.bookingId = bookingId;
			this.statusId = statusId;
		}

		public Integer getBookingId() {
			return bookingId;
		}

		public void setBookingId(Integer bookingId) {
			this.bookingId = bookingId;
		}

		public Integer getStatusId() {
			return statusId;
		}

		public void setStatusId(Integer statusId) {
			this.statusId = statusId;
		}

	}
}
