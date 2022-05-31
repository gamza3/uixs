package com.kjb.uixs.user;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	private SqlSession session;
	private final UserMapper mapper;
	
	@Autowired
	public UserService(SqlSession session) {
		this.session = session;
		this.mapper = session.getMapper(UserMapper.class);
	}
	
	
	public List<UserVO> userListFromDB(Map<String, Object> param) {
		List<UserVO> list = mapper.userList(param);
		
		return list;
	}
	
	public UserVO selectUserOneFromDB(String userid) {
		UserVO userVo = mapper.selectUserOne(userid);
		
		return userVo;
	}
	
	public void insertUserToDB(UserVO userVo) throws Exception {
		mapper.insertUser(userVo);
	}
	
	public void updateUserToDB(UserVO userVo) throws Exception {
		mapper.updateUser(userVo);
	}
	
	public int deleteUserToDB(UserVO userVo) throws Exception {
		return mapper.deleteUser(userVo);
	}
	
	/**
	 * 사용자 전체 수
	 * @return
	 * @throws Exception
	 */
	public int selectTotUser() throws Exception {
		return mapper.selectTotUser();
	}

}
