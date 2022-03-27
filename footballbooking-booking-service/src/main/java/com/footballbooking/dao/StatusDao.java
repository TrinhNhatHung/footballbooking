package com.footballbooking.dao;

import org.springframework.stereotype.Repository;

import com.footballbooking.entity.Status;

@Repository
public class StatusDao extends EntityDao<Status>{
	
	public Status getByStatusName (String statusName) {
		String sql = "SELECT * FROM status WHERE status_name = :statusName";
		return openSession().createNativeQuery(sql, Status.class)
				.setParameter("statusName", statusName)		
				.uniqueResult();
	}
}
