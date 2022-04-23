package com.footballbooking.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.footballbooking.entity.PitchType;

@Repository
public class PitchTypeDao extends EntityDao<PitchType>{
	
	public List<PitchType> getAll(){
		return super.getAll(PitchType.class);
	}
}
