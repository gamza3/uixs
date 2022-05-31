package com.kjb.uixs.util;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.kjb.uixs.SqlMapper;

@SqlMapper
public interface FileUploadMapper {
	// fileInfoInsert <-- Mapper.xml 의 아이디
	public int insertUploadInfo(FileUploadVO fileUploadVo) throws Exception;
	
	public void deleteFileInfo(String file_id);
	
	// 파일업로드 정보 검색
	public List<FileUploadVO> selectUploadFileInfo(Map<String, Object> param);
	
	// 파일하나 검색
	public FileUploadVO selectUploadFileOne(String file_id);

	public List<FileUploadVO> selectFileInfoWithRefs(@Param("array") String[] rel_table, @Param("rel_table_key") String rel_table_key);
	
}
