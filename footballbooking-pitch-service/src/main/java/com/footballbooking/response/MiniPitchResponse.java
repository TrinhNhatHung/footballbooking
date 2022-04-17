package com.footballbooking.response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.footballbooking.entity.MiniPitch;

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
}
