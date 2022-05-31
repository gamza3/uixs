package com.kjb.uixs.resource;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResourceService {
	private final ResourceMapper mapper;
	
	@Autowired
	public ResourceService(SqlSession session) {
		this.mapper = session.getMapper(ResourceMapper.class);
	}
	
	public int insertToDB(ResourceVO vo) throws Exception {
		mapper.insert(vo);
		
		return vo.getId();
	}
	
	public List<Map<String, String>> selectListFromDB(Map<String, String> param) {
		return mapper.selectList(param);
	}
}
