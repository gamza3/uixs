package com.kjb.uixs.socket;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.kjb.uixs.login.LoginController;


public class EchoHandler extends TextWebSocketHandler {
	private static final Logger logger = LoggerFactory.getLogger(EchoHandler.class);
	
	// 로그인 한 전체
	List<WebSocketSession> sessions = new ArrayList<WebSocketSession>();
	private static List<WebSocketSession> sessionList = new ArrayList<WebSocketSession>();
	
	// 1대1
	Map<String, WebSocketSession> users = new ConcurrentHashMap<String, WebSocketSession>();
    
	@Inject
	MessageService msgService;
	
	@Autowired
	public EchoHandler(MessageService service) {
		this.msgService = service;
	}
	//  Map<String,WebSocketSession> us ers = new HashMap<>();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		String user_name = searchUserName(session);
		String userid = getUser(session, "userid");
		
//		if (user_name != null) {
//			logger.info(user_name+ " 연결됨");
//			users.put(user_name, session);
//		}
//		
//		for (Entry<String, WebSocketSession> entry : users.entrySet()) {
//			System.out.println("[key]:" + entry.getKey() + ", [value]:" + entry.getValue());
//		}
		
		sessionList.add(session);
		
		if (userid != null) {
			Map<String, Object> msg = msgService.selectNoReadMessageFromDB(userid);
			
			if (msg != null) {
				String msgContent = (String) msg.get("CONTENT");
				
				session.sendMessage(new TextMessage(msgContent));
			}
		}
	}

	/**
	 * 클라이언트에서 data 전송시
	 */
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
	    String user_name= searchUserName(session);
	
	    logger.info(user_name+"데이터 전송자");
	    
	    // 특정 유저에게 보내기
	    String msg = message.getPayload();
	    
	    logger.info(msg+": 데이터");
	    
	    if (msg != null) {
	    	String[] strs = msg.split(",");
	    	logger.info(strs.toString());
	    	
	    	if(strs != null && strs.length == 4) {
	    		String sender_id = strs[0];
	    		String receiver_auth = strs[1];
	    		String receiver_part = strs[2];
	    		String content = strs[3];
	    		
	    		//WebSocketSession targetSession = users.get(receiver); // 메시지를 받을 세션 조회
	    		
	    		// 실시간 접속시
//	    		if(targetSession != null) {
//	    			// ex: [&분의일] 신청이 들어왔습니다.
//	    			TextMessage tmpMsg = new TextMessage("<a target='_blank' href='"+url+"'>[<br>" + sender + "</b>]" + content + "</a>");
//	    			targetSession.sendMessage(tmpMsg);
//	    		}
	    		
	    		TextMessage tmpMsg = new TextMessage(content);
	    		
	    		for(WebSocketSession sess: sessionList) {
	    			Map<String, Object> user = sess.getAttributes();
	    			
	    			String part = (String) user.get("part");
	    			String auth = (String) user.get("auth");
	    			
	    			if (!"".equals(receiver_part)) {
	    				if (part.equals(receiver_part) && auth.equals(receiver_auth)) {
	    					sess.sendMessage(tmpMsg);
	    				}
	    			}
	    			else {
	    				if (auth.equals(receiver_auth)) {
	    					sess.sendMessage(tmpMsg);
	    				}
	    			}
	    			
	    			logger.info("user map["+user);
	    		}
	    	}
	    }
	      
	//      //사용자가 접속중인지 아닌지
	//      WebSocketSession chatwritingSession = users.get("user_name");
	//      if(chatwritingSession != null) {
	//          TextMessage textMessage = new TextMessage(user_name+ " 님이 메세지를 보냈습니다.");
	//          chatwritingSession.sendMessage(textMessage);
	//      }
//	     for(WebSocketSession sess: sessionList) {
//	         sess.sendMessage(new TextMessage(user_name+": "+message.getPayload()));
//	     }
	}
	 
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
	    String senderName = searchUserName(session);
	    
	    if (senderName != null) { // 로그인한 상태에서만
	    	logger.info(senderName + "연결 종료됨");
	    	users.remove(senderName);
//	    	session.remove(session);
	    }
	    
	    for(WebSocketSession sess : sessionList) {
	        //sess.sendMessage(new TextMessage(senderName+"님의 연결이 끊어졌습니다."));
	    }
	    sessionList.remove(session);
	}
	
	// 에러발생시 
	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		logger.info(session.getId() + "익셉션 발생:" + exception.getMessage());
	}
	  
	public String searchUserName(WebSocketSession session)throws Exception {
	    String user_name;
	    Map<String, Object> map;
	     
	    map = session.getAttributes();
	    user_name = (String) map.get("username");
	      
	    return user_name == null ? null : user_name;
	}
	
	public String getUser(WebSocketSession session, String attr)throws Exception {
		String ret;
		Map<String, Object> map;
		
		map = session.getAttributes();
		ret = (String) map.get(attr);
		
		return ret == null ? null : ret;
	}
}