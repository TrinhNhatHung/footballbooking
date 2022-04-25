package com.footballbooking.response;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.footballbooking.constant.Constant;
import com.footballbooking.entity.Booking;
import com.footballbooking.service.BookingService;
import com.footballbooking.util.DateUtil;
import com.footballbooking.util.RestTemplateUtil;

@Component
public class BookingResponse {
	
	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private RestTemplateUtil restTemplateUtil;
	
	@Autowired
	private Environment env;
	
	@Autowired
	private ObjectMapper mapper;
	
	public JsonNode getFreeTimeSlot (JsonNode pitchDetailData, LocalDate bookingDate) {
		String timeStartStr = pitchDetailData.path("timeStart").asText();
		String timeEndStr = pitchDetailData.path("timeEnd").asText();

		ArrayNode miniPitchsArrNode = (ArrayNode) pitchDetailData.path("miniPitchs");
		List<Integer> miniPitchIds = new ArrayList<>();
		for (JsonNode miniPitchNode: miniPitchsArrNode) { 
		  Integer miniPitchId = miniPitchNode.asInt();
		  miniPitchIds.add(miniPitchId);
		}
		ArrayNode result = mapper.createArrayNode();
		try {
			LocalTime timeStart = DateUtil.convertStringToLocalTime(timeStartStr, "HH:mm:ss");
			LocalTime timeEnd = DateUtil.convertStringToLocalTime(timeEndStr, "HH:mm:ss");
			List<LocalTime> timeSlots = new ArrayList<>();
			int count = 0;
			while (timeStart.plusHours(count).isBefore(timeEnd)) {
				timeSlots.add(timeStart.plusHours(count));
				count++;
			}
			
			
			
			for (LocalTime timeSlot :  timeSlots) {
				ObjectNode node = mapper.createObjectNode();
				List<Integer> notBookedMiniPitchId  = bookingService.getNotBookedMiniPitch(miniPitchIds, bookingDate, timeSlot);
				node.set("timeStart", mapper.convertValue(DateUtil.convertLocalTimeToString(timeSlot, "HH:mm"), JsonNode.class));
				node.set("timeEnd", mapper.convertValue(DateUtil.convertLocalTimeToString(timeSlot.plusHours(Constant.DURATION_PER_MATCH), "HH:mm"), JsonNode.class));
				node.set("miniPitchId", mapper.convertValue(notBookedMiniPitchId, ArrayNode.class));
				node.set("hasPitch", mapper.convertValue(notBookedMiniPitchId.size() > 0, JsonNode.class));
				result.add(node);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public ArrayNode waitingBooking (List<Booking> waitingBooking) throws JsonMappingException, JsonProcessingException {
		ArrayNode result = mapper.createArrayNode();
		for (Booking booking : waitingBooking) {
			ObjectNode waitingBookingNode = mapper.createObjectNode();
			waitingBookingNode.set("message", mapper.convertValue(booking.getMessage(), JsonNode.class));
			waitingBookingNode.set("hourStart", mapper.convertValue(DateUtil.convertLocalTimeToString(booking.getHourStart(), "HH:mm"), JsonNode.class));
			waitingBookingNode.set("hourEnd", mapper.convertValue(DateUtil.convertLocalTimeToString(booking.getHourEnd(), "HH:mm"), JsonNode.class));
			waitingBookingNode.set("bookingDate", mapper.convertValue(DateUtil.convertLocalDateToString(booking.getBookingDate(), "yyyy/MM/dd"), JsonNode.class));
			String userServiceGetUserById = env.getProperty("USER_SERVICE_GET_USER_BY_ID");
			userServiceGetUserById += booking.getUserId();
			JsonNode userData = restTemplateUtil.getObjectNode(userServiceGetUserById, null);
			waitingBookingNode.set("bookingUser", userData);
			
			String pitchServiceGetMiniPitchInfoUrl = env.getProperty("PITCH_SERVICE_GET_MINIPITCH_INFO");
			pitchServiceGetMiniPitchInfoUrl += booking.getMiniPitchId();
			JsonNode miniPitchData = restTemplateUtil.getObjectNode(pitchServiceGetMiniPitchInfoUrl, null);
			waitingBookingNode.set("miniPitch", miniPitchData);
			result.add(waitingBookingNode);
		}
		return result;
	}
}
