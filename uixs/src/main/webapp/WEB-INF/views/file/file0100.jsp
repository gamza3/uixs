<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../include/html_head.jsp" %>
</head>
<body>
	<div class="wrapper">
		<!--header-->
        <%@ include file="../include/header.jsp" %>
        <!--// header-->
        
		<!--container-->
        <div class="container">
            
            <div class="content">
                <div class="content_inner">
                    <div class="tit_area" >
                        <h2 style="border-bottom: 0;">파일관리</h2>
                    </div>
                    <script>
//                     $('#fileUp').on('change', function () {
//                     	console.log($(this).val())
//                     	$('#file_list').val($(this).val())
//                     });
                    </script>
                    <ul class="view_list_wrap bor_top">
                        <li>
                            <div class="grey_list_type white">
                            <!-- 
                                <div class="resource_area">
                                    <div class="btn_menu">
<!--                                         <a href="#none" class="btn_mid_type03" id="add-menu">폴더 추가하기</a> -- >
                                    </div>
                                    <ul>
                                        <li><strong><a href="#none">Guide</a></strong>
<!--                                             <a href="#none" class="btn_small01">파일업로드</a> -- >
                                            <ul class="sub_file" >
                                                <li><a href="#none" class="new">Design_system_guide.pdf</a></li>
                                            </ul>
                                        </li>
                                        <li><strong><a href="#none">Resources</a></strong>
<!--                                             <a href="#none" class="btn_small01">파일업로드</a> -- >
                                            <ul class="sub_file" >
                                                <li><a href="#none" class="new">html_20210530.zip</a></li>
                                                <li><a href="#none">html_20210430.zip</a></li>
                                                <li><a href="#none">html_20210330.zip</a></li>
                                                <li><a href="#none">html_20210228.zip</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                 -->
                                <div class="con_area" style="padding-left:0">
                                    <div class="file_visual">
                                        <p>UI/UX 가이드 및 리소스 파일을 업로드 하세요.
                                        	<br> 리소스 파일은 html 을 제외한(css, font, js, img  등) 파일폴더를 
                                        	<br> 하나의 zip으로 압축하여 업로드 해주세요.</p>
                                    </div>
                                    <dl class="file_history">
                                    	<dl>
	                                    	<dt>Guide 업로드
		                                    	<form name="guideForm" id="guideForm" method="post" enctype="multipart/form-data" style="display: inline-block; margin-left: 20px">
			                                     	<div class="input_section" style="border-bottom: 0; display: inline-block">
								                        <div class="input_wrap" style="max-width: 100%; padding: 0;">
								                            <div class="input_area">
								                                <input type="file" name="guide" id="guide" placeholder="아이디를 입력하세요" maxlength="10">
								                            </div>
							                           	</div>
													</div>
							                        <a href="#none" class="btn_small01 file" id="btn_guide_upload">업로드</a>
							                    </form>
	                                    	</dt>
	                                    	<dd>
	                                            <ul id="guide_list">
	                                                <li>html_20210530.zip<strong>2021.05.22</strong></li>
	                                                <li>Guide > Design_system_guide.pdf<strong>2021.05.10</strong></li>
	                                            </ul>
	                                        </dd>
                                    	</dl>
                                    	<dl>
	                                    	<dt>Resource 업로드
	                                    		<form name="resourceForm" id="resourceForm" method="post" enctype="multipart/form-data" style="display: inline-block; margin-left: 20px">
			                                     	<div class="input_section" style="border-bottom: 0; display: inline-block">
								                        <div class="input_wrap" style="max-width: 100%; padding: 0">
								                            <div class="input_area">
								                                <input type="file" name="resource" id="resource" placeholder="아이디를 입력하세요" maxlength="10">
								                            </div>
							                           	</div>
													</div>
							                        <a href="#none" class="btn_small01 file" id="btn_resource_upload">업로드</a>
							                    </form>
	                                    	</dt>
	                                        <dd>
	                                            <ul id="resource_list">
	                                                <li>html_20210530.zip<strong>2021.05.22</strong></li>
	                                                <li>Guide > Design_system_guide.pdf<strong>2021.05.10</strong></li>
	                                            </ul>
	                                        </dd>
                                    	</dl>
                                    </dl>
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
        <!--// container-->
        
	</div>
	<div id="root"></div>
</body>
<script type="module" src="/resources/js/jsx/root.js"></script>
<!-- <script src="/resources/js/jsx/like_link_button.js"></script> -->
<script type="text/javascript">


