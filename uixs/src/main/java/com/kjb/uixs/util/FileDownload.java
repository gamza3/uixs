package com.kjb.uixs.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.AbstractView;

@Component
public class FileDownload extends AbstractView{

	public void Download() {
		setContentType("application/download; utf-8");
	}
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		
		setContentType("application/download; utf-8");
		
		File file = (File) model.get("downloadFile");
		String downName = (String) model.get("originalFileName");
		
		System.out.println("downloadfile"+file);
		System.out.println("downloadname"+downName);
		
		response.setContentType(getContentType());
        response.setContentLength((int) file.length());
 
        String header = request.getHeader("User-Agent");
        boolean b = header.indexOf("MSIE") > -1;
        String fileName = null;
 
        if (b) {
            fileName = URLEncoder.encode(downName,"UTF-8");
        } else {
            fileName = new String(downName.getBytes("UTF-8"),"iso-8859-1");
        }
        
        if (!file.exists()) {
        	return;
        }
 
     // 파일명 지정        
        response.setContentType("application/octer-stream");
        response.setHeader("Content-Transfer-Encoding", "binary;");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        
        try {
            OutputStream os = response.getOutputStream();
            FileInputStream fis = new FileInputStream(file);
 
            int ncount = 0;
            byte[] bytes = new byte[512];
 
            while ((ncount = fis.read(bytes)) != -1 ) {
                os.write(bytes, 0, ncount);
            }
            fis.close();
            os.close();
            
        } catch (FileNotFoundException ex) {
            System.out.println("FileNotFoundException");
        } catch (IOException ex) {
            System.out.println("IOException");
        }
    }
}
