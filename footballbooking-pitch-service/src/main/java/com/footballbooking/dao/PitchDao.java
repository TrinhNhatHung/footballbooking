package com.footballbooking.dao;

import java.util.List;

import org.hibernate.query.NativeQuery;
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
	
	public List<Pitch> getByUserId (Integer userId){
		String sql = "SELECT * FROM pitch WHERE owner_id = :userId";
		NativeQuery<Pitch> query = openSession().createNativeQuery(sql, Pitch.class)
										.setParameter("userId", userId);
		return query.getResultList();
	}
}
