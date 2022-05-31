package com.kjb.uixs.login;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.kjb.uixs.user.UserService;
import com.kjb.uixs.user.UserVO;

@Controller
public class LoginController {
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	
	private final UserService userService;

	
	@Inject
	public LoginController(UserService userService) {
		this.userService = userService;
		
		//System.setProperty("oracle.net.tns_admin", "C:\\work\\project_ui\\oracle_cloud\\Wallet_kjbuixs"); 
	}
	
	@RequestMapping(value = {"/login"})
	public String loginView() {
		//logger.info("userdir:" + System.getProperty("user.dir"));
		
		//System.out.println("dir::::"+System.getProperty("oracle.net.tns_admin"));
		return "/login/logi0100";
	}
	
	/**
	 * 유저 로그인
	 */
	@RequestMapping(value = {"/login.data"}, method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> loginData(
			UserVO paramVo, 
			HttpServletRequest request,
			HttpServletResponse response) {
		
		//HttpServletRequest request =((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		
		Map<String, Object> loginRs = new HashMap<String, Object>();
		
		try {
			UserVO loginUser = userService.selectUserOneFromDB(paramVo.getUserid());
			boolean passwordMatch = false;
			
			if (loginUser == null) {
				loginRs.put("LOGIN", "FAIL");
				loginRs.put("FAIL_TYPE", "ID");
			}
			else {
				BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
				passwordMatch = encoder.matches(paramVo.getPassword(), loginUser.getPassword());
				
				if (!passwordMatch) {
					loginRs.put("LOGIN", "FAIL");
					loginRs.put("FAIL_TYPE", "PASSWORD");
				}
				else {
					setLoginSession(session, loginUser);
					
					/*
					 * session.setMaxInactiveInterval(1800); // 365 * 24 * 60 * 60
					 * session.setAttribute("userid", loginUser.getUserid());
					 * session.setAttribute("username", loginUser.getUsername());
					 * session.setAttribute("team", loginUser.getTeam());
					 * session.setAttribute("part", loginUser.getPart());
					 * session.setAttribute("auth", loginUser.getAuth());
					 */
					
					Cookie loginCookie = new Cookie("loginId", loginUser.getUserid());
					loginCookie.setMaxAge(-1);
					response.addCookie(loginCookie);
					
					loginRs.put("LOGIN", "SUCCESS");
					loginRs.put("FAIL_TYPE", "NONE");
					
					//logger.info("loginid::"+ ((UserVO) session.getAttribute("LOGIN_INFO")).getUserid());
				}
			}
			
		}
		catch(Exception e) {
			loginRs.put("LOGIN", "FAIL");
			loginRs.put("FAIL_TYPE", "SERVER");
			
			e.printStackTrace();
		}
		
		return loginRs;
	}
	
	
	public void setLoginSession(HttpSession session, UserVO loginUser) {
		
		session.setMaxInactiveInterval(1800); //	365 * 24 * 60 * 60
		
		session.setAttribute("userid", loginUser.getUserid()); 
		session.setAttribute("username", loginUser.getUsername()); 
		session.setAttribute("team", loginUser.getTeam()); 
		session.setAttribute("part", loginUser.getPart()); 
		session.setAttribute("auth", loginUser.getAuth()); 
		
	}
	
	public UserVO setLoginInfo(HttpSession session) {
		
		UserVO userVo = new UserVO();
		
		userVo.setUserid((String) session.getAttribute("userid"));
		userVo.setUsername((String) session.getAttribute("username"));
		userVo.setTeam((String) session.getAttribute("team"));
		userVo.setPart((String) session.getAttribute("part"));
		userVo.setAuth((String) session.getAttribute("auth"));
		
		return userVo;
	}
	
	
	/**
	 * userid, 
	 * username, 
	 * team, 팀구분
	 * part,업무구분 PLAN, DESIGN, PUBLISH
	 * auth 권한 WORKER, MANAGER
	 * */
	@RequestMapping(value = {"/login/info.data"}, method=RequestMethod.GET)
	@ResponseBody
	public UserVO loginInfoData(
			HttpServletRequest request, 
			@CookieValue(value="loginId", required = false) Cookie loginIdCookie) {
		
		HttpSession session = request.getSession(true);
		
		UserVO userVo = new UserVO();
		
		if (session.getAttribute("userid") != null && session.getId() != null) {
			
			userVo = setLoginInfo(session);
		}
		else {
			if (loginIdCookie != null) {
				try {
					UserVO loginUser = userService.selectUserOneFromDB(loginIdCookie.getValue());
					if (loginUser != null) {
						setLoginSession(session, loginUser);
						
						userVo = setLoginInfo(session);
					}
				}
				catch(Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		userVo.setPassword(null);
		
		return userVo;
	}
	
	/*
	 * 로그아웃
	 * */
	@RequestMapping(value = {"/logout"}, method=RequestMethod.POST)
	@ResponseBody
	public void logout(
			HttpServletRequest request,
			HttpServletResponse response,
			@CookieValue(value="loginId", required = false) Cookie loginIdCookie) {
		
		HttpSession session = request.getSession(true);
		
		try {
			// 세션 삭제
			if (session.getAttribute("userid") != null) {
				session.invalidate();
			}
			
			// 쿠키 삭제
			if (loginIdCookie != null) {
				loginIdCookie.setValue(null);
				loginIdCookie.setMaxAge(0);
				response.addCookie(loginIdCookie);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
}
