package com.footballbooking.api;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.footballbooking.entity.PitchDetail;
import com.footballbooking.response.PitchDetailResponse;
import com.footballbooking.service.PitchDetailService;
import com.footballbooking.util.DateUtil;
import com.footballbooking.util.ResponseUtil;

@RestController
public class PitchDetailApi {
	
	@Autowired
	private PitchDetailService pitchDetailService;
	
	@Autowired
	private PitchDetailResponse pitchDetailResponse;
	
	@PostMapping(path = "/infoPitchDetail")
	public ResponseEntity<?> getInfoPitchDetail (@RequestParam(name = "pitchTypeId") String pitchTypeId,
					@RequestParam(name = "pitchId") String pitchId,
					@RequestParam(name = "bookingDate") String bookingDate){
		int pitchIdInt = Integer.parseInt(pitchId);
		int pitchTypeIdInt = Integer.parseInt(pitchTypeId);
		LocalDate bookingDateLocalDate = DateUtil.convertStringToLocalDate(bookingDate, "yyyy/MM/dd");
		int bookingDayOfWeek = bookingDateLocalDate.getDayOfWeek().getValue();
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			List<PitchDetail> pitchDetails = pitchDetailService.getByPitchIdAndPitchTypeIdAndDayOfWeek(pitchIdInt, pitchTypeIdInt, bookingDayOfWeek);
			JsonNode pitchData = pitchDetailResponse.responsePitchDetailList(pitchDetails);
			result = ResponseUtil.createResponse(true, pitchData,"");
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, "");
		}
		
		return new ResponseEntity<Map<String, Object>> (result, HttpStatus.OK);
	}
}
