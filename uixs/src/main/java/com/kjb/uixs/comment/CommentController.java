package com.kjb.uixs.comment;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.kjb.uixs.user.UserController;
import com.kjb.uixs.util.FileUpload;
import com.kjb.uixs.util.FileUploadVO;

@Controller
public class CommentController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	private FileUpload fileUpload;
	
	private CommentService commentService;
	
	@Autowired
	public CommentController(CommentService commentService, FileUpload fileUpload) {
		this.commentService = commentService;
		this.fileUpload = fileUpload;
	}
	
	@RequestMapping(value = {"/cmt/main"}, method = RequestMethod.GET)
	public String comment(Locale locale){
		logger.info("Welcome home! The client locale is {}.", locale);
		
		return "comment/work0100";
	}
	
	
	@RequestMapping(value = {"/cmt/list"}, method = RequestMethod.GET)
	@ResponseBody
	public List<Map<String, Object>> list(String ref, String ref_id) throws Exception{
		
		// 디비 select 코멘트 목록
		List<Map<String, Object>> dbList = commentService.listAll(ref, ref_id);
		
		// 파일정보검색해서 새로생성한 코멘트 목록
		
		List<Map<String, Object>> rtnList = new ArrayList<Map<String, Object>>();
		
		try {
			if (dbList != null) {
				for (int i = 0; i < dbList.size(); i++) {
					Map<String, Object> comment = dbList.get(i);
					
					String cmt_no = String.valueOf(comment.get("CMT_NO"));
					
					List<FileUploadVO> files = fileUpload.selectUploadFileInfo("UIXS_BOARD", cmt_no);
					
					if (files != null) {
						comment.put("FILES", files);
					}
					
					rtnList.add(comment);
				}
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return rtnList;
	}
	
	@RequestMapping(value = {"/cmt/insert"}, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> insert(
			CommentVO commentVO,
			MultipartHttpServletRequest mtfRequest, 
			HttpServletRequest request) throws Exception{

		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			int insertid = commentService.insert(commentVO);
			
			map.put("rel_table", "UIXS_BOARD");
			map.put("rel_table_key", Integer.toString(insertid));
			
			if (insertid > 0 ) {
				fileUpload.upload(mtfRequest, request, map);
			}
			
			map.put("insertid", insertid);
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return map;
	}
	
	/**
	 * 댓글 수정
	 * @param commentVO
	 * @param mtfRequest
	 * @param request
	 * @param mpfReq
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = {"/cmt/update_cmt"}, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> cmtUpdate(
			CommentVO commentVO,
			MultipartHttpServletRequest mtfRequest, 
			HttpServletRequest request) throws Exception{
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		String ret = "";
		int updateCnt = 0;
		
		logger.info("CommentVo:" + commentVO);
		map.put("result", updateCnt);
	
		try {
			updateCnt = commentService.update(commentVO);
			
			if (updateCnt > 0 ) {
				map.put("rel_table", "UIXS_BOARD");
				map.put("rel_table_key", Integer.toString(commentVO.getCmt_no()));
				
				fileUpload.upload(mtfRequest, request, map);
			}
			
			map.put("updateCnt", updateCnt);
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return map; //Integer.toString(updateCnt);
	}
	
	@RequestMapping(value = {"/cmt/delete.data"}, method = RequestMethod.POST)
	@ResponseBody
	public String cmtDeleteData(@Param("cmt_no") String cmt_no) {
		logger.info("cmt_no::"+cmt_no);
		try {
			commentService.deleteCommentFromDB(cmt_no);
			
			List<FileUploadVO> delFiles = fileUpload.selectUploadFileInfo("UIXS_BOARD", cmt_no);
			
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
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return "";
	}
	
	/**
	 * 파일 한개 삭제
	 * @param file_id
	 * @return
	 */
	@RequestMapping(value= {"/cmt/delete_file"}, method = RequestMethod.POST)
	@ResponseBody
	public String delete_file(String file_id) {
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
}
