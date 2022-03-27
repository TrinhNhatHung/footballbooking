package com.footballbooking.common;

import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class JsonTimeSerializer extends JsonSerializer<LocalTime>{
	
	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
	
	@Override
	public void serialize(LocalTime time, JsonGenerator gen, SerializerProvider serializers) throws IOException {
		final String timeString = time.format(this.formatter);
	    gen.writeString(timeString);
	}

}
