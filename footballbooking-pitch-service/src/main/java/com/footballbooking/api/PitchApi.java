package com.footballbooking.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.footballbooking.constant.MessageConst;
import com.footballbooking.entity.Pitch;
import com.footballbooking.response.PitchResponse;
import com.footballbooking.service.PitchService;
import com.footballbooking.util.ResponseUtil;

@RestController
public class PitchApi {
	
	@Autowired
	private PitchResponse pitchResponse;
	
	@Autowired
	private PitchService pitchService;
	
	@GetMapping("/pitchs")
	public ResponseEntity<?> pitchs (){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			List<Pitch> pitchs = pitchService.getAll();
			ArrayNode pitchsData = pitchResponse.responsePitchList(pitchs);
			result = ResponseUtil.createResponse(true, pitchsData, MessageConst.GET_PITCHS_SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, MessageConst.GET_PITCHS_ERROR);
		}
		
		return new ResponseEntity<Map<String, Object>> (result, HttpStatus.OK);
	}
	
	@GetMapping("/pitch/{pitchId}")
	public ResponseEntity<?> pitchById (@PathVariable(name = "pitchId") Integer pitchId){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			Pitch pitch = pitchService.getById(pitchId);
			JsonNode pitchData = pitchResponse.responsePitch(pitch);
			result = ResponseUtil.createResponse(true, pitchData, MessageConst.GET_PITCH_SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, MessageConst.GET_PITCH_ERROR);
		}
		
		return new ResponseEntity<Map<String, Object>> (result, HttpStatus.OK);
	}
	
}
