package com.kjb.uixs.channel;

import java.util.Date;

import org.apache.ibatis.type.Alias;


@Alias("ChannelVO")
public class ChannelVO {

	private String code;
	private String name;
	private char useyn;
	private String cuser;
	private String device;
	private int req_pending_cnt; //작업요청후 대기중인 건수
	private int req_working_cnt; //작업요청후 작업중인건수
	private int req_complete_cnt; //작업요청후 작업완료된 건수
	private Date regdate;
	
	
	public int getReq_pending_cnt() {
		return req_pending_cnt;
	}
	public void setReq_pending_cnt(int req_pending_cnt) {
		this.req_pending_cnt = req_pending_cnt;
	}
	public int getReq_working_cnt() {
		return req_working_cnt;
	}
	public void setReq_working_cnt(int req_working_cnt) {
		this.req_working_cnt = req_working_cnt;
	}
	public int getReq_complete_cnt() {
		return req_complete_cnt;
	}
	public void setReq_complete_cnt(int req_complete_cnt) {
		this.req_complete_cnt = req_complete_cnt;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public char getUseyn() {
		return useyn;
	}
	public void setUseyn(char useyn) {
		this.useyn = useyn;
	}
	public String getCuser() {
		return cuser;
	}
	public void setCuser(String cuser) {
		this.cuser = cuser;
	}
	public String getDevice() {
		return device;
	}
	public void setDevice(String device) {
		this.device = device;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	
	@Override
	public String toString() {
		return "ChannelVO [code=" + code + ", name=" + name + ", useyn=" + useyn + ", cuser=" + cuser + ", device="
				+ device + ", regdate=" + regdate + "]";
	}
}
