package com.footballbooking.filter;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.JsonNode;
import com.footballbooking.util.JwtUtil;
import com.footballbooking.util.RestTemplateUtil;

@Service
public class Filter extends OncePerRequestFilter {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private RestTemplateUtil restTemplateUtil;
    
    @Autowired
    private Environment env;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    	String token = request.getHeader("Authorization");
    	String phone = null;
        String password = null;
        String role = null;
        Integer userId = null;
        if (token != null){
            try {
            	userId = jwtUtil.extractAllClaims(token).get("userId", Integer.class);
                phone = jwtUtil.extractAllClaims(token).get("phone", String.class);
                password = jwtUtil.extractAllClaims(token).get("password", String.class);
            } catch (Exception e){
                e.printStackTrace();
            }
        }
        
        if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null){
        	HttpHeaders headers = new HttpHeaders();
    		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
    		formData.add("phone", phone);
    		formData.add("password", password);
    		HttpEntity<MultiValueMap<String, String>> acrossServiceRequest = new HttpEntity<>(formData, headers);
            JsonNode checkLoginData = restTemplateUtil.postObjectNode(env.getProperty("USER_SERVICE_CHECK_LOGIN"), acrossServiceRequest);
            boolean isAuthen = checkLoginData.findValue("isAuthen").asBoolean();
            role = checkLoginData.findValue("role").asText();
            if (isAuthen){
            	
            	User userDetail = new User("" + userId, password, Arrays.asList(new SimpleGrantedAuthority(role)));
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                	userDetail.getUsername(), userDetail.getPassword(), userDetail.getAuthorities()
                );
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        
        filterChain.doFilter(request, response);
    }
}