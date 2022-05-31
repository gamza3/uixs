package com.kjb.uixs.user;

import java.util.List;
import java.util.Map;

import com.kjb.uixs.SqlMapper;

@SqlMapper
public interface UserMapper {
	public void insertUser(UserVO userVO) throws Exception;
	
	public void updateUser(UserVO userVO) throws Exception;
	
	public List<UserVO> userList(Map<String, Object> param);
	
	public UserVO selectUserOne(String userid);
	
	/**
	 * 사용자 삭제
	 * @param userVO
	 * @return
	 * @throws Exception
	 */
	public int deleteUser(UserVO userVO) throws Exception;
	
	/**
	 * 전체회원수
	 * @return
	 * @throws Exception
	 */
	public int selectTotUser() throws Exception;
}
