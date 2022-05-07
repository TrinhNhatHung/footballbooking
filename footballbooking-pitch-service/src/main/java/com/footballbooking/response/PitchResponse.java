package com.footballbooking.response;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.footballbooking.entity.Pitch;
import com.footballbooking.entity.PitchDetail;
import com.footballbooking.entity.PitchType;
import com.footballbooking.util.FirebaseUtil;
import com.footballbooking.util.RestTemplateUtil;

@Component
public class PitchResponse {

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private RestTemplateUtil restTemplateUtil;

	@Autowired
	private Environment env;
	
	@Autowired
	private FirebaseUtil firebaseUtil;

	public ArrayNode responsePitchList(List<Pitch> pitchs) throws JsonMappingException, JsonProcessingException {

		ArrayNode pitchsData = mapper.createArrayNode();
		for (Pitch pitch : pitchs) {
			JsonNode pitchData = convertPitchToJsonNode(pitch);
			pitchsData.add(pitchData);
		}

		return pitchsData;
	}

	public JsonNode responsePitch(Pitch pitch) throws JsonMappingException, JsonProcessingException {
		return convertPitchToJsonNode(pitch);
	}

	private JsonNode convertPitchToJsonNode(Pitch pitch) throws JsonMappingException, JsonProcessingException {
		String userServiceGetUserById = env.getProperty("USER_SERVICE_GET_USER_BY_ID");
		userServiceGetUserById += pitch.getOwnerId();
		JsonNode userData = restTemplateUtil.getObjectNode(userServiceGetUserById);
		pitch.setCoverAvatarLink(firebaseUtil.getFileUrl(pitch.getCoverAvatar()));
		JsonNode pitchData = mapper.convertValue(pitch, JsonNode.class);
		restTemplateUtil.setJsonNode("owner", pitchData, userData);

		ArrayNode detailArrayNode = mapper.createArrayNode();
		List<PitchDetail> pitchDetails = pitch.getPitchDetails();
		List<PitchType> pitchTypes = pitchDetails.stream().map(PitchDetail::getPitchType).distinct()
				.collect(Collectors.toList());
		for (PitchType pitchType : pitchTypes) {
			ObjectNode detailNode = mapper.createObjectNode();
			detailNode.set("pitchTypeId", mapper.convertValue(pitchType.getPitchTypeId(), JsonNode.class));
			detailNode.set("pitchTypeName", mapper.convertValue(pitchType.getName(), JsonNode.class));
			ArrayNode timeSlotArrayNode = mapper.createArrayNode();
			for (PitchDetail pitchDetail : pitchDetails) {
				if (pitchDetail.getPitchType().getPitchTypeId().equals(pitchType.getPitchTypeId())) {
					ObjectNode timeSlotNode = mapper.createObjectNode();
					timeSlotNode.set("dayOfWeekStart",
							mapper.convertValue(pitchDetail.getDayOfWeekStart(), JsonNode.class));
					timeSlotNode.set("dayOfWeekEnd",
							mapper.convertValue(pitchDetail.getDayOfWeekEnd(), JsonNode.class));
					timeSlotNode.set("timeStart", mapper.convertValue(pitchDetail.getTimeStart(), JsonNode.class));
					timeSlotNode.set("timeEnd", mapper.convertValue(pitchDetail.getTimeEnd(), JsonNode.class));
					timeSlotNode.set("cost", mapper.convertValue(pitchDetail.getCost(), JsonNode.class));
					timeSlotArrayNode.add(timeSlotNode);
				}
			}
			detailNode.set("timeSlots", timeSlotArrayNode);
			detailArrayNode.add(detailNode);
		}
		restTemplateUtil.setJsonNode("detail", pitchData, detailArrayNode);
		return pitchData;
	}
	
	public ArrayNode responseCommonPitchList(List<Pitch> pitchs) {

		ArrayNode pitchsData = mapper.createArrayNode();
		for (Pitch pitch : pitchs) {
			pitch.setCoverAvatarLink(firebaseUtil.getFileUrl(pitch.getCoverAvatar()));
			JsonNode pitchData = mapper.convertValue(pitch, JsonNode.class);
			pitchsData.add(pitchData);
		}

		return pitchsData;
	}
}
