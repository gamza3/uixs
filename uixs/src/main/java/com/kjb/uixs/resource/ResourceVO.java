package com.kjb.uixs.resource;

import java.util.Date;

import org.apache.ibatis.type.Alias;

@Alias("ResourceVO")
public class ResourceVO {
	private int id;
	private String type; // guide or resource
	private String title; 
	private String site_code;
	private Date regdate;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSite_code() {
		return site_code;
	}
	public void setSite_code(String site_code) {
		this.site_code = site_code;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	@Override
	public String toString() {
		return "ResourceVO [id=" + id + ", type=" + type + ", title=" + title + ", site_code=" + site_code
				+ ", regdate=" + regdate + "]";
	}
	
	
}
