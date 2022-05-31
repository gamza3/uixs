package com.kjb.uixs.user;

import org.apache.ibatis.type.Alias;


@Alias("UserVO")
public class UserVO {

	private String userid;
	private String username;
	private String password;
	private String team;
	private String part;
	private String tel;
	private String email;
	private String auth;
	private String reg_date;
		
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getPart() {
		return part;
	}
	public void setPart(String part) {
		this.part = part;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAuth() {
		return auth;
	}
	public void setAuth(String auth) {
		this.auth = auth;
	}
	public String getReg_date() {
		return reg_date;
	}
	public void setReg_date(String reg_date) {
		this.reg_date = reg_date;
	}
	@Override
	public String toString() {
		return "UserVO [userid=" + userid + ", username=" + username + ", password=" + password + ", team=" + team
				+ ", part=" + part + ", tel=" + tel + ", email=" + email + ", auth=" + auth + ", reg_date=" + reg_date
				+ "]";
	}
	
	
	
}
