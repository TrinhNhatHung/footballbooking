package com.footballbooking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableEurekaClient
@ComponentScan("com.footballbooking")
@EnableAutoConfiguration
public class FootballbookingGatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FootballbookingGatewayServiceApplication.class, args);
	}	

}
