package com.footballbooking.response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.footballbooking.entity.User;

@Component
public class UserResponse {
	
	@Autowired
	private ObjectMapper mapper;
	
	public JsonNode getUserId(User user) {
		
		return mapper.convertValue(user, JsonNode.class);
	}
}
