package com.footballbooking.common;

import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.node.TextNode;

public class JsonTimeDeserializer extends JsonDeserializer<LocalTime> {

	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");

	@Override
	public LocalTime deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JacksonException {
		ObjectCodec oc = jp.getCodec();
		TextNode node = (TextNode) oc.readTree(jp);
		String dateString = node.textValue();
		return LocalTime.parse(dateString, formatter);
	}

}
