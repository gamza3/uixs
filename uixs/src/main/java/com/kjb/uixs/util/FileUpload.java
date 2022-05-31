package com.kjb.uixs.util;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Component
public class FileUpload {
	private static final Logger logger = LoggerFactory.getLogger(FileUpload.class);
	
	private final FileUploadService uploadService;
	
	
	@Autowired
	public FileUpload(FileUploadService uploadService) {
		this.uploadService = uploadService;
	}
	
	/**
	 * 파일 업로드 
	 * @param mtfRequest
	 * @param request
	 * @return 업로드파일정보 List
	 */
	public List<FileUploadVO> upload(
			MultipartHttpServletRequest mtfRequest, 
			HttpServletRequest request, 
			Map<String, Object> uploadAddInfo) {
		
		// return object
		List<FileUploadVO> savedFileInfo = new ArrayList<FileUploadVO>();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		Date date = new Date();
		
		//String rootPath = "C:\\work\\project_ui\\upload\\"; //request.getSession().getServletContext().getRealPath("/");
		String rootPath = "/home/ubuntu/upload/"; //request.getSession().getServletContext().getRealPath("/");
		String attachPath = "";
		String fileName = "";
		String fileFullName= "";
		String fileType = "";
		String fileUploadTime = sdf.format(date);
		//String uploadPath = "C:\\work\\project_ui\\upload\\"; //rootPath + attachPath;
		String uploadPath = rootPath + attachPath;
		String reqPath = "";
		
		if (uploadAddInfo.containsKey("path")) {
			reqPath = (String) uploadAddInfo.get("path");
			attachPath = reqPath;
			uploadPath = rootPath + attachPath;
		}
		
		if (uploadAddInfo.containsKey("unpack")) {
			
		}
		
		try {
			Iterator<String> itr = mtfRequest.getFileNames();
			
			
			if (itr.hasNext()) {
				List<MultipartFile> mpf = mtfRequest.getFiles((String) itr.next());
				if (mpf.size() > 0) {
					for (int i = 0; i < mpf.size(); i++) {
						
						FileUploadVO uploadVo = new FileUploadVO();
						
						fileFullName = mpf.get(i).getOriginalFilename();
						
						if ("".equals(fileFullName)) continue;
						
						fileName = FilenameUtils.getBaseName(fileFullName);
						fileType = fileFullName.substring(fileFullName.lastIndexOf(".")+1, fileFullName.length());
						
						String rel_table = (String) uploadAddInfo.get("rel_table");
						
						// 메뉴관리에서 파일 업로드인경우 파일 확장자별 경로 설정
						if ("IA_TREE".equals(rel_table)) {
							if ("html".equals(fileType.toLowerCase())) {
								// db 삽입용 데이터 rel_table 컬럼값 설정
								uploadVo.setRel_table("IA_HTML");
								
								attachPath = reqPath + "/html/";
							}
							else if("pptx".equals(fileType.toLowerCase()) || "ppt".equals(fileType.toLowerCase())) {
								// db 삽입용 데이터 rel_table 컬럼값 설정
								uploadVo.setRel_table("IA_PPT");
								
								attachPath = reqPath + "/ppt/";
							}
							else {
							  throw new IOException("업로드가능한 파일확장자가 아닙니다.");
							}
							
							uploadPath = rootPath + attachPath;
						}
						else {
							uploadVo.setRel_table(rel_table);
						}
						
						// 업로드 폴더경로가 없는경우 폴더생성
						File Folder = new File(uploadPath);
						if (!Folder.exists()) {
							try {
								Folder.mkdirs();
							}catch(Exception e) {
								e.getStackTrace();
							}
						}
						
						// 저장될 파일 경로 + 파일명
						String saveFileName = fileName + "_" + fileUploadTime + "." + fileType;
						
						File file = new File(uploadPath + saveFileName);
						
						
						uploadVo.setRel_table_key((String) uploadAddInfo.get("rel_table_key"));
						uploadVo.setOriginal_filename(fileFullName);
						uploadVo.setSave_filename(saveFileName);
						uploadVo.setUpload_fullpath(uploadPath);
						uploadVo.setUpload_path(attachPath);
						
						
						logger.info("filename = ["+mpf.get(i).getOriginalFilename());
						
						savedFileInfo.add(uploadVo);
						
						// 디비에 저장
						uploadService.insertUploadInfoToDB(uploadVo);
						
						// 파일명 변경하여 새로 저장
						mpf.get(i).transferTo(file);
					}
				}
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return savedFileInfo;
	}
	
	/**
	 * 파일 삭제
	 * @param savedFileInfo
	 */
	public void deleteFiles(List<Object> delFileInfo) {
		if (delFileInfo != null) {
			HttpServletRequest request =((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
//		    HttpSession session = request.getSession(true);
		    
			try {
				int listSize = delFileInfo.size();
				//String Path = Context.
				String rootPath = request.getSession().getServletContext().getRealPath("/");
				
				
				System.out.println(rootPath);
				
				if (listSize > 0) {
					for(int i = 0; i < listSize; i++) {
						Map<String, Object> fileInfo = (Map<String, Object>) delFileInfo.get(i);
						
						String file_id = (String) fileInfo.get("file_id");
						
						// 디비에서 파일정보 검색
						FileUploadVO savedFileInfo = uploadService.selectOneFileInfoFromDB(file_id);
						
						String attachPath = savedFileInfo.getUpload_path();
						String savedFile = savedFileInfo.getSave_filename();
						
						String delFilePath = rootPath + attachPath + savedFile;
						
						// 삭제될 파일 경로
						File file = new File(delFilePath);
						
						// 실제 파일 삭제
						if (file.exists()) {
							file.delete();
						}
						// 디비에서 파일 정보 제거
						uploadService.deleteFileInfoFromDB(file_id);
						
						System.out.println(delFilePath);
					}
				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 파일 업로드정보 검색
	 * @param rel_table
	 * @param rel_table_key
	 * @return 업로드 파일 목록
	 */
	public List<FileUploadVO> selectUploadFileInfo(String rel_table, String rel_table_key) {
		return uploadService.selectFileInfoFromDB(rel_table, rel_table_key);
	}
	
	/**
	 * 파일 업로드정보 검색
	 * @param rel_table
	 * @param rel_table_key
	 * @return 업로드 파일 목록
	 */
	public List<FileUploadVO> selectFileInfoWithRefs(String[] rel_table, String rel_table_key) {
		return uploadService.selectFileInfoWithRefsFromDB(rel_table, rel_table_key);
	}
	
	
}
