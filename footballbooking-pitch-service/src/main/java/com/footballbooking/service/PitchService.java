package com.footballbooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.footballbooking.dao.PitchDao;
import com.footballbooking.entity.Pitch;
import com.footballbooking.util.FirebaseUtil;

@Service
public class PitchService {

	@Autowired
	private PitchDao pitchDao;
	
	@Autowired
	private FirebaseUtil firebaseUtil;

	public List<Pitch> getAll() {
		List<Pitch> pitchs = pitchDao.getAll();
		for (Pitch pitch : pitchs) {
			pitch.setCoverAvatarLink(firebaseUtil.getFileUrl(pitch.getCoverAvatar()));
		}
		return pitchs;
	}
	
	public List<Pitch> getByCondition (Integer page, Integer limit, String searhByNameOrAddress, Integer pitchTypeId, Integer costMin, Integer costMax){
		return pitchDao.getByCondition(page, limit, searhByNameOrAddress, pitchTypeId, costMin, costMax);
	}

	public Pitch getById(Integer pitchId) {
		Pitch pitch = pitchDao.getById(pitchId);
		pitch.setCoverAvatarLink(firebaseUtil.getFileUrl(pitch.getCoverAvatar()));
		return pitch;
	}
}
