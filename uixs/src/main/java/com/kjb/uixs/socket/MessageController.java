package com.kjb.uixs.socket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MessageController {
	private static final Logger logger = LoggerFactory.getLogger(MessageController.class);
	
	MessageService service;
	
	@Autowired
	public MessageController(MessageService service) {
		this.service = service;
	}
	
	/**
	 * 메세지 저장
	 * @param param
	 * @return
	 */
	@RequestMapping (value= {"/msg/send"}, method = RequestMethod.POST)
	@ResponseBody
	public String msgSend(@RequestParam Map<String, String> param) {
		
		String ret;
		
		try {
			// 유저 조회 auth 또는 part 로 조회
			List<Map<String, Object>> users = service.selectUserFromDB(param);
			
			// 조회된 유저가 있을경우
			if (users.size() > 0) {
				// 유저 별로 메세지 저장
				for(Map<String, Object> user : users) {
//					Map<String, String> msgParam = new HashMap<String, String>();
					
					param.put("receiver_id", (String) user.get("USERID"));
					
					// 메세지 내용 저장
					service.insertMsgToDB(param);
				}
			}
			
			ret = "SUCCESS";
		}
		catch(Exception e) {
			e.printStackTrace();
			
			ret = "FAIL";
		}
		
		return ret;
	}
	
	
	/**
	 * 읽지않은 메세지 갯수
	 * @param receiver_id
	 * @return
	 */
	@RequestMapping (value= {"/msg/get"}, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getMsg(String receiver_id) {
		
		Map<String, Object> ret = new HashMap<String, Object>();
		
		String cnt = "";
		
		try {
			cnt = service.selectCountMessageViewFromDB(receiver_id);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		ret.put("MSG_CNT", cnt);
		
		return ret;
	}
	
	/**
	 * 사용자전체 메세지 top 20
	 * @param param
	 * @return
	 */
	@RequestMapping (value= {"/msg/get_all"}, method = RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getAllMsg(@RequestParam Map<String, String> param) {
		List<Map<String, Object>> ret = new ArrayList<Map<String, Object>>();
		
		try {
			ret = service.selectAllMessageFromDB(param);
			
			// 메세지 읽음으로 표시
			if (ret.size() > 0) {
				service.updateReadYToDB(param);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return ret;
	}
	
	/**
	 * 메세지 읽음으로 수정
	 * @param param
	 * @return
	 */
	public String setMsgRead(@RequestParam Map<String, String> param) {
		
		String ret = "";
		
		try {
			service.updateReadYToDB(param);
			
			ret = "SUCCESS";
		}
		catch(Exception e) {
			e.printStackTrace();
			
			ret = "FAIL";
		}
		
		return ret;
	}
}
