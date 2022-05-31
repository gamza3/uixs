package com.kjb.uixs.socket;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
	
	private final MessageMapper mapper;
	
	@Autowired
	public MessageService(SqlSession session) {
		this.mapper = session.getMapper(MessageMapper.class);
	}
	
	/**
	 * 사유저별 읽지않은 메세지 조회
	 * @param receiver_name
	 * @return
	 * @throws Exception
	 */
	public String selectCountMessageViewFromDB(String receiver_id) throws Exception {
		return mapper.selectCountMessageView(receiver_id);
	}
	
	/**
	 * 권한또는 작업파트별 유저 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectUserFromDB(Map<String, String> param) throws Exception {
		return mapper.selectUser(param);
	}
	
	/**
	 * 메세지 db 저장
	 * @param param
	 */
	public void insertMsgToDB(Map<String, String> param) {
		mapper.insertMsg(param);
	}
	
	/**
	 * 읽지않은 사용자 메세지
	 * @param receiver_id
	 * @return
	 */
	public Map<String, Object> selectNoReadMessageFromDB(String receiver_id) {
		
		Map<String, Object> ret = null;
		
		try {
			ret = mapper.selectNoReadMessage(receiver_id);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return ret;
	}
	
	/**
	 * 사용자에게 전달된 전체메세지
	 * @param receiver_id
	 * @return
	 */
	public List<Map<String, Object>> selectAllMessageFromDB(Map<String, String> param) throws Exception {
		return mapper.selectAllMessage(param);
	}
	
	/**
	 * 메세지 읽음으로 수정
	 * @param param {receiver_id}
	 * @throws Exception
	 */
	public void updateReadYToDB(Map<String, String> param) throws Exception {
		mapper.updateReadY(param);
	}
}
