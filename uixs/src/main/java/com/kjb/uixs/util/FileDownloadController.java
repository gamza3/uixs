package com.kjb.uixs.util;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class FileDownloadController {
	
	private final FileUploadService uploadService;
	
	@Autowired
	public FileDownloadController(FileUploadService uploadService) {
		this.uploadService = uploadService;
	}
	
	@RequestMapping(value = {"/file/download"}, method = RequestMethod.GET)
	public ModelAndView fileDownload(
			@RequestParam(value = "file_id") String file_id, 
			HttpServletRequest request) {
		
		FileUploadVO fileUploadVo = uploadService.selectUploadFileOneFromDB(file_id);
		
		//String rootPath = "C:\\work\\project_ui\\upload\\"; //request.getSession().getServletContext().getRealPath("/");
		String rootPath = "/home/ubuntu/upload/"; //request.getSession().getServletContext().getRealPath("/");
//		String attachPath = "";
		String attachPath = fileUploadVo.getUpload_path() == null ? "" : fileUploadVo.getUpload_path();
		String originalFileName = fileUploadVo.getOriginal_filename();
		String fileName = fileUploadVo.getSave_filename();
		String saveFilePath = null;
		
		saveFilePath = rootPath + attachPath + fileName;
		
		File downloadFile = new File(saveFilePath);
		
		ModelAndView mv = new ModelAndView();
		
		mv.setViewName("fileDownloadView");
		mv.addObject("downloadFile", downloadFile);
		mv.addObject("originalFileName", originalFileName);
		
		return mv;
	}
}
