package com.footballbooking.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.footballbooking.entity.PitchType;
import com.footballbooking.service.PitchTypeService;
import com.footballbooking.util.ResponseUtil;

@RestController
@CrossOrigin
public class PitchTypeApi {
	
	@Autowired
	private PitchTypeService pitchTypeService;
	
	@GetMapping("/pitchTypes")
	public ResponseEntity<?> getAllPitchType (){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			List<PitchType> pitchTypes = pitchTypeService.getAll(); 
			result = ResponseUtil.createResponse(true, pitchTypes , "");
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, "");
		}
		
		return new ResponseEntity<Map<String,Object>>(result, HttpStatus.OK);
	}
}
