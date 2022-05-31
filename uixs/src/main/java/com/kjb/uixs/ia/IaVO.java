package com.kjb.uixs.ia;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.type.Alias;

@Alias("IaVO")
public class IaVO {
	private int ia_no;
	private String site_code;
	private String view_name;
	private String view_id;
	private int depth;
	private String parent;
	private int sort;
	private List<Map<String, Object>> sort_list;
	
	private String mode;
	private String parent_id;
	private String id;
	private String name;
	private String text;
	private String link;
	
	private String path; // 화면경로 (DEPTH) ex) 조회 > 다른이름조회
	private String confirm; // 검수상태 1: 작업중, 2: 검수요청, 3: 검수완료
	private String publ; // 퍼블 상태 1: 작업중, 2: 작업완료, 3: 수정중
	
	private Date reg_date;
	private Date update_date;
	private int file_cnt;
	
	
	private String work_request_cnt; // 해당 메뉴에 요청한 작업 갯수
//	private List<IaVO> children;
	
	public String getWork_request_cnt() {
		return work_request_cnt;
	}
	
	
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getConfirm() {
		return confirm;
	}

	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}

	public String getPubl() {
		return publ;
	}

	public void setPubl(String publ) {
		this.publ = publ;
	}

	public void setWork_request_cnt(String work_request_cnt) {
		this.work_request_cnt = work_request_cnt;
	}
	
	public int getFile_cnt() {
		return file_cnt;
	}

	public void setFile_cnt(int file_cnt) {
		this.file_cnt = file_cnt;
	}
	
	public int getIa_no() {
		return ia_no;
	}
	
	public void setIa_no(int ia_no) {
		this.ia_no = ia_no;
	}
	
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getSite_code() {
		return site_code;
	}
	public void setSite_code(String site_code) {
		this.site_code = site_code;
	}
	
	public String getView_name() {
		return view_name;
	}
	public void setView_name(String view_name) {
		this.view_name = view_name;
	}
	
	public String getView_id() {
		return view_id;
	}
	public void setView_id(String view_id) {
		this.view_id = view_id;
	}
	
	public int getDepth() {
		return depth;
	}
	public void setDepth(int depth) {
		this.depth = depth;
	}
	
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	
	public int getSort() {
		return sort;
	}
	public void setSort(int sort) {
		this.sort = sort;
	}
	
	public List<Map<String, Object>> getSort_list() {
		return sort_list;
	}
	public void setSort_list(List<Map<String, Object>> sort_list) {
		this.sort_list = sort_list;
	}
	
	public String getParent_id() {
		return parent_id;
	}
	public void setParent_id(String parent_id) {
		this.parent_id = parent_id;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	
	
//	public List<IaVO> getChildren() {
//		return children;
//	}
//	public void setChildren(List<IaVO> children) {
//		this.children = children;
//	}
	
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
	public Date getUpdate_date() {
		return update_date;
	}
	public void setUpdate_date(Date update_date) {
		this.update_date = update_date;
	}

	@Override
	public String toString() {
		return "IaVO [ia_no=" + ia_no + ", site_code=" + site_code + ", view_name=" + view_name + ", view_id=" + view_id
				+ ", depth=" + depth + ", parent=" + parent + ", sort=" + sort + ", sort_list=" + sort_list + ", mode="
				+ mode + ", parent_id=" + parent_id + ", id=" + id + ", name=" + name + ", text=" + text + ", link="
				+ link + ", reg_date=" + reg_date + ", update_date=" + update_date + ", file_cnt=" + file_cnt
				+ ", work_request_cnt=" + work_request_cnt + "]";
	}

	
}
