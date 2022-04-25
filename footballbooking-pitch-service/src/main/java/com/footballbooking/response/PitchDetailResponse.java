package com.footballbooking.response;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.footballbooking.entity.MiniPitch;
import com.footballbooking.entity.PitchDetail;

@Component
public class PitchDetailResponse {
	
	@Autowired
	private ObjectMapper mapper;
	
	public JsonNode responsePitchDetailList (List<PitchDetail> pitchDetails) {
		ObjectNode pitchDetailData = mapper.createObjectNode();
		Optional<LocalTime> timeStart = pitchDetails.stream().map(p-> p.getTimeStart()).min((t1,t2) -> t1.isBefore(t2) ? -1 : 1);
		Optional<LocalTime> timeEnd = pitchDetails.stream().map(p-> p.getTimeEnd()).max((t1,t2) -> t1.isBefore(t2) ? -1 : 1);
		pitchDetailData.set("timeStart", mapper.convertValue(timeStart.orElse(null), JsonNode.class));
		pitchDetailData.set("timeEnd", mapper.convertValue(timeEnd.orElse(null), JsonNode.class));
		try {
			int pitchTypeId = pitchDetails.get(0).getPitchType().getPitchTypeId();

			int[] miniPitchIds = pitchDetails.get(0).getPitch().getMiniPitchs().stream()
									.filter(miniPitch -> miniPitch.getPitchType().getPitchTypeId().equals(pitchTypeId))
									.mapToInt(MiniPitch::getMiniPitchId).toArray();
			pitchDetailData.set("miniPitchs", mapper.convertValue(miniPitchIds, ArrayNode.class));
		} catch (Exception e) {
			pitchDetailData.set("miniPitchs", mapper.convertValue(new ArrayList<Integer>(), ArrayNode.class));
		}
		
		return pitchDetailData;
	}
	
}
