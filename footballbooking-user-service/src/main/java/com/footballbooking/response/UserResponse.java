package com.footballbooking.response;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.footballbooking.entity.User;
import com.footballbooking.util.JwtUtil;

@Component
public class UserResponse {

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private JwtUtil jwtUtil;

	public JsonNode getUserId(User user) {

		return mapper.convertValue(user, JsonNode.class);
	}

	public JsonNode getAuthenInfo(User user) {
		ObjectNode node = mapper.createObjectNode();
		if (user != null) {
			Map<String, Object> jwtClaim = new HashMap<>();
			jwtClaim.put("phone", user.getPhone());
			jwtClaim.put("password", user.getPassword());
			jwtClaim.put("userId", user.getUserId());
			String token = jwtUtil.createToken(jwtClaim);
			node.set("token", mapper.convertValue(token, JsonNode.class));
			node.set("isAuthen", mapper.convertValue(true, JsonNode.class));
			node.set("role", mapper.convertValue(user.getRole().getRoleName(), JsonNode.class));
		} else {
			node.set("isAuthen", mapper.convertValue(false, JsonNode.class));
		}

		return node;
	}
}
