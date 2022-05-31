package com.kjb.uixs.channel;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

@Controller
public class ChannelController {
	private static final Logger logger = LoggerFactory.getLogger(ChannelController.class);
	

	ChannelService service;
	
	@Autowired
	public ChannelController(ChannelService service) {
		this.service = service;
	}
	
	/**
	 * 채널 목록
	 * @return
	 */
	@RequestMapping (value= {"/chan/list.view"})
	public String chanListView() {
		return "/chan/chan0100";
	}
	
	/**
	 * 채널 등록
	 * @return
	 */
	@RequestMapping (value= {"/chan/insert.view"})
	public String chanInsertView() {
		return "/chan/chan0200";
	}
	
	/**
	 * 채널 수정
	 * @return
	 */
	@RequestMapping (value= {"/chan/update.view"}, method = RequestMethod.POST)
	public String chanUpdateView(@RequestParam String code, Model model) {
		
		model.addAttribute("code", code);
		
		return "/chan/chan0300";
	}
	
	/**
	 * 디비에서 채널 목록 검색
	 * @return
	 */
	@RequestMapping (value= {"/chan/channels.data"}, method = RequestMethod.POST)
	@ResponseBody
	public List<ChannelVO> channelsData() {
		
		return service.channelsFromDB();
	}

	/**
	 * 채널 등록 process 처리후 완료페이지로 redirect
	 * */
	@RequestMapping (value= {"/chan/insert.data"}, method = RequestMethod.POST)
	public String insertData(ChannelVO param, RedirectAttributes redirect) {
		
		try {
			service.insertChannelToDB(param);
			
			redirect.addFlashAttribute("param", param);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return "redirect:/chan/insert/complete.view";
	}
	
	/**
	 * 채널 등록 완료 페이지
	 * */
	@RequestMapping (value= {"/chan/insert/complete.view"})
	public String insertEndView(HttpServletRequest request, Model model) {
		
		Map<String, ?> flashMap = RequestContextUtils.getInputFlashMap(request);
		
		ChannelVO param = new ChannelVO();
		
        if(flashMap!=null) {
            
        	param = (ChannelVO)flashMap.get("param");
        	
        	model.addAttribute("name", param.getName());
        	model.addAttribute("code", param.getCode());
        	model.addAttribute("device", param.getDevice());
        	model.addAttribute("cuser", param.getCuser());
        }
		
		logger.info("paramCode:::"+param.getCode());
		logger.info("paramName:::"+param.getName());
		
		return "/chan/chan0201";
	}
	
	
	/**
	 * 채널 하나 검색
	 * */
	@RequestMapping (value = {"/chan/channelone.data"}, method=RequestMethod.POST) 
	@ResponseBody
	public ChannelVO channelOneData(String code){
		
		ChannelVO vo = service.selectChannelOneFromDB(code);
		
		if (vo == null) {
			vo = new ChannelVO();
		}
		
		return vo;
	}
	
	/**
	 * 채널정보 수정 process
	 * */
	@RequestMapping (value = {"/chan/update.data"}, method=RequestMethod.POST)
	public String updateData(ChannelVO vo, RedirectAttributes redirect) {
		
		try {
			if(service.updateChannelToDB(vo) > 0) {
				redirect.addFlashAttribute("param", vo);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return "redirect:/chan/update/complete.view";
	}
	
	/**
	 * 채널 수정완료
	 * */
	@RequestMapping (value = {"/chan/update/complete.view"})
	public String updateEndView(HttpServletRequest request, Model model) {
		
		Map<String, ?> flashMap = RequestContextUtils.getInputFlashMap(request);
		
		ChannelVO param = new ChannelVO();
		
        if(flashMap!=null) {
            
        	param =(ChannelVO)flashMap.get("param");
        	
        	model.addAttribute("name", param.getName());
        	model.addAttribute("code", param.getCode());
        	model.addAttribute("device", param.getDevice());
        	model.addAttribute("cuser", param.getCuser());
        }
        
		return "/chan/chan0301";
	}
}


