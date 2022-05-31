package com.kjb.uixs.resource;

import java.util.List;
import java.util.Map;

import com.kjb.uixs.SqlMapper;

@SqlMapper
public interface ResourceMapper {
	public int insert(ResourceVO vo) throws Exception;
	
	public List<Map<String, String>> selectList(Map<String, String> param);
}
