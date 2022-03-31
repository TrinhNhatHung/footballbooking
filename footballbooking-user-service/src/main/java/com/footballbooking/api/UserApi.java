package com.footballbooking.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.footballbooking.constant.MessageConst;
import com.footballbooking.entity.User;
import com.footballbooking.response.UserResponse;
import com.footballbooking.service.UserService;
import com.footballbooking.util.ResponseUtil;

@RestController
@CrossOrigin
public class UserApi {
	
	@Autowired
	private UserResponse userResponse;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/signUp")
	public ResponseEntity<?> signUp(@ModelAttribute User user) {
		Map<String, Object> result = new HashMap<String, Object>();
		
		User existingUser = userService.getByPhone(user.getPhone());
		if (existingUser != null) {
			result = ResponseUtil.createResponse(false, null, MessageConst.PHONE_IS_EXISTING);
			return new ResponseEntity<Map<String,Object>>(result, HttpStatus.OK);
		}
		try {
			user.setStatus(true);
			userService.insert(user);
			result = ResponseUtil.createResponse(true, user, MessageConst.INSERT_USER_SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			result = ResponseUtil.createResponse(false, null, MessageConst.INSERT_USER_ERROR);
		}
		
		return new ResponseEntity<Map<String,Object>>(result, HttpStatus.OK);
	}
	
	@GetMapping("/user/{userId}")
	public Map<String, Object> userById (@PathVariable(name ="userId") Integer userId) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			User user = userService.getById(userId);
			JsonNode userData = userResponse.getUserId(user);
			result = ResponseUtil.createResponse(true, userData, MessageConst.GET_USER_SUCCESS);
		} catch (Exception e) {
			result = ResponseUtil.createResponse(false, null, MessageConst.GET_USER_ERROR);
		}
		
		return result;
	}
	
}
