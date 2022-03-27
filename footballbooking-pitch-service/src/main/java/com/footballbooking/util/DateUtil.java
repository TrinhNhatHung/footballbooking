package com.footballbooking.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateUtil {
	
	public static LocalDate convertStringToLocalDate(String date, String pattern) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		return LocalDate.parse(date, formatter);
	}
}
