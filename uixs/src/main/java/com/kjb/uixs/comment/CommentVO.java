package com.kjb.uixs.comment;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kjb.uixs.util.FileUploadVO;

public class CommentVO {
	private int cmt_no;
	private String writer_type;
	private String content;
	private String writer;
	private Date regdate;
	private String ref;
	private String ref_id;
	private String username;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getCmt_no() {
		return cmt_no;
	}
	public void setCmt_no(int cmt_no) {
		this.cmt_no = cmt_no;
	}
	
	public String getWriter_type() {
		return writer_type;
	}
	public void setWriter_type(String write_type) {
		this.writer_type = write_type;
	}
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	
	public String getRef() {
		return ref;
	}
	
	public void setRef(String ref) {
		this.ref = ref;
	}
	
	public String getRef_id() {
		return ref_id;
	}
	
	public void setRef_id(String ref_id) {
		this.ref_id = ref_id;
	}
	
	@Override
	public String toString() {
		return "CommentVO [cmt_no=" + cmt_no + ", write_type=" + writer_type + ", content=" + content + ", writer="
				+ writer + ", regdate=" + regdate + ", getCmt_no()=" + getCmt_no() + ", getWrite_type()="
				+ getWriter_type() + ", getContent()=" + getContent() + ", getWriter()=" + getWriter()
				+ ", getRegdate()=" + getRegdate() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}
}
