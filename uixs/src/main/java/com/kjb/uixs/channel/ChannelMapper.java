package com.kjb.uixs.channel;

import java.util.List;
import java.util.Map;

import com.kjb.uixs.SqlMapper;

@SqlMapper
public interface ChannelMapper {
	// 채널목록 select
	public List<ChannelVO> channels();
	
	// 채널 insert
	public void insertChannel(ChannelVO vo) throws Exception;
	
	// 채널 update
	public int updateChannel(ChannelVO vo) throws Exception;
	
	// 채널 하나 select
	public ChannelVO selectChannelOne(String code);
}
