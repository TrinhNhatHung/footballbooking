package com.footballbooking.configuration;

import java.io.IOException;
import java.io.InputStream;
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
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;

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
	
	@Bean(name = "firebaseApp")
    public FirebaseApp getFirebaseApp() throws IOException {
        InputStream serviceAccount = this.getClass().getClassLoader().getResourceAsStream("./footballbooking-2496b-firebase-adminsdk-sbqnl-541894c975.json");
        assert serviceAccount != null;
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://footballbooking-2496b.firebaseapp.com/")
                .setStorageBucket("footballbooking-2496b.appspot.com")
                .build();

        return FirebaseApp.initializeApp(options);
    }

    @Bean(name = "bucket")
    public Bucket getStorage() throws IOException {
        return StorageClient.getInstance(getFirebaseApp()).bucket();
    }
}
