package com.footballbooking.configuration;

import java.time.LocalTime;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.footballbooking.common.JsonTimeDeserializer;
import com.footballbooking.common.JsonTimeSerializer;

@Configuration
public class AppConfig {
	
	@Bean
	public ObjectMapper objectMapper () {
		ObjectMapper objectMapper = new ObjectMapper();
        JavaTimeModule javaTimeModule = new JavaTimeModule();
        javaTimeModule.addSerializer(LocalTime.class, new JsonTimeSerializer());
        javaTimeModule.addDeserializer(LocalTime.class, new JsonTimeDeserializer());
        objectMapper.registerModule(javaTimeModule);
        return objectMapper;
	}
	
	@Bean
	public RestTemplate restTemplate () {
		return new RestTemplate();
	}
	
	@Bean(name = "multipartResolver")
	public MultipartResolver multipartResolver() {
		return new StandardServletMultipartResolver();
	}
}
