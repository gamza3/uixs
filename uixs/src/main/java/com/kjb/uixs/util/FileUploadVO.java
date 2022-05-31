package com.kjb.uixs.util;

import org.apache.ibatis.type.Alias;

@Alias("FileUploadVO")
public class FileUploadVO {
	private int file_id;
	private String rel_table;
	private String rel_table_key;
	private String original_filename;
	private String save_filename;
	private String upload_path;
	private String upload_fullpath;
	
	public int getFile_id() {
		return file_id;
	}
	public void setFile_id(int file_id) {
		this.file_id = file_id;
	}
	public String getRel_table() {
		return rel_table;
	}
	public void setRel_table(String rel_table) {
		this.rel_table = rel_table;
	}
	public String getRel_table_key() {
		return rel_table_key;
	}
	public void setRel_table_key(String rel_table_key) {
		this.rel_table_key = rel_table_key;
	}
	public String getOriginal_filename() {
		return original_filename;
	}
	public void setOriginal_filename(String original_filename) {
		this.original_filename = original_filename;
	}
	public String getSave_filename() {
		return save_filename;
	}
	public void setSave_filename(String save_filename) {
		this.save_filename = save_filename;
	}
	public String getUpload_path() {
		return upload_path;
	}
	public void setUpload_path(String upload_path) {
		this.upload_path = upload_path;
	}
	
	
	public String getUpload_fullpath() {
		return upload_fullpath;
	}
	public void setUpload_fullpath(String upload_fullpath) {
		this.upload_fullpath = upload_fullpath;
	}
	
	@Override
	public String toString() {
		return "FileUploadVO [file_id=" + file_id + ", rel_table=" + rel_table + ", rel_table_key=" + rel_table_key
				+ ", original_filename=" + original_filename + ", save_filename=" + save_filename + ", upload_path="
				+ upload_path + ", upload_fullpath=" + upload_fullpath + "]";
	}
	
	
	
}
