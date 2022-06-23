package com.footballbooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.footballbooking.dao.PitchTypeDao;
import com.footballbooking.entity.PitchType;

@Service
public class PitchTypeService {

	@Autowired
	private PitchTypeDao pitchTypeDao;

	public List<PitchType> getAll() {
		return pitchTypeDao.getAll();
	}
	
	public PitchType getById (Integer pitchTypeId) {
		return pitchTypeDao.getById(pitchTypeId);
	}
	
}
