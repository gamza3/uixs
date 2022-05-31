package com.kjb.uixs.work;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;

@Alias("WorkVO")
public class WorkVO {
	private String request_id; // 작업요청 아이디
	private String request_type;
	private String request_title; // 작업요청 제목
	private String request_content; // 작업요청 내용
	private Date end_date; // 작업요청시 입력한 완료 희망일자
	private Date regdate; // 작업요청일자
	private String request_state; // 작업요청 상태 PENDING, WORKING, DELETE, CANCEL, COMPLETE
	private String cancel_content; // 작업요청 거부시 거부 사유
	private String request_ia;
	private List<Integer> req_ia;
	private String site_code; // 사이트코드 (channel)
	private String state;
	private Date complete_date; // 작업완료 날짜
	private String username; // 작업완료 날짜
	private String userid; // 작성자 아이디
	
	
	
	// WORK_STATE 
	private int work_id;
	private String part; // 현재 진행중인 작업파트
	private String plan; // 기획 작업진행 상태 PENDING, WORKING, CONFIRM_REQUEST, CONFIRM_COMPLETE
	private String design; // 디자인 작업진행 상태
	private String publish; // 퍼블리싱 작업진행 상태
	private Date response_date; // 요청작업 수용일자
	
	private Date plan_req_sdate; // 기획 검수요청일자
	private Date plan_req_edate; // 기획 검수완요일자
	private Date design_req_sdate; // 디자인 검수요청일자
	private Date design_req_edate; // 디자인 검수완요일자
	private Date publish_req_sdate; // 퍼블리싱 검수요청일자
	private Date publish_req_edate; // 퍼블리싱 검수완요일자

	private String search_key;
	private String search_word;
	private String search_sort;
	
	private String start; // 페이징 스타트
	private String limit; // 페이징 limit
	
	
	public String getSearch_sort() {
		return search_sort;
	}

	public void setSearch_sort(String search_sort) {
		this.search_sort = search_sort;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}

	public String getSearch_key() {
		return search_key;
	}

	public void setSearch_key(String search_key) {
		this.search_key = search_key;
	}

	public String getSearch_word() {
		return search_word;
	}

	public void setSearch_word(String search_word) {
		this.search_word = search_word;
	}

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

	public Date getComplete_date() {
		return complete_date;
	}

	public void setComplete_date(Date complete_date) {
		this.complete_date = complete_date;
	}

	public Date getResponse_date() {
		return response_date;
	}

	public void setResponse_date(Date response_date) {
		this.response_date = response_date;
	}

	public Date getPlan_req_sdate() {
		return plan_req_sdate;
	}

	public void setPlan_req_sdate(Date plan_req_sdate) {
		this.plan_req_sdate = plan_req_sdate;
	}

	public Date getPlan_req_edate() {
		return plan_req_edate;
	}

	public void setPlan_req_edate(Date plan_req_edate) {
		this.plan_req_edate = plan_req_edate;
	}

	public Date getDesign_req_sdate() {
		return design_req_sdate;
	}

	public void setDesign_req_sdate(Date design_req_sdate) {
		this.design_req_sdate = design_req_sdate;
	}

	public Date getDesign_req_edate() {
		return design_req_edate;
	}

	public void setDesign_req_edate(Date design_req_edate) {
		this.design_req_edate = design_req_edate;
	}

	public Date getPublish_req_sdate() {
		return publish_req_sdate;
	}

	public void setPublish_req_sdate(Date publish_req_sdate) {
		this.publish_req_sdate = publish_req_sdate;
	}

	public Date getPublish_req_edate() {
		return publish_req_edate;
	}

	public void setPublish_req_edate(Date publish_req_edate) {
		this.publish_req_edate = publish_req_edate;
	}

	public Date getRegdate() {
		return regdate;
	}

	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}

	public String getPlan() {
		return plan;
	}

	public void setPlan(String plan) {
		this.plan = plan;
	}

	public String getDesign() {
		return design;
	}

	public void setDesign(String design) {
		this.design = design;
	}

	public String getPublish() {
		return publish;
	}

	public void setPublish(String publish) {
		this.publish = publish;
	}

	public String getSite_code() {
		return site_code;
	}

	public void setSite_code(String site_code) {
		this.site_code = site_code;
	}

	public void setReq_ia(List<Integer> req_ia) {
		this.req_ia = req_ia;
	}
	
	public List<Integer> getReq_ia() {
		return this.req_ia;
	}

	public String getRequest_id() {
		return request_id;
	}

	public void setRequest_id(String request_id) {
		this.request_id = request_id;
	}

	public String getRequest_type() {
		return request_type;
	}

	public void setRequest_type(String request_type) {
		this.request_type = request_type;
	}

	public String getRequest_title() {
		return request_title;
	}

	public void setRequest_title(String request_title) {
		this.request_title = request_title;
	}

	public String getRequest_content() {
		return request_content;
	}

	public void setRequest_content(String request_content) {
		this.request_content = request_content;
	}

	public Date getEnd_date() {
		return end_date;
	}

	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}

	public String getRequest_state() {
		return request_state;
	}

	public void setRequest_state(String request_state) {
		this.request_state = request_state;
	}

	public String getCancel_content() {
		return cancel_content;
	}

	public void setCancel_content(String cancel_content) {
		this.cancel_content = cancel_content;
	}

	public String getRequest_ia() {
		return request_ia;
	}

	public void setRequest_ia(String request_ia) {
		this.request_ia = request_ia;
	}


	public int getWork_id() {
		return work_id;
	}

	public void setWork_id(int work_id) {
		this.work_id = work_id;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
	public String getPart() {
		return part;
	}

	public void setPart(String part) {
		this.part = part;
	}

	@Override
	public String toString() {
		return "WorkVO [request_id=" + request_id + ", request_type=" + request_type + ", request_title="
				+ request_title + ", request_content=" + request_content + ", end_date=" + end_date + ", request_state="
				+ request_state + ", cancel_content=" + cancel_content + ", req_ia=" + req_ia
				+ ", getRequest_id()=" + getRequest_id()
				+ ", getRequest_type()=" + getRequest_type() + ", getRequest_title()=" + getRequest_title()
				+ ", getRequest_content()=" + getRequest_content() + ", getEnd_date()=" + getEnd_date()
				+ ", getRequest_state()=" + getRequest_state() + ", getCancel_content()=" + getCancel_content()
				+ ", getReq_ia()=" + getReq_ia() + ", getSite_code()=" + getSite_code()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}
	
	
}
