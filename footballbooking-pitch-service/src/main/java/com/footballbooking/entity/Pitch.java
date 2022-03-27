package com.footballbooking.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Table(name = "pitch")
@Entity(name = "pitch")
public class Pitch implements Serializable {

	private static final long serialVersionUID = -320444360183770833L;

	@Id
	@Column(name = "pitch_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer pitchId;

	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "cover_avatar")
	private String coverAvatar;

	@Column(name = "owner_id")
	private Integer ownerId;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "pitch")
	private List<PitchDetail> pitchDetails;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "pitch")
	private List<MiniPitch> miniPitchs;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "address_id", referencedColumnName = "address_id")
	private Address address;

	public Pitch() {
		super();
	}

	public Integer getPitchId() {
		return pitchId;
	}

	public void setPitchId(Integer pitchId) {
		this.pitchId = pitchId;
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

	public String getCoverAvatar() {
		return coverAvatar;
	}

	public void setCoverAvatar(String coverAvatar) {
		this.coverAvatar = coverAvatar;
	}

	public Integer getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Integer ownerId) {
		this.ownerId = ownerId;
	}

	public List<PitchDetail> getPitchDetails() {
		return pitchDetails;
	}

	public void setPitchDetails(List<PitchDetail> pitchDetails) {
		this.pitchDetails = pitchDetails;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public List<MiniPitch> getMiniPitchs() {
		return miniPitchs;
	}

	public void setMiniPitchs(List<MiniPitch> miniPitchs) {
		this.miniPitchs = miniPitchs;
	}

}
