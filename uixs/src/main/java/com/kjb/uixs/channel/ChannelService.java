package com.kjb.uixs.channel;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChannelService {
	
	private final ChannelMapper mapper;
	
	@Autowired
	public ChannelService(SqlSession session) {
		this.mapper = session.getMapper(ChannelMapper.class);
	}
	
	
	public List<ChannelVO> channelsFromDB() {
	  return mapper.channels();
	}
	
	public void insertChannelToDB(ChannelVO vo) throws Exception {
		mapper.insertChannel(vo);
	}
	
	public int updateChannelToDB(ChannelVO vo) throws Exception {
		return mapper.updateChannel(vo);
	}
	
	public ChannelVO selectChannelOneFromDB(String code) {
		return mapper.selectChannelOne(code);
	}
	 	
	/*
	 * 
	 * public ChannelVO selectUserOneFromDB(String userid) { ChannelVO userVo =
	 * mapper.selectUserOne(userid);
	 * 
	 * return userVo; }
	 * 
	 * public void insertUserToDB(ChannelVO userVo) throws Exception {
	 * mapper.insertUser(userVo); }
	 * 
	 * public void updateUserToDB(ChannelVO userVo) throws Exception {
	 * mapper.updateUser(userVo); }
	 */
}
