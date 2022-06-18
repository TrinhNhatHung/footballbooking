package com.footballbooking.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.footballbooking.constant.MessageConst;
import com.footballbooking.entity.Address;
import com.footballbooking.entity.Pitch;
import com.footballbooking.entity.PitchDetail;
import com.footballbooking.entity.PitchType;
import com.footballbooking.response.PitchResponse;
import com.footballbooking.service.PitchService;
import com.footballbooking.service.PitchTypeService;
import com.footballbooking.util.DateUtil;
import com.footballbooking.util.ResponseUtil;

@RestController
@CrossOrigin
public class PitchApi {
	
	@Autowired
	private PitchResponse pitchResponse;
	
	@Autowired
	private PitchService pitchService;
	
	@Autowired
	private PitchTypeService pitchTypeService;
	
	@GetMapping("/pitchs")
	public ResponseEntity<?> pitchs (@RequestParam(name = "page", required = false) Integer page,
						@RequestParam(name = "limit", required = false) Integer limit,
						@RequestParam(name = "searhByNameOrAddress", required = false) String searchByNameOrAddress,
						@RequestParam(name = "pitchTypeId", required = false) Integer pitchTypeId,
						@RequestParam(name = "costMax", required = false) Integer costMax,
						@RequestParam(name = "costMin", required = false) Integer costMin){
		
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			List<Pitch> pitchs = pitchService.getByCondition(page, limit, searchByNameOrAddress, pitchTypeId, costMin, costMax);
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
	
	@GetMapping("/getMyPitch")
    public ResponseEntity<?> getMyPitch (){
		String userIdStr = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Integer userId = Integer.parseInt(userIdStr);
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			List<Pitch> pitchs = pitchService.getByUserId(userId);
			ArrayNode pitchListData = pitchResponse.responseCommonPitchList(pitchs);
			result = ResponseUtil.createResponse(true, pitchListData, "");
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, "");
		}
		
		return new ResponseEntity<Map<String, Object>> (result, HttpStatus.OK);
    }
	
	@PostMapping("/addNewPitch")
	public ResponseEntity<?> addNewPitch (@RequestParam(name = "name") String pitchName,
					@RequestParam(name = "description") String description,
					@RequestParam(name = "city") String city,
					@RequestParam(name = "district") String district,
					@RequestParam(name = "commune") String commune,
					@RequestParam(name = "street") String street){
		Map<String, Object> result = new HashMap<String, Object>();
		Pitch pitch = new Pitch();
		String userIdStr = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Integer ownerId = null;
		try {
			ownerId = Integer.parseInt(userIdStr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		pitch.setOwnerId(ownerId);
		pitch.setName(pitchName);
		pitch.setDescription(description);
		Address address = new Address();
		address.setCity(city);
		address.setCommune(commune);
		address.setDistrict(district);
		address.setStreet(street);
		pitch.setAddress(address);
		try {
			pitchService.insert(pitch);
			result = ResponseUtil.createResponse(true, null, "");
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, "");
		}
		
		return new ResponseEntity<Map<String, Object>> (result, HttpStatus.OK);
	}
	
	@PostMapping("/addNewMiniPitch")
	public ResponseEntity<?> addNewMiniPitch (@RequestParam(name = "pitchId") Integer pitchId,
											  @RequestParam(name = "pitchTypeId") Integer pitchTypeId,
											  @RequestParam(name = "quantity") Integer quantity,
											  @RequestParam(name ="startDOW") List<Integer> startDowList,
											  @RequestParam(name ="endDOW") List<Integer> endDowList,
											  @RequestParam(name ="startHour") List<String> startHourList,
											  @RequestParam(name ="endHour") List<String> endHourList,
											  @RequestParam(name ="cost") List<Integer> costList){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			PitchType pitchType = pitchTypeService.getById(pitchTypeId);
			Pitch pitch = pitchService.getById(pitchId);
			List<PitchDetail> pitchDetailList = new ArrayList<>();
			for (int i= 0; i< startDowList.size(); i++) {
				PitchDetail pitchDetail = new PitchDetail();
				pitchDetail.setDayOfWeekStart(startDowList.get(i));
				pitchDetail.setDayOfWeekEnd(endDowList.get(i));
				pitchDetail.setTimeStart(DateUtil.convertStringToLocalTime(startHourList.get(i), "HH:mm:ss"));
				pitchDetail.setTimeEnd(DateUtil.convertStringToLocalTime(endHourList.get(i), "HH:mm:ss"));
				pitchDetail.setCost(costList.get(i));
				pitchDetail.setPitchType(pitchType);
				pitchDetail.setPitch(pitch);
				pitchDetailList.add(pitchDetail);
			}
			pitchService.insertMiniPitch(pitch, pitchType, quantity, pitchDetailList);
			result = ResponseUtil.createResponse(true, null, "");
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, "");
		}
		
		return new ResponseEntity<Map<String, Object>> (result, HttpStatus.OK);
	}
	
}
