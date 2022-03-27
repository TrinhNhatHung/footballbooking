package com.footballbooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.footballbooking.dao.MiniPitchDao;
import com.footballbooking.entity.MiniPitch;

@Service
public class MiniPitchService {
	
	@Autowired
	private MiniPitchDao miniPitchDao;
	
	public List<MiniPitch> getByIdList (List<Integer> miniPitchIdList){
		return miniPitchDao.getByIdList(miniPitchIdList);
	}
}
