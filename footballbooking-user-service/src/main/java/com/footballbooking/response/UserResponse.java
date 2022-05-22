package com.footballbooking.response;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.footballbooking.constant.RoleConst;
import com.footballbooking.entity.Role;
import com.footballbooking.entity.User;
import com.footballbooking.service.RoleService;
import com.footballbooking.util.JwtUtil;

@Component
public class UserResponse {

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private RoleService roleService;

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
			node.set("userId", mapper.convertValue(user.getUserId(), JsonNode.class));
			node.set("fullName", mapper.convertValue(user.getFullname(), JsonNode.class));
			node.set("phone", mapper.convertValue(user.getPhone(), JsonNode.class));
			node.set("email", mapper.convertValue(user.getEmail(), JsonNode.class));
		} else {
			node.set("isAuthen", mapper.convertValue(false, JsonNode.class));
		}

		return node;
	}
	
	public JsonNode getAllUser (List<User> users) {
		ObjectNode result = mapper.createObjectNode();
		Role customerRole = roleService.getByRoleName(RoleConst.ROLE_CUSTOMER);
		Role pitchOwnerRole = roleService.getByRoleName(RoleConst.ROLE_PITCHOWNER);
		List<Integer> roleIdList = Arrays.asList(customerRole.getRoleId(),pitchOwnerRole.getRoleId());
		result.set("roleIdList", mapper.convertValue(roleIdList, ArrayNode.class));
		ArrayNode usersData = mapper.createArrayNode();
		for (User user : users) {
			ObjectNode node = mapper.createObjectNode();
			node.set("userId", mapper.convertValue(user.getUserId(), JsonNode.class));
			node.set("fullname", mapper.convertValue(user.getFullname(), JsonNode.class));
			node.set("phone", mapper.convertValue(user.getPhone(), JsonNode.class));
			node.set("email", mapper.convertValue(user.getEmail(), JsonNode.class));
			node.set("status", mapper.convertValue(user.getStatus(), JsonNode.class));
			node.set("role", mapper.convertValue(user.getRole().getRoleName(), JsonNode.class));
			usersData.add(node);
		}
		result.set("users", usersData);
		return result;
	}
}
