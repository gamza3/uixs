package com.kjb.uixs.resource;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.zeroturnaround.zip.ZipUtil;

import com.kjb.uixs.user.UserController;
import com.kjb.uixs.util.FileUpload;
import com.kjb.uixs.util.FileUploadVO;

@Controller
public class ResourceController {
	private static final Logger logger = LoggerFactory.getLogger(ResourceController.class);
	
	private ResourceService service;
	private FileUpload fileUpload;
	
	@Autowired
	public ResourceController(ResourceService service, FileUpload fileUpload) {
		this.service = service;
		this.fileUpload = fileUpload;
	}
	
	@RequestMapping (value= {"/resource/list.view"})
	public String resource() {
		return "/file/file0100";
	}
	
	@RequestMapping(value= {"/resource/list.data"}, method = RequestMethod.POST)
	@ResponseBody
	public List<Map<String, String>> listData(@RequestParam Map<String, String> param) {

		List<Map<String, String>> rs = null;
		
		try {
			rs = service.selectListFromDB(param);	
		}
		catch(Exception e) {
			rs = new ArrayList<Map<String, String>>();
			e.printStackTrace();
		}
		
		return rs;
	}
	
	/**
	 * 파일관리메뉴에서 resource 파일 업로드
	 * */
	@RequestMapping(value= {"/resource/insert.data"}, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> insertData(
			MultipartHttpServletRequest mtfRequest, 
			ResourceVO vo) {
		
		HttpServletRequest request =((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		// return object
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			String siteCode = vo.getSite_code();
			
			int id = service.insertToDB(vo);
			// 파일 업로드
			// 파일업로드 추가정보 : 데이터베이스 저장용
			Map<String, Object> uploadAddInfo = new HashMap<String, Object>();
			
			// 관련 태이블명
			uploadAddInfo.put("rel_table", "RESOURCE");
			// 관련 태이블 키값
			uploadAddInfo.put("rel_table_key", Integer.toString(id));
			// 업로드 경로
			uploadAddInfo.put("path", "/resources/"+siteCode+"/");
			
			List<FileUploadVO> savedFileInfo = new ArrayList<FileUploadVO>();
			// 업로드 파일 정보 list  
			savedFileInfo = fileUpload.upload(mtfRequest, request, uploadAddInfo);
			
			
			if (savedFileInfo.size() > 0 && "RESOURCE".equals(vo.getType())) {
				for (int i=0; i < savedFileInfo.size(); i++) {
					FileUploadVO addFile = savedFileInfo.get(i);
					
					String fullPath = addFile.getUpload_fullpath();
					String fileName = addFile.getSave_filename();
					
					logger.info("fullPath::"+fullPath);
					logger.info("fileName::"+fileName);
					ZipUtil.unpack(new File(fullPath+fileName), new File(fullPath));
				}
			}
			//ZipUtil.pack(new File("압축할 경로"), new File("생성될압축파일명"+".zip"));
			//ZipUtil.unpack(new File("압축해제할 파일경로및 파일명"), new File("압축해제할경로"));
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return map;
	}
	
	
}
