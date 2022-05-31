package com.kjb.uixs.comment;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.kjb.uixs.SqlMapper;

@SqlMapper
public interface CommentMapper {
	public List<Map<String, Object>> listAll(@Param("ref") String ref, @Param("ref_id") String ref_id);
	
	public int insert(CommentVO commentVO) throws Exception;
	
	public int update(CommentVO commentVO) throws Exception;
	
	public void deleteComment(String cmt_no) throws Exception;
}
