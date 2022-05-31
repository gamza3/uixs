package com.kjb.uixs;

import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kjb.uixs.user.UserService;
import com.kjb.uixs.user.UserVO;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Inject
	private UserService userService;
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		//UserVO userList = userService.userList("sys");
		
		//model.addAttribute("serverTime", formattedDate);
		//model.addAttribute("userList", userList);
		
		return "home";
	}
	
	@ResponseBody
	@RequestMapping("/join")
	public Map<String, Object> join() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name", "victolee");
		map.put("age", 26);
		
		return map;
	}
	
	@RequestMapping(value= {"/userListJson"})
	@ResponseBody
	public UserVO userList() {
//		Map<String, Object> result = new HashMap<String, Object>();
		
		//UserVO userList = userService.userList("sys");
		
//		result.put("userList", userList);
		
		return null;
	}
}
