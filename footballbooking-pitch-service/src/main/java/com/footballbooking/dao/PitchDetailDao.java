package com.footballbooking.dao;

import java.util.List;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.footballbooking.entity.PitchDetail;

@Repository
public class PitchDetailDao extends EntityDao<PitchDetail>{
	
	public PitchDetail getById (Integer pitchDetailId) {
		return super.getById(PitchDetail.class, pitchDetailId);
	}
	
	public List<PitchDetail> getByPitchIdAndPitchTypeIdAndDayOfWeek (Integer pitchId, Integer pitchTypeId, int bookingDayOfWeek) {
		String sql = "SELECT * FROM pitch_detail WHERE pitch_id = :pitchId AND pitch_type_id = :pitchTypeId AND day_of_week_start <= :dayOfWeek AND day_of_week_end >= :dayOfWeek";
		NativeQuery<PitchDetail> query = openSession().createNativeQuery(sql, PitchDetail.class)
											.setParameter("pitchId", pitchId)
											.setParameter("pitchTypeId", pitchTypeId)
											.setParameter("dayOfWeek", bookingDayOfWeek);
		return query.getResultList();
	}
	
	public void insertList(List<PitchDetail> pitchDetails ) {
		for (PitchDetail pitchDetail : pitchDetails) {
			super.insert(pitchDetail);
		}
	}
}