$(document).ready(function () {
	
	function getAllFiles() {
		uijs.ajaxDef({
			url: '/resource/list.data'
			, data: {limit: 10, site_code: uijs.channel.get()}
			, callback: function (data) {
				if (data) {
					setGuideList(data);
					setResourceList(data);
					setNewList(data);
				}
			}
		})
	}
	
	/**
	 * guide 리스트 생성 and 화면 표시
	*/
	function setGuideList(data) {
		console.log(data)
		var guideItems = data.filter(function (item) {
			return item.TYPE === 'GUIDE';
		});
		
		var html = '';
		var index = 0;
		for(var item of guideItems) {
			if (index < 5) {
// 				html += '<li><a href="/file/download?file_id='+item.FILE_ID+'">'+item.TITLE+'</a></li>\n';
				html += '<li><a href="/file/download?file_id='+item.FILE_ID+'">'+item.TITLE+'</a><strong>'+(new Date(item.REGDATE)).format('yyyy.mm.dd')+'</strong></li>\n';
// 				html += '<li>Guide > Design_system_guide.pdf<strong>2021.05.10</strong></li>\n';
			}
			else {
				break;
			}
			
			index++;
		}
		
		$('#guide_list').html(html);
	}
	
	/**
	 * resource 리스트 생성 and 화면 표시
	*/
	function setResourceList(data) {
		var rsItems = data.filter(function (item) {
			return item.TYPE === 'RESOURCE';
		});
		
		var html = '';
		var index = 0;
		for(var item of rsItems) {
			
			if (index < 5) {
// 				html += '<li><a href="/file/download?file_id='+item.FILE_ID+'">'+item.TITLE+'</a></li>\n';
				html += '<li><a href="/file/download?file_id='+item.FILE_ID+'">'+item.TITLE+'</a><strong>'+(new Date(item.REGDATE)).format('yyyy.mm.dd')+'</strong></li>\n';
			}
			else {
				break;
			}
			
			index++;
		}
		
		$('#resource_list').html(html);
	}
	
	/**
	 * resource 리스트 생성 and 화면 표시
	*/
	function setNewList(data) {
		
	}
	
	getAllFiles();
	
	// 가이드파일 업로드버튼 이벤트
	$('#btn_guide_upload').on('click', function () {
		$('#guideForm').submit();
	});
	
	// 가이드폼 서브밋 이벤트
	$('#guideForm').on('submit', function (e) {
		e.preventDefault();
		
		if (rmSpace($('#guide').val()) == '') {
			uijs.msg.alert('파일을 등록해 주세요.');
			$('#guide').focus();
			
			return false;
		}
		
		var formData = new FormData($('#guideForm')[0]);
	
		formData.append('site_code', uijs.channel.get());
		formData.append('type', 'GUIDE');
		formData.append('title', $('#guide')[0].files[0].name);
		
		// 첨부파일 추가 
		formData = uijs.addFileData(formData, $('#guideForm'));
	
		uijs.ajaxFormData({
			url: '/resource/insert.data',
			data: formData,
			successCallback: function (data) {
				uijs.msg.alert('작업요청이 완료 되었습니다.');
				
				$('#guide').val('');
				
				location.reload();
			}
		});
		
	}); //가이드폼 서브밋 이벤트 $('#guideForm').on('submit'...
	
	// resource 업로드버튼 이벤트
	$('#btn_resource_upload').on('click', function () {
		$('#resourceForm').submit();
	});
	
	// resource 서브밋 이벤트
	$('#resourceForm').on('submit', function (e) {
		e.preventDefault();
		
		if (rmSpace($('#resource').val()) == '') {
			uijs.msg.alert('파일을 등록해 주세요.');
			$('#resource').focus();
			
			return false;
		}
		
		// 파일 확장자 체크
		if ($('#resource')[0].files[0].type !== 'application/x-zip-compressed') {
			uijs.msg.alert('압축파일 (zip) 형태의 파일만 등록 가능합니다.');
			$('#resource').val('').focus();
			
			return false;
		}
		
		var formData = new FormData($('#resourceForm')[0]);
	
		formData.append('site_code', uijs.channel.get());
		formData.append('type', 'RESOURCE');
		formData.append('title', $('#resource')[0].files[0].name);
		
		// 첨부파일 추가 
		formData = uijs.addFileData(formData, $('#resourceForm'));
	
		uijs.ajaxFormData({
			url: '/resource/insert.data',
			data: formData,
			successCallback: function (data) {
				uijs.msg.alert('작업요청이 완료 되었습니다.');
				
				$('#resource').val('');
				
				location.reload();
			}
		});
		
	}); //resource 서브밋 이벤트 $('#resourceForm').on('submit',...
});
</script>
</html>
