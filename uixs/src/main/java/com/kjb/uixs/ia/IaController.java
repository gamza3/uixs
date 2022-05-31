package com.kjb.uixs.ia;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.kjb.uixs.user.UserController;
import com.kjb.uixs.util.FileUpload;
import com.kjb.uixs.util.FileUploadVO;
import com.kjb.uixs.work.WorkVO;

@Controller
public class IaController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	private IaService service;
	private FileUpload fileUpload;
	
	@Autowired
	public IaController(IaService service, FileUpload fileUpload) {
		this.service = service;
		this.fileUpload = fileUpload;
	}
	
	@RequestMapping(value = {"/ia/list.view"})
	public String listView(Model model) {
		//List<IaVO> list = service.iaList();
		HttpServletRequest request =((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		String rootPath = request.getSession().getServletContext().getRealPath("/");
		
		model.addAttribute("rpath", rootPath);
		
		return "menu/menu0300";
	}
	
	@RequestMapping(value = {"/ia/manage"})
	public String manage() {
		return "menu/menu0200";
	}
	
	@RequestMapping(value = {"/ia/cal"})
	public String publist() {
		return "menu/menu0100";
	}
	
	@RequestMapping(value = {"/ia/iadata"})
	@ResponseBody
	public List<IaVO> iaData(IaVO iaVo) {
		List<IaVO> datas = service.selectIaTreeFromDB(iaVo);//new ArrayList<IaVO>();
		
		return datas;
	}
	
	/**
	 * 화면목록 데이터 조회
	 * @param iaVo
	 * @return
	 */
	@RequestMapping(value = {"/ia/menulist"})
	@ResponseBody
	public List<IaVO> iaListData(IaVO iaVo) {
		
		List<IaVO> datas = new ArrayList<IaVO>();
		
		try {
			datas = service.selectIaTreeForViewFromDB(iaVo);//new ArrayList<IaVO>();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		logger.info("datas:" + datas);
		
		return datas;
	}
	
	/**
	 * 화면목록 - 화면 경로를 포함하여 조회
	 * @param iaVo
	 * @return
	 */
	@RequestMapping(value = {"/ia/ialist"})
	@ResponseBody
	public List<IaVO> ialist(IaVO iaVo) {
		
		List<IaVO> datas = new ArrayList<IaVO>();
		
		datas = service.selectIaTreeForViewFromDB2(iaVo);//new ArrayList<IaVO>();
		
		logger.info("datas:" + datas);
		return datas;
	}	
	
	/**
	 * ia 내용 상세조회
	 * @param iaVo
	 * @return IaVO
	 */
	@RequestMapping(value = {"/ia/iadetail"}, method = RequestMethod.POST)
	@ResponseBody
	public IaVO iaDetail(IaVO iaVo) {
		
		IaVO datas = new IaVO();
		logger.info("iaVo: " + iaVo);
		datas = service.selectIaOne(iaVo);//new ArrayList<IaVO>();
		
		logger.info("datas:" + datas);
		return datas;
	}	
	
	@RequestMapping(value = {"/ia/add"}, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> add(IaVO iaVo) {
		int sort = 0;
		try {
			sort = service.selectMaxSortFromDB(iaVo);
			
			iaVo.setSort(sort+1);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		String id = service.addIaTreeToDB(iaVo);
		
		Map<String, Object> ret = new HashMap<String, Object>();
		ret.put("id", id);
		
		return ret;
	}
	
	@RequestMapping(value = {"/ia/update"}, method = RequestMethod.POST)
	@ResponseBody
	public String update(IaVO iaVo) {
		String ret;
		try {
			service.updateIaTreeToDB(iaVo);
			
			if (iaVo.getSort_list() != null ) {
				service.updateIaSortToDB(iaVo);
			}
			
			ret = "SUCCESS";
		}
		catch(Exception e) {
			e.printStackTrace();
			
			ret = "FAIL";
		}
		
		return ret;
	}
	
	@RequestMapping(value = {"/ia/delete"}, method = RequestMethod.POST)
	@ResponseBody
	public String delete(String id) {
		
		String ret;
		
		try {
			service.deleteIaTreeToDB(id);
			
			ret = "SUCCESS";
		}
		catch(Exception e) {
			e.printStackTrace();
			
			ret = "FAIL";
		}
		
		return ret;
	}
	
	@RequestMapping(value = {"/ia/files"}, method = RequestMethod.POST)
	@ResponseBody
	public List<FileUploadVO> iaFiles(@RequestParam Map<String, Object> param) {
		
		String id = (String) param.get("id");
		List<FileUploadVO> ret = new ArrayList<FileUploadVO>();
		
		try {
			String[] ref_tables = {"IA_HTML", "IA_PPT"};
		
//			System.out.println(id);
//			System.out.println(ref_tables);
			
			ret = fileUpload.selectFileInfoWithRefs(ref_tables, id);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return ret;
	}
	
	/**
	 * ia tree 에서 html 파일 업로드
	 * */
	@RequestMapping(value= {"/ia/uploadfile"}, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> uploadfile(
			MultipartHttpServletRequest mtfRequest, 
			HttpServletRequest request) {
		
		// return object
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			String id = request.getParameter("id"); 
			String siteCode = request.getParameter("site_code");
			// 첨부된파일 아이디 : 기 첨부된파일 삭제를 위해
			String[] file_id = request.getParameterValues("file_id");
			
			// 파일 구분 Default = 연관된 태이블명
			String ref_table = "IA_TREE";
			logger.info("file_ids"+file_id);
			System.out.close();
			
			if (file_id != null) {
				List<Object> delFileInfoList = new ArrayList<Object>();
				
				for(int i = 0; i < file_id.length; i++) {
					Map<String, Object> delFileInfo = new HashMap<String, Object>();
					
					if (!"".equals(file_id[i])) {
						delFileInfo.put("file_id", file_id[i]);
						delFileInfoList.add(delFileInfo);
					}
					
				}
				
				if (delFileInfoList.size() > 0) {
					fileUpload.deleteFiles(delFileInfoList);
				}
			}
			// 첨부파일 아이디가 있는경우 파일 및 db 삭제 실행
//			if (file_id.size()) {
//				Map<String, Object> delFileInfo = new HashMap<String, Object>();
//				List<Object> delFileInfoList = new ArrayList<Object>();
//				
//				delFileInfo.put("file_id", file_id);
//				
//				delFileInfoList.add(delFileInfo);
//				
//				fileUpload.deleteFiles(delFileInfoList);
//			}
			
			logger.info("iaId:" + id);
			// 파일 업로드
			// 파일업로드 추가정보 : 데이터베이스 저장용
			Map<String, Object> uploadAddInfo = new HashMap<String, Object>();
			
			// 관련 태이블명
			uploadAddInfo.put("rel_table", ref_table);
			// 관련 태이블 키값
			uploadAddInfo.put("rel_table_key", id);
			// 업로드 경로
			uploadAddInfo.put("path", "/resources/"+siteCode);
			
			// 업로드 파일 정보 list
			fileUpload.upload(mtfRequest, request, uploadAddInfo);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return map;
	}
	
	/**
	 * ia tree 에서 html 파일 삭제
	 * */
	@RequestMapping(value= {"/ia/delete_iafile"}, method = RequestMethod.POST)
	@ResponseBody
	public String delete_iafile(String file_id) {
		Map<String, Object> delFileInfo = new HashMap<String, Object>();
		List<Object> delFileInfoList = new ArrayList<Object>();
		
		String result = "";
		try {
			delFileInfo.put("file_id", file_id);
			
			delFileInfoList.add(delFileInfo);
			
			fileUpload.deleteFiles(delFileInfoList);
			
			result = "SUCCESS";
		}
		catch(Exception e) {
			result = e.getMessage();
			
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 메뉴에 요청된 작업 목록
	 * @param param
	 * @return
	 */
	@RequestMapping(value= {"/ia/request_work_list"})
	@ResponseBody
	public List<Map<String, Object>> selectRequestWorkForIaFromDB(@RequestParam Map<String, String> param) {
		List<Map<String, Object>> ret = new ArrayList<Map<String, Object>>();
		
		try {
			ret = service.selectRequestWorkForIaFromDB(param);
			
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return ret;
	}

}
