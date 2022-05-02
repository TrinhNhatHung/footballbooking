package com.footballbooking.response;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.footballbooking.entity.MiniPitch;
import com.footballbooking.entity.Pitch;
import com.footballbooking.entity.PitchDetail;

@Component
public class MiniPitchResponse {
	
	@Autowired
	private ObjectMapper mapper;
	
	public JsonNode createMiniPitchInfo (MiniPitch miniPitch) {
		ObjectNode result  = mapper.createObjectNode();
		result.set("miniPitchName", mapper.convertValue(miniPitch.getName(), JsonNode.class ));
		result.set("pitchName", mapper.convertValue(miniPitch.getPitch().getName(), JsonNode.class ));
		result.set("pitchType", mapper.convertValue(miniPitch.getPitchType().getName(), JsonNode.class ));
		return result;
	}
	
	public JsonNode createMiniPitchFullInfo (MiniPitch miniPitch, LocalDate bookingDate, LocalTime hourStart) {
		ObjectNode result  = mapper.createObjectNode();
		result.set("miniPitchName", mapper.convertValue(miniPitch.getName(), JsonNode.class ));
		result.set("pitchName", mapper.convertValue(miniPitch.getPitch().getName(), JsonNode.class ));
		result.set("pitchTypeName", mapper.convertValue(miniPitch.getPitchType().getName(), JsonNode.class ));
		int dayOfWeek = bookingDate.getDayOfWeek().getValue();
		Pitch pitch = miniPitch.getPitch();
	    PitchDetail pitchDetail = pitch.getPitchDetails().stream()
			.filter(p -> p.getDayOfWeekStart() <= (dayOfWeek) 
					      && p.getDayOfWeekEnd() >= (dayOfWeek)
					      && !p.getTimeStart().isAfter(hourStart)
					      && !p.getTimeEnd().isBefore(hourStart)
					      ).collect(Collectors.toList()).get(0);
	    result.set("cost", mapper.convertValue(pitchDetail.getCost(), JsonNode.class ));
		return result;
	}
}
