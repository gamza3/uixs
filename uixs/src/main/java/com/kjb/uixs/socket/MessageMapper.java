package com.kjb.uixs.socket;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.kjb.uixs.SqlMapper;
import com.kjb.uixs.user.UserVO;

@SqlMapper
public interface MessageMapper {
	public String selectCountMessageView(@Param(value="receiver_id") String receiver_id) throws Exception;
	
	public Map<String, Object> selectNoReadMessage(String receiver_id) throws Exception;
	
	public List<Map<String, Object>> selectUser(Map<String, String> param) throws Exception;
	
	public void insertMsg(Map<String, String> param);
	
	public List<Map<String, Object>> selectAllMessage(Map<String, String> param) throws Exception;
	
	/**
	 * 메세지 읽음으로 업데이트
	 * @param param
	 * @throws Exception
	 */
	public void updateReadY(Map<String, String> param) throws Exception;
}
