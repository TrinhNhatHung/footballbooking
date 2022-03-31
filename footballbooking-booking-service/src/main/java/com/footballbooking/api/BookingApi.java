package com.footballbooking.api;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.footballbooking.constant.Constant;
import com.footballbooking.constant.MessageConst;
import com.footballbooking.entity.Booking;
import com.footballbooking.entity.BookingStatus;
import com.footballbooking.entity.BookingStatus.Id;
import com.footballbooking.entity.Status;
import com.footballbooking.response.BookingResponse;
import com.footballbooking.service.BookingService;
import com.footballbooking.service.StatusService;
import com.footballbooking.util.DateUtil;
import com.footballbooking.util.ResponseUtil;
import com.footballbooking.util.RestTemplateUtil;

@RestController
@CrossOrigin
public class BookingApi {

	@Autowired
	private RestTemplateUtil restTemplateUtil;

	@Autowired
	private BookingResponse bookingResponse;

	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private StatusService statusService;

	@Autowired
	private Environment env;

	@GetMapping("/getFreeTimeSlot")
	public ResponseEntity<?> getFreeTimeSlot(@RequestParam(name = "bookingDate") String bookingDate,
			@RequestParam(name = "pitchId") String pitchId, @RequestParam(name = "pitchTypeId") String pitchTypeId) {

		LocalDate bookingDateLocalDate = DateUtil.convertStringToLocalDate(bookingDate, "yyyy/MM/dd");

		HttpHeaders headers = new HttpHeaders();
		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
		formData.add("bookingDate", bookingDate);
		formData.add("pitchTypeId", pitchTypeId);
		formData.add("pitchId", pitchId);
		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(formData, headers);

		Map<String, Object> result = new HashMap<String, Object>();
		try {
			JsonNode pictDetailData = restTemplateUtil
					.postObjectNode(env.getProperty("PITCH_SERVICE_GET_INFO_PITCH_DETAIL"), request);
			JsonNode freeTimeSlotData = bookingResponse.getFreeTimeSlot(pictDetailData, bookingDateLocalDate);
			result = ResponseUtil.createResponse(true, freeTimeSlotData, MessageConst.GET_FREE_TIME_SLOT_SUCCESS);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, MessageConst.GET_FREE_TIME_SLOT_ERROR);
		}
		return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
	}

	@PostMapping("/book")
	public ResponseEntity<?> booking(
					@RequestParam(name = "hourStart") String hourStartStr,
					@RequestParam(name = "bookingDate") String bookingDateStr,
					@RequestParam(name = "miniPitchId") Integer miniPitchId,
					@RequestParam(name = "userId") Integer userId
					) {
		
		LocalTime hourStart = DateUtil.convertStringToLocalTime(hourStartStr, "HH:mm");
		LocalDate bookingDate = DateUtil.convertStringToLocalDate(bookingDateStr, "yyyy/MM/dd");
		
		Booking booking = new Booking();
		booking.setHourStart(hourStart);
		booking.setHourEnd(booking.getHourStart().plusHours(Constant.DURATION_PER_MATCH));
		booking.setBookingDate(bookingDate);
		booking.setMiniPitchId(miniPitchId);
		booking.setUserId(userId);
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			boolean checkBookedMiniPitch = bookingService.checkBookedMiniPitchByBookingDateAndTime(miniPitchId, bookingDate, hourStart);
			if (checkBookedMiniPitch) {
				result = ResponseUtil.createResponse(false, null, MessageConst.BOOKING_PITCH_BOOKED);
				return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
			}
			
			Status status = statusService.getByStatusName("Chờ xác nhận");
			BookingStatus bookingStatus = new BookingStatus();
			Id id = new Id(booking.getBookingId(), status.getStatusId());
			bookingStatus.setBookingStatusId(id);
			bookingStatus.setBooking(booking);
			bookingStatus.setStatus(status);
			booking.setBookingStatuses(Arrays.asList(bookingStatus));
			bookingService.insert(booking);
			result = ResponseUtil.createResponse(true, null, MessageConst.BOOKING_SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, MessageConst.BOOKING_ERROR);
		}
		return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
	}
}
