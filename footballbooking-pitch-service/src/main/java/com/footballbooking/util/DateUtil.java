package com.footballbooking.util;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class DateUtil {
	
	public static LocalDate convertStringToLocalDate(String date, String pattern) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		return LocalDate.parse(date, formatter);
	}
	
	public static String convertLocalDateToString (LocalDate date, String pattern) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		return date.format(formatter);
	}
	
	public static LocalTime convertStringToLocalTime(String time, String pattern) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		return LocalTime.parse(time, formatter);
	}
	
	public static String convertLocalTimeToString (LocalTime time, String pattern) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		return time.format(formatter);
	}
}
