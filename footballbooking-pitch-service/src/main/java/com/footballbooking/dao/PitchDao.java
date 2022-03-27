package com.footballbooking.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.footballbooking.entity.Pitch;

@Repository
public class PitchDao extends EntityDao<Pitch> {
	
	public List<Pitch> getAll(){
		return super.getAll(Pitch.class);
	}
	
	public Pitch getById (Integer pitchId) {
		return super.getById(Pitch.class, pitchId);
	}
}
