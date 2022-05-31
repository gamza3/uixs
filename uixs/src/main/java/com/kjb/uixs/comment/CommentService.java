package com.kjb.uixs.comment;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kjb.uixs.ia.IaMapper;

@Service
public class CommentService {
	//public List<CommentVO> listAll() throws Exception;
	@Inject
	private SqlSession session;
	private CommentMapper mapper;
	
	@Autowired
	public CommentService(SqlSession session) {
		this.mapper = session.getMapper(CommentMapper.class);
	}
	
	public List<Map<String, Object>> listAll(String ref, String ref_id) {
		//CommentMapper mapper = session.getMapper(CommentMapper.class); 
		
		List<Map<String, Object>> list = mapper.listAll(ref, ref_id);
		
		return list;
	}
	
	public int insert(CommentVO commentVO) throws Exception {
		//CommentMapper mapper = session.getMapper(CommentMapper.class);
		
		mapper.insert(commentVO);
		
		return commentVO.getCmt_no();
	}
	
	public int update(CommentVO commentVO) throws Exception {
		return mapper.update(commentVO);
	}
	
	public void deleteCommentFromDB(String cmt_no) throws Exception {
		//CommentMapper mapper = session.getMapper(CommentMapper.class);
		
		mapper.deleteComment(cmt_no);
	}
}
