package com.footballbooking.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Table(name = "minipitch")
@Entity(name = "minipitch")
public class MiniPitch {

	@Id
	@Column(name = "minipitch_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer miniPitchId;

	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pitch_id", referencedColumnName = "pitch_id")
	@JsonIgnore
	private Pitch pitch;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pitch_type_id", referencedColumnName = "pitch_type_id")
	@JsonIgnore
	private PitchType pitchType;

	public MiniPitch() {
		super();
	}

	public Integer getMiniPitchId() {
		return miniPitchId;
	}

	public void setMiniPitchId(Integer miniPitchId) {
		this.miniPitchId = miniPitchId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Pitch getPitch() {
		return pitch;
	}

	public void setPitch(Pitch pitch) {
		this.pitch = pitch;
	}

	public PitchType getPitchType() {
		return pitchType;
	}

	public void setPitchType(PitchType pitchType) {
		this.pitchType = pitchType;
	}

}
