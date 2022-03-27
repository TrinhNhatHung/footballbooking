package com.footballbooking.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "pitch_type")
@Entity(name = "pitch_type")
public class PitchType implements Serializable {

	private static final long serialVersionUID = 1718416529304269776L;

	@Id
	@Column(name = "pitch_type_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer pitchTypeId;

	@Column(name = "name")
	private String name;

	@Column(name = "max_player")
	private Integer maxPlayer;

	public PitchType() {
		super();
	}

	public Integer getPitchTypeId() {
		return pitchTypeId;
	}

	public void setPitchTypeId(Integer pitchTypeId) {
		this.pitchTypeId = pitchTypeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getMaxPlayer() {
		return maxPlayer;
	}

	public void setMaxPlayer(Integer maxPlayer) {
		this.maxPlayer = maxPlayer;
	}

	@Override
	public int hashCode() {
		return Objects.hash(pitchTypeId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PitchType other = (PitchType) obj;
		return Objects.equals(pitchTypeId, other.pitchTypeId);
	}

}
