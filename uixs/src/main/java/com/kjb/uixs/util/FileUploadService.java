package com.kjb.uixs.util;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class FileUploadService {
	
	private final FileUploadMapper mapper;
	
	@Autowired
	public FileUploadService(SqlSession session) {
		this.mapper = session.getMapper(FileUploadMapper.class);;
	}
	
	
	public int insertUploadInfoToDB(FileUploadVO fileUploadVo) throws Exception {
		mapper.insertUploadInfo(fileUploadVo);
//		
		System.out.println("fileUploadInsert");
		return fileUploadVo.getFile_id();
//		return 0;
	}
	
	
	public List<FileUploadVO> selectFileInfoFromDB(String rel_table, String rel_table_key) {
		
		Map<String, Object> fileParam = new HashMap<String, Object>();
		
		fileParam.put("rel_table", rel_table);
		fileParam.put("rel_table_key", rel_table_key);
		//mapper.selectUploadFileInfo(rel_table, rel_table_key);
		
		return mapper.selectUploadFileInfo(fileParam);
	}
	
	// ref_table 파라미터를 배열로 전달받아 파일검색
	public List<FileUploadVO> selectFileInfoWithRefsFromDB(String[] rel_table, String rel_table_key) {
		
		return mapper.selectFileInfoWithRefs(rel_table, rel_table_key);
	}
	
	public FileUploadVO selectOneFileInfoFromDB(String file_id) {
		return mapper.selectUploadFileOne(file_id);
	}
	
	public FileUploadVO selectUploadFileOneFromDB(String file_id) {
		return mapper.selectUploadFileOne(file_id);
	}
	
	public void deleteFileInfoFromDB(String file_id) {
		mapper.deleteFileInfo(file_id);
	}
}
