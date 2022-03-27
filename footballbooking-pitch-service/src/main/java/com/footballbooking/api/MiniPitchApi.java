package com.footballbooking.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.footballbooking.constant.MessageConst;
import com.footballbooking.entity.MiniPitch;
import com.footballbooking.service.MiniPitchService;
import com.footballbooking.util.ResponseUtil;

@RestController
public class MiniPitchApi {

	@Autowired
	private MiniPitchService miniPitchService;

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
}
