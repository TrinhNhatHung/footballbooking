package com.footballbooking.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.footballbooking.entity.Pitch;
import com.footballbooking.entity.PitchDetail;

@Repository
public class PitchDao extends EntityDao<Pitch> {
	
	public List<Pitch> getAll(){
		return super.getAll(Pitch.class);
	}
	
	public List<Pitch> getByCondition (Integer page, Integer limit, String searhByNameOrAddress, Integer pitchTypeId, Integer costMin, Integer costMax){
		String sql = "SELECT * FROM pitch WHERE name LIKE :searhByNameOrAddress";
		Session session = openSession();
		NativeQuery<Pitch> query = session.createNativeQuery(sql, Pitch.class);
		searhByNameOrAddress = searhByNameOrAddress == null ? "" : searhByNameOrAddress;
		query.setParameter("searhByNameOrAddress", "%" +  searhByNameOrAddress + "%");
		List<Pitch> result = query.getResultList();
		if (pitchTypeId != null) {
			result = result.stream().filter(pitch -> {
				List<PitchDetail> pitchDetails = pitch.getPitchDetails();
				for (PitchDetail pitchDetail : pitchDetails) {
					if (pitchDetail.getPitchType().getPitchTypeId().equals(pitchTypeId)) {
						return true;
					}
				}
				return false;
			}).collect(Collectors.toList());
		}
		
		if (costMax != null && costMin != null) {
			result = result.stream().filter(pitch -> {
				List<PitchDetail> pitchDetails = pitch.getPitchDetails();
				for (PitchDetail pitchDetail : pitchDetails) {
					if (pitchDetail.getCost() <= costMax && pitchDetail.getCost() >= costMin) {
						return true;
					}
				}
				return false;
			}).collect(Collectors.toList());
		}
		if (limit != null && page != null) {
			try {
				if (page * limit >= result.size()) {
					result = result.subList((page - 1 ) * limit, result.size());
				} else {
					result = result.subList((page - 1 ) * limit, page * limit);
				}
			} catch (Exception e) {
				result = new ArrayList<>();
			}
			
		}
		return result;
	}
	
	public Pitch getById (Integer pitchId) {
		return super.getById(Pitch.class, pitchId);
	}
}
