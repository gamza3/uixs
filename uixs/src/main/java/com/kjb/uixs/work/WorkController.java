package com.kjb.uixs.work;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.kjb.uixs.ia.IaService;
import com.kjb.uixs.ia.IaVO;
import com.kjb.uixs.user.UserController;
import com.kjb.uixs.util.FileUpload;
import com.kjb.uixs.util.FileUploadVO;

@Controller
public class WorkController {
	private static final Logger logger = LoggerFactory.getLogger(WorkController.class);
	
	private WorkService service;
	
	private FileUpload fileUpload;
	
	private IaService iaService;
	
	
	
	@Autowired
	public WorkController(WorkService service, FileUpload fileUpload, IaService iaService) {
		this.service = service;
		this.fileUpload = fileUpload;
		this.iaService = iaService;
	}
	
	/**
	 * 작업요청 view
	 * @return
	 */
	@RequestMapping(value = {"/work/request/insert.view"})
	public String Request() {
		return "work/work0200";
	}
	
	/**
	 * 작업관리 view
	 * @return
	 */
	@RequestMapping(value = {"/work/list.view"})
	public String WorkList() {
		return "work/work0100";
	}
	
	/**
	 * 작업관리 view
	 * @return
	 */
	@RequestMapping(value = {"/work0300"})
	public String WorkList2() {
		return "work/work0300";
	}
	
	/**
	 * 작업요청항목 및 첨부파일 저장
	 * @param workVo
	 * @param mtfRequest
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value= {"/work/request/insert.data"}, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> insert(
			WorkVO workVo, 
			MultipartHttpServletRequest mtfRequest, 
			HttpServletRequest request) {
		
		
		// return object
		Map<String, Object> map = new HashMap<String, Object>();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		
		Date now = new Date();
		// 오늘 날짜 
		String nowDate = sdf.format(now);
		
		// 작업요청 구분 : NEW = 신규, EDIT = 수정 
		String requestIdStartChar;
		try {
			requestIdStartChar = "NEW".equals(workVo.getRequest_type()) ? "N" : "E";
		}
		catch (Exception e) {
			requestIdStartChar = "N";
		}
		
		// 신규 & 변경 삭제하면 새로운 아이디 Request 코드로 등록
		requestIdStartChar = "R";
		
		// 저장된 작업요청 아이디 검색
		String request_id = service.selectRequestId(workVo.getRequest_type());
		
		// 검색된 요청 아이디 없으면 초기값 00000
		if ("".equals(request_id) || request_id == null) {
			request_id = "00000";
		}
		else {
			request_id = request_id.substring(request_id.length()-5, request_id.length());
		}
		
		// 검색된 작업요청 아이디 + 1
		int intRequestId = Integer.parseInt(request_id) + 1;
		
		DecimalFormat df = new DecimalFormat("00000");
		
		String newRequestId = nowDate+ "-" +requestIdStartChar + df.format(intRequestId);
		
		// request_id 설정
		workVo.setRequest_id(newRequestId);
		workVo.setRequest_type("NEW"); 
//		
		try {
			// 작업요청 데이터 삽입
			service.insert(workVo);
//		
			Map<String, Object> requestIaParam = new HashMap<String, Object>();
			
			List<?> iaList = workVo.getReq_ia();
			
			if (iaList != null) {
				for(int i=0; i < iaList.size(); i++) {
					requestIaParam.put("request_id", newRequestId);
					requestIaParam.put("ia_no", iaList.get(i));
					
					System.out.println("requestIaParam["+requestIaParam);
					// uixs_request_ia 데이터 삽입
					// 작업요청된 메뉴리스트 
					service.insertRequestIa(requestIaParam);
				}
			}
			
			
			// 파일 업로드
			// 파일업로드 추가정보 : 데이터베이스 저장용
			Map<String, Object> uploadAddInfo = new HashMap<String, Object>();
			
			// 관련 태이블명
			uploadAddInfo.put("rel_table", "REQUEST_LIST");
			// 관련 태이블 키값
			uploadAddInfo.put("rel_table_key", newRequestId);
			
			// 업로드 파일 정보 list
			fileUpload.upload(mtfRequest, request, uploadAddInfo);
			
			map.put("REQUEST_ID", newRequestId);
			//System.out.println("업로드 파일 정보:["+fileUploadInfo+"]");
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return map;
	}
	
	/**
	 * 요청작업 목록 검색
	 * @return
	 */
	@RequestMapping(value = {"/work/request_list"})
	@ResponseBody
	public List<WorkVO> workRequestList(WorkVO workVo) {
		return service.selectRequestListFromDB(workVo);
	}
	
