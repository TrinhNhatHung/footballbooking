package com.footballbooking.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Table(name = "user")
@Entity(name = "user")
public class User {

	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;

	@Column(name = "fullname")
	private String fullname;

	@Column(name = "phone")
	private String phone;

	@Column(name = "password")
	@JsonIgnore
	private String password;

	@Column(name = "email")
	private String email;

	@Column(name = "status")
	private Boolean status;

	@Column(name = "create_at")
	@CreationTimestamp
	@JsonIgnore
	private LocalDateTime createAt;

	@Column(name = "update_at")
	@UpdateTimestamp
	@JsonIgnore
	private LocalDateTime updateAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_id", referencedColumnName = "role_id")
	@JsonIgnore
	private Role role;

	public User() {
		super();
	}

	public User(Integer userId, String fullname, String phone, String password, String email, Boolean status,
			LocalDateTime createAt, LocalDateTime updateAt) {
		super();
		this.userId = userId;
		this.fullname = fullname;
		this.phone = phone;
		this.password = password;
		this.email = email;
		this.status = status;
		this.createAt = createAt;
		this.updateAt = updateAt;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public LocalDateTime getCreateAt() {
		return createAt;
	}

	public void setCreateAt(LocalDateTime createAt) {
		this.createAt = createAt;
	}

	public LocalDateTime getUpdateAt() {
		return updateAt;
	}

	public void setUpdateAt(LocalDateTime updateAt) {
		this.updateAt = updateAt;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

}
