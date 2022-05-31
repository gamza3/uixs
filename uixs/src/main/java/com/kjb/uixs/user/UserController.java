package com.kjb.uixs.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	UserService service;
	
	@Autowired
	public UserController(UserService service) {
		this.service = service;
	}
	
	/**
	 * 사용자 목록
	 * @return
	 */
	@RequestMapping (value= {"/user/list.view"})
	public String userListView() {
		return "/user/user0100";
	}
	
	/**
	 * 디비에서 사용자 목록 검색
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping (value= {"/user/list.data"}, method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> userListData(@RequestParam Map<String, Object> param) throws Exception {
		
		System.out.println(param+"[parameter]");
		Map<String, Object> ret = new HashMap<String, Object>();
		
		List<UserVO> list = service.userListFromDB(param);
		int count = service.selectTotUser();
		
		ret.put("list", list);
		ret.put("count", count);
		
		return ret;
	}
	
	/**
	 * 사용자 등록
	 * @return
	 */
	@RequestMapping (value= {"/user/insert.view"})
	public String userInsertView() {
		return "/user/user0200";
	}
	
	/**
	 * 사용자 등록
	 * @return
	 */
	@RequestMapping (value= {"/user/edit.view"}, method=RequestMethod.POST)
	public String userEditView(Model model, @RequestParam Map<String, Object> param) {
		
		model.addAttribute("userid", param.get("userid"));
		model.addAttribute("page", param.get("page"));
		
		return "/user/user0300";
	}
	
	/**
	 * 사용자 정보 디베에 저장
	 * @param userVo
	 */
	@RequestMapping (value = {"/user/insert.data"}, method=RequestMethod.POST)
	@ResponseBody
	public Map<String, String> userInsertData(UserVO userVo) {
		
		Map<String, String> result = new HashMap<String, String>();
		
		
		try {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			
			String securePwd = encoder.encode(userVo.getPassword());
			
			userVo.setPassword(securePwd);
			
			if ("MANAGER".equals(userVo.getPart()) || "ADMIN".equals(userVo.getPart())) {
				userVo.setAuth(userVo.getPart());
			}
			else if ("PLAN".equals(userVo.getPart()) || "DESIGN".equals(userVo.getPart()) || "PUBLISH".equals(userVo.getPart())) {
				userVo.setAuth("WORKER");
			}
			
			service.insertUserToDB(userVo);
			
			// 결과 성공
			result.put("result", "success");
		}
		catch(Exception e) {
			
			// 결과 실패
			result.put("result", "fail");
						
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 사용자 정보 수정
	 * @param userVo
	 */
	@RequestMapping (value = {"/user/edit.data"}, method=RequestMethod.POST)
	@ResponseBody
	public Map<String, String> userEditData(UserVO userVo) {
		
		Map<String, String> result = new HashMap<String, String>();
		
		try {
			
			if (userVo.getPassword() != null && !"".equals(userVo.getPassword())) {
				BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
				
				String securePwd = encoder.encode(userVo.getPassword());
				
				userVo.setPassword(securePwd);
			}
			else {
				userVo.setPassword(null);
			}
			
			if ("MANAGER".equals(userVo.getPart())) {
				userVo.setAuth("MANAGER");
			}
			else if ("PLAN".equals(userVo.getPart()) || "DESIGN".equals(userVo.getPart()) || "PUBLISH".equals(userVo.getPart())) {
				userVo.setAuth("WORKER");
			}
				
			
			service.updateUserToDB(userVo);
			
			// 결과 성공
			result.put("result", "success");
		}
		catch(Exception e) {
			
			// 결과 실패
			result.put("result", "fail");
			
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 사용자 정보 검색
	 * @param userid
	 * @return
	 */
	@RequestMapping (value= {"/user/user.data"}, method=RequestMethod.POST)
	@ResponseBody
	public UserVO userData(String userid) {
		UserVO userVo = service.selectUserOneFromDB(userid);
		System.out.println(userid+"userVo: "+userVo);
		
		if (userVo == null) {
			userVo = new UserVO();
		}
		
		return userVo;
	}
	
	/**
	 * 사용자 정보 검색
	 * @param userid
	 * @return
	 */
	@RequestMapping (value= {"/user/passwordMatch.data"}, method=RequestMethod.POST)
	@ResponseBody
	public boolean userPasswordMatch(@RequestParam Map<String, Object> param) {
		
		boolean match = false;
		
		UserVO userVo = service.selectUserOneFromDB((String)param.get("userid"));
		
		String old_password = (String) param.get("old_password");
		
		if (userVo != null) {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			
			match = encoder.matches(old_password, userVo.getPassword());
		}
		
		return match;
	}
	
	
	/**
	 * 사용자 삭제
	 * @param userVo
	 * @return
	 */
	@RequestMapping (value= {"/user/del.data"}, method=RequestMethod.POST)
	@ResponseBody
	public Map<String, String> userDelData(UserVO userVo, HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		
		try {
			// 세션
			HttpSession session = request.getSession(true);
			
			// 로그인세션 권한 유무
			if (session.getAttribute("auth") != null) {
				
				String auth = (String) session.getAttribute("auth");
				
				// 로그인세션의 권한이 관리자인경우
				if ("ADMIN".equals(auth)) {
					int isDel = service.deleteUserToDB(userVo);
					
					logger.info("isDel["+isDel+"]");
					
					if (isDel > 0) {
						resultMap.put("RESULT", "SUCCESS");
						resultMap.put("MESSAGE", "사용자 삭제가 완료 되었습니다.");
					}
					else {
						resultMap.put("RESULT", "FAIL");
						resultMap.put("MESSAGE", "삭제중 오류가 발생 하였습니다!");
					}
				}
				else {
					resultMap.put("RESULT", "FAIL");
					resultMap.put("MESSAGE", "삭제 권한이 없습니다.");
				}
			}
			else {
				resultMap.put("RESULT", "FAIL");
				resultMap.put("MESSAGE", "로그인 후 이용해주세요.");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			resultMap.put("RESULT", "FAIL");
			resultMap.put("MESSAGE", "삭제중 오류가 발생 하였습니다!");
		}
		
		return resultMap;
	}
}


