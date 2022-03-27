package com.footballbooking.dao;

import java.util.List;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.footballbooking.entity.MiniPitch;

@Repository
public class MiniPitchDao extends EntityDao<MiniPitch>{
	
	public List<MiniPitch> getByIdList (List<Integer> miniPitchIds){
		String sql = "SELECT * FROM minipitch WHERE minipitch_id IN (:miniPitchIdList)";
		NativeQuery<MiniPitch> query = openSession().createNativeQuery(sql, MiniPitch.class)
						.setParameterList("miniPitchIdList", miniPitchIds);
		return query.getResultList();
	}
}
