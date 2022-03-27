package com.footballbooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.footballbooking.dao.PitchDetailDao;
import com.footballbooking.entity.PitchDetail;

@Service
public class PitchDetailService {
	
	@Autowired
	private PitchDetailDao pitchDetailDao;
	
	public PitchDetail getById (Integer pitchDetailId) {
		return pitchDetailDao.getById(pitchDetailId);
	}
	
	public List<PitchDetail> getByPitchIdAndPitchTypeIdAndDayOfWeek (Integer pitchId, Integer pitchTypeId, int bookingDayOfWeek) {
		return pitchDetailDao.getByPitchIdAndPitchTypeIdAndDayOfWeek(pitchId, pitchTypeId, bookingDayOfWeek);
	}
}
