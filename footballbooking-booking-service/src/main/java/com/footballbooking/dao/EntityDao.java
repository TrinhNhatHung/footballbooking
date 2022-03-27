package com.footballbooking.dao;

import java.io.Serializable;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class EntityDao<E> {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public Session openSession() {
		return sessionFactory.openSession();
	}
	
	public Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}
	
	public E getById(Class<E> clazz, Serializable id) {
		return openSession().get(clazz, id);
	}
	
	public void insertOrUpdate(E e) {
		getCurrentSession().saveOrUpdate(e);
	}
	
	public void insert (E e) {
		getCurrentSession().save(e);
	}
	
	public void delete (E e) {
		getCurrentSession().delete(e);
	}
}
