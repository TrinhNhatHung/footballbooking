package com.footballbooking.entity;

import java.io.Serializable;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "pitch_detail")
@Entity(name = "pitch_detail")
public class PitchDetail implements Serializable {

	private static final long serialVersionUID = 4076039529517309609L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pitch_detail_id")
	private Integer pitchDetailId;

	@Column(name = "day_of_week_start")
	private Integer dayOfWeekStart;

	@Column(name = "day_of_week_end")
	private Integer dayOfWeekEnd;

	@Column(name = "time_start")
	@JsonFormat(pattern = "HH:mm:ss")
	private LocalTime timeStart;

	@Column(name = "time_end")
	@JsonFormat(pattern = "HH:mm:ss")
	private LocalTime timeEnd;

	@Column(name = "cost")
	private Integer cost;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pitch_id", referencedColumnName = "pitch_id")
	private Pitch pitch;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pitch_type_id", referencedColumnName = "pitch_type_id")
	private PitchType pitchType;

	public PitchDetail() {
		super();
	}

	public Integer getPitchDetailId() {
		return pitchDetailId;
	}

	public void setPitchDetailId(Integer pitchDetailId) {
		this.pitchDetailId = pitchDetailId;
	}

	public Integer getDayOfWeekStart() {
		return dayOfWeekStart;
	}

	public void setDayOfWeekStart(Integer dayOfWeekStart) {
		this.dayOfWeekStart = dayOfWeekStart;
	}

	public Integer getDayOfWeekEnd() {
		return dayOfWeekEnd;
	}

	public void setDayOfWeekEnd(Integer dayOfWeekEnd) {
		this.dayOfWeekEnd = dayOfWeekEnd;
	}

	public LocalTime getTimeStart() {
		return timeStart;
	}

	public void setTimeStart(LocalTime timeStart) {
		this.timeStart = timeStart;
	}

	public LocalTime getTimeEnd() {
		return timeEnd;
	}

	public void setTimeEnd(LocalTime timeEnd) {
		this.timeEnd = timeEnd;
	}

	public Integer getCost() {
		return cost;
	}

	public void setCost(Integer cost) {
		this.cost = cost;
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
