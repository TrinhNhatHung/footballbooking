package com.footballbooking.api;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.footballbooking.constant.MessageConst;
import com.footballbooking.entity.MiniPitch;
import com.footballbooking.response.MiniPitchResponse;
import com.footballbooking.service.MiniPitchService;
import com.footballbooking.util.DateUtil;
import com.footballbooking.util.ResponseUtil;

@RestController
@CrossOrigin
public class MiniPitchApi {

	@Autowired
	private MiniPitchService miniPitchService;
	
	@Autowired
	private MiniPitchResponse miniPitchResponse;

	@GetMapping("/miniPitchByIdList")
	public ResponseEntity<?> getPitchByIdList(@RequestParam(name = "miniPitchId") List<Integer> miniPitchIds) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			List<MiniPitch> miniPitchs = miniPitchService.getByIdList(miniPitchIds);
			result = ResponseUtil.createResponse(true, miniPitchs, MessageConst.GET_PITCHS_SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, MessageConst.GET_PITCHS_ERROR);
		}

		return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
	}
	
	@GetMapping("/getMiniPitchInfo/{miniPitchId}")
	public ResponseEntity<?> getMiniPitchInfo (@PathVariable(name = "miniPitchId") Integer miniPitchId){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			MiniPitch miniPitch = miniPitchService.getById(miniPitchId);
			JsonNode miniPitchData = miniPitchResponse.createMiniPitchInfo(miniPitch);
			result = ResponseUtil.createResponse(true, miniPitchData, "");
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, "");
		}

		return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
	}
	
	@PostMapping("/getMiniPitchByUserId")
	public ResponseEntity<?> getMiniPitchByUserId(@RequestParam(name = "userId") String userId){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			List<Integer> miniPitchIds = miniPitchService.getMiniPitchIdByUserId(Integer.parseInt(userId));
			result = ResponseUtil.createResponse(true, miniPitchIds, "");
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, "");
		}

		return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
	}
	
	@PostMapping("/fullInfoMiniPitch/{miniPitchId}")
	public ResponseEntity<?> getFullInfoMiniPitch (@PathVariable(name ="miniPitchId") Integer miniPitchId,
			@RequestParam(name ="bookingDate") String bookingDateStr,
			@RequestParam(name ="hourStart") String hourStartStr){
		LocalDate bookingDate = DateUtil.convertStringToLocalDate(bookingDateStr, "yyyy/MM/dd");
		LocalTime hourStart = DateUtil.convertStringToLocalTime(hourStartStr, "HH:mm");
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			MiniPitch miniPitch = miniPitchService.getById(miniPitchId);
			JsonNode miniPitchFullData = miniPitchResponse.createMiniPitchFullInfo(miniPitch, bookingDate, hourStart);
			result = ResponseUtil.createResponse(true, miniPitchFullData, "");
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, "");
		}

		return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
	}
}
