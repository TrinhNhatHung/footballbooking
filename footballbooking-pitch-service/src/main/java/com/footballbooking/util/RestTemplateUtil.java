package com.footballbooking.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Component
public class RestTemplateUtil {

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private RestTemplate restTemplate;

	public JsonNode getObjectNode(String url) throws JsonMappingException, JsonProcessingException {
		ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
		return mapper.readTree(response.getBody()).path("data");
	}

	public JsonNode postObjectNode(String url, HttpEntity<MultiValueMap<String, String>> formData)
			throws JsonMappingException, JsonProcessingException {
		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, formData, String.class);
		return mapper.readTree(response.getBody()).path("data");
	}

	public void setJsonNode(String key, JsonNode parentNode, JsonNode childNode) {
		((ObjectNode) parentNode).set(key, childNode);
	}

	public JsonNode convertValueToJsonNode(Object value) {
		return mapper.convertValue(value, JsonNode.class);
	}

}
