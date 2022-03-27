package com.footballbooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.footballbooking.dao.PitchDao;
import com.footballbooking.entity.Pitch;

@Service
public class PitchService {

	@Autowired
	private PitchDao pitchDao;

	public List<Pitch> getAll() {
		return pitchDao.getAll();
	}

	public Pitch getById(Integer pitchId) {
		return pitchDao.getById(pitchId);
	}
}
