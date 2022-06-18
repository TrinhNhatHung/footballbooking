package com.footballbooking.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.footballbooking.dao.MiniPitchDao;
import com.footballbooking.dao.PitchDao;
import com.footballbooking.dao.PitchDetailDao;
import com.footballbooking.entity.MiniPitch;
import com.footballbooking.entity.Pitch;
import com.footballbooking.entity.PitchDetail;
import com.footballbooking.entity.PitchType;
import com.footballbooking.util.FirebaseUtil;

@Service
public class PitchService {

	@Autowired
	private PitchDao pitchDao;
	
	@Autowired
	private MiniPitchDao miniPitchDao;
	
	@Autowired
	private PitchDetailDao pitchDetailDao;
	
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
	
	public List<Pitch> getByUserId (Integer userId){
		return pitchDao.getByUserId(userId);
	}

	@Transactional
	public void insert (Pitch pitch) {
		pitchDao.insert(pitch);
	}
	
	@Transactional
	public void insertMiniPitch (Pitch pitch, PitchType pitchType, int quantity, List<PitchDetail> pitchDetailList) {
		int availablePitch = pitch.getMiniPitchs().stream()
						.filter(miniPitch -> miniPitch.getPitchType().getPitchTypeId().equals(pitchType.getPitchTypeId()))
						.collect(Collectors.toList())
						.size();
		List<MiniPitch> miniPitchs = new ArrayList<>();
		for (int i= 1; i <= quantity; i++) {
			MiniPitch miniPitch = new MiniPitch();
			miniPitch.setName("Sân " + (availablePitch + i));
			miniPitch.setPitch(pitch);
			miniPitch.setPitchType(pitchType);
			miniPitchs.add(miniPitch);
		}
		miniPitchDao.insertList(miniPitchs);
		pitchDetailDao.insertList(pitchDetailList);
	}
	
}
