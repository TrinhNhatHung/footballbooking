package com.footballbooking.response;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.footballbooking.constant.Constant;
import com.footballbooking.service.BookingService;
import com.footballbooking.util.DateUtil;

@Component
public class BookingResponse {
	
	@Autowired
	private BookingService bookingService;
	
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
		
		LocalTime timeStart = DateUtil.convertStringToLocalTime(timeStartStr, "HH:mm:ss");
		LocalTime timeEnd = DateUtil.convertStringToLocalTime(timeEndStr, "HH:mm:ss");
		List<LocalTime> timeSlots = new ArrayList<>();
		int count = 0;
		while (timeStart.plusHours(count).isBefore(timeEnd)) {
			timeSlots.add(timeStart.plusHours(count));
			count++;
		}
		
		ArrayNode result = mapper.createArrayNode();
		
		for (LocalTime timeSlot :  timeSlots) {
			ObjectNode node = mapper.createObjectNode();
			List<Integer> notBookedMiniPitchId  = bookingService.getNotBookedMiniPitch(miniPitchIds, bookingDate, timeSlot);
			node.set("timeStart", mapper.convertValue(DateUtil.convertLocalTimeToString(timeSlot, "HH:mm"), JsonNode.class));
			node.set("timeEnd", mapper.convertValue(DateUtil.convertLocalTimeToString(timeSlot.plusHours(Constant.DURATION_PER_MATCH), "HH:mm"), JsonNode.class));
			node.set("miniPitchId", mapper.convertValue(notBookedMiniPitchId, ArrayNode.class));
			node.set("hasPitch", mapper.convertValue(notBookedMiniPitchId.size() > 0, JsonNode.class));
			result.add(node);
		}
		return result;
	}
}
