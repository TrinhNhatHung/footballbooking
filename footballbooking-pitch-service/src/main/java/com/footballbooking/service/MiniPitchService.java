package com.footballbooking.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.footballbooking.dao.MiniPitchDao;
import com.footballbooking.dao.PitchDao;
import com.footballbooking.entity.MiniPitch;
import com.footballbooking.entity.Pitch;

@Service
public class MiniPitchService {
	
	@Autowired
	private MiniPitchDao miniPitchDao;
	
	@Autowired
	private PitchDao pitchDao;
	
	public MiniPitch getById (Integer miniPitchId) {
		return miniPitchDao.getById(miniPitchId);
	}
	
	public List<MiniPitch> getByIdList (List<Integer> miniPitchIdList){
		return miniPitchDao.getByIdList(miniPitchIdList);
	}
	
	public List<Integer> getMiniPitchIdByUserId (Integer userId){
		List<Pitch> pitchs = pitchDao.getByUserId(userId);
		List<MiniPitch> miniPitchs = new ArrayList<>();
		for (Pitch pitch : pitchs) {
			miniPitchs.addAll(pitch.getMiniPitchs());
		}
		
		return miniPitchs.stream().map(MiniPitch::getMiniPitchId).collect(Collectors.toList());
	}
}