	/**
	 * 작업요청 내역 상세정보
	 * @param request_id
	 * @return 작업요청내역 상세 + 요청작업 관련 업로드파일 목록
	 */
	@RequestMapping(value = {"/work/request_list/detail"}, method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> workRequestOne(String ref_table, String ref_id) {
		// 작업요청 관련 파일 검색
		List<FileUploadVO> files = fileUpload.selectUploadFileInfo("REQUEST_LIST", ref_id);
		
		// 작업요청 내용 
		WorkVO workVo = service.selectRequestOneFromDB(ref_id);
		
		// 작업요청된 ia tree 목록
		List<Map<String, String>> requestIaList = null;
		
		// 검색된 request_ia 를 배열로 전환후 해당아이디의 ia tree 목록 검색
		if (workVo != null && workVo.getRequest_ia() != null) {
			String[] request_ias = workVo.getRequest_ia().split(",");
			
			requestIaList = iaService.selectIaPathFromDB(request_ias);
		}
		
		
		Map<String, Object> rtn = new HashMap<String, Object>();
		
		// return map
		rtn.put("REQUEST_IA_LIST", requestIaList);
		rtn.put("FILES", files);
		rtn.put("REQUEST_WORK", workVo);
		
		
		return rtn;
	}
	
	@RequestMapping(value = {"/work/request_list/delete.data"}, method = RequestMethod.POST)
	@ResponseBody
	public String workRequestDelete(@RequestParam(value="request_id", required=true) String request_id) {
		
		int delRequest = 0;
		int delWorkList = 0;
		int delWorkState = 0;
		
		int delCnt = 0;
		
		try {
			WorkVO wvo = new WorkVO();
			
			wvo.setRequest_id(request_id);
			wvo.setRequest_state("DELETE");
			
			delRequest = service.updateRequestWorkStateToDB(wvo);
			delWorkList = service.deleteWorkListToDB(request_id);
			delWorkState = service.deleteWorkStateToDB(request_id);
			
			List<FileUploadVO> delFiles = fileUpload.selectUploadFileInfo("REQUEST_LIST", request_id);
			
			logger.info("delFilesSize::" + delFiles.size());
			
			if (delFiles.size() > 0) {
				List<Object> delFileList = new ArrayList<Object>();
				for(int i = 0; i < delFiles.size(); i++) {
					FileUploadVO upFile = delFiles.get(i);
					
					Map<String, Object> delFile = new HashMap<String, Object>();
					delFile.put("file_id", Integer.toString(upFile.getFile_id()));
					delFileList.add(delFile);
				}
				// 파일삭제
				fileUpload.deleteFiles(delFileList);
			}
			
			delCnt = delRequest + delWorkList + delWorkState;
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return Integer.toString(delCnt);
	}
	
	/**
	 * 작업진행내역 상세정보
	 * @param request_id
	 * @return 작업요청내역 상세 + 요청작업 관련 업로드파일 목록
	 */
	@RequestMapping(value = {"/work/work_list/detail"}, method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> workWorkOne(String ref_table, String ref_id) {
		// 작업요청 관련 파일 검색
		List<FileUploadVO> files = fileUpload.selectUploadFileInfo("REQUEST_LIST", ref_id);
		
		// 작업요청 내용 
		WorkVO workVo = service.selectWorkOneFromDB(ref_id);
		
		// 작업요청된 ia tree 목록
		List<Map<String, String>> requestIaList = null;
		
		// 검색된 request_ia 를 배열로 전환후 해당아이디의 ia tree 목록 검색
		if (workVo != null && workVo.getRequest_ia() != null) {
			String[] request_ias = workVo.getRequest_ia().split(",");
			
			requestIaList = iaService.selectIaPathFromDB(request_ias);
		}		
		
		Map<String, Object> rtn = new HashMap<String, Object>();
		
		// return map
		rtn.put("REQUEST_IA_LIST", requestIaList);
		rtn.put("FILES", files);
		rtn.put("REQUEST_WORK", workVo);
		
		
		return rtn;
	}
	
	/**
	 * 요청작업 수용/거절 상태 수정
	 * @param workVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value= {"/work/request_list/detail/change_state"}, method=RequestMethod.POST)
	@ResponseBody
	public int changeState(WorkVO workVo) {
		
		int rtn = 0;
		
		try {
			rtn = service.updateRequestWorkStateToDB(workVo);
			
			// 작업 수용일 경우 진행중인 작업내역 저장
			if ("WORKING".equals(workVo.getRequest_state()) || "CANCEL".equals(workVo.getRequest_state())) {
				// 작업진행 목록 저장
				int work_id = service.insertWorkListToDB(workVo.getRequest_id(), "PLAN");
				
				if (work_id > 0) {
					workVo.setWork_id(work_id);
					// 작업진행 상태 저장
					service.insertWorkStateToDB(workVo);
				}
			}
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		System.out.println(rtn);
	
		return rtn;
	}
	
	/**
	 * 진행중인 작업록록 검색
	 * @return
	 */
	@RequestMapping(value = {"/work/work_list"}, method=RequestMethod.GET)
	@ResponseBody
	public List<WorkVO> processWorkList(WorkVO workVo) {
		
		return service.selectProcessListFromDB(workVo);
	}
	
	/**
	 * 완료된 작업록록 검색
	 * @return
	 */
	@RequestMapping(value = {"/work/complete_list"}, method=RequestMethod.GET)
	@ResponseBody
	public List<WorkVO> completeWorkList(@RequestParam Map<String, String> param) {
		
		String site_code = param.get("site_code");
		String start = param.get("start") == null ? "1" : param.get("start"); // 페이징 시작
		String limit = param.get("limit") == null ? "10" : param.get("limit"); // 페이징 갯수
		
		if ("".equals(start) || "".equals(limit)) {
			start = "1";
			limit = "10";
		}
		
		if (!param.containsKey("start")) {
			param.put("start", "1");
		}
		
		if (!param.containsKey("limit")) {
			param.put("limit", "10");
		}
		// 정렬기준 기본값을 작업요청일로 설정
		if (!param.containsKey("orderkey")) {
			param.put("orderkey", "regdate");
		}
		// 정렬 순서 기본값을 최근순으로 설정
		if (!param.containsKey("listsort")) {
			param.put("listsort", "d");
		}
		
		logger.info("datas: [ "+ (String) param.get("listsort") +", "+ (String) param.get("orderkey") +" ]");
		
		return service.selectCompleteListFromDB(param);
	}
	
	/**
	 * 진행중인 작업 상세보기 - 작업파일 업로드
	 * @param mtfRequest
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = {"/work/work_list/detail/fileupload"}, method=RequestMethod.POST)
	@ResponseBody
	public List<FileUploadVO> workFileUpload(
			MultipartHttpServletRequest mtfRequest, 
			HttpServletRequest request) {
		
		List<FileUploadVO> returnList = new ArrayList<FileUploadVO>();
		
		try {
			// 파일업로드 추가정보 : 데이터베이스 저장용
			Map<String, Object> uploadAddInfo = new HashMap<String, Object>();
			
			String ref_key = request.getParameter("work_id") != null ?  (String) request.getParameter("work_id") : "";
			
			// 관련 태이블명
			uploadAddInfo.put("rel_table", "WORK_LIST");
			// 관련 태이블 키값
			uploadAddInfo.put("rel_table_key", ref_key);
			
			returnList =  fileUpload.upload(mtfRequest, request, uploadAddInfo);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return returnList;
	}
	
	
	/**
	 * 진행중인 작업 상세보기 - 업로드된 작업파일 검색
	 * @param ref_id
	 * @return
	 */
	@RequestMapping(value = {"/work/work_list/detail/files"}, method = RequestMethod.GET)
	@ResponseBody
	public List<FileUploadVO> selectWorkFiles(String ref_id) {
		// 작업요청 관련 파일 검색
		List<FileUploadVO> files = fileUpload.selectUploadFileInfo("WORK_LIST", ref_id);
		
		return files;
	}
	
	/*
	@RequestMapping(value = {"/work/work_list/detail/update_state"}, method = RequestMethod.POST)
	public void updateWorkState(WorkVO workVo) {
		
		try {
			service.updateWorkStateToDB(workVo);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	*/
	/**
	 * 작업현황 업데이트
	 * @param workVo
	 */
	@RequestMapping(value = {"/work/work_list/detail/update_state"}, method = RequestMethod.POST)
	@ResponseBody
	public int updateWorkState(WorkVO workVo) {
		
		int result = 0;
		
		try {
			result = service.updateWorkStateToDB(workVo);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 요청작업 검수요청 갯수/검수완료 갯수 검색
	 * */
	@RequestMapping(value = {"/work/work_list/confirm_count"})
	@ResponseBody
	public Map<String, String> confirmCnt(@RequestParam Map<String, String> param) {
		
		Map<String, String> rtn = null;
		
		try {
			rtn = service.selectConfirmCountFromDB(param);
			
			if (rtn == null) {
				rtn = new HashMap<String, String>();
			}
		}
		catch(Exception e) {
			e.printStackTrace();			
		}
		
		return rtn;
	}
	
	// 달별 완료일 기준 작업요청 내역(완료일) - 조회
	@RequestMapping(value = {"/work/cal_data"}, method = RequestMethod.GET)
	@ResponseBody
	public List<Map<String, Object>> monthRequestWork(@RequestParam Map<String, Object> paramMap) {
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		
		resultList = service.selectRequestWorkWithMonth(paramMap);
		
		return resultList;
	}
}
