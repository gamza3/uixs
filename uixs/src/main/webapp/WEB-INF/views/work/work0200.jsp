<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../include/html_head.jsp" %>
<script>
 /*    $(document).ready(function () {
        $('#calendar-pop').find('.btn_edit_close, td > div').click(function () {
            $('#calendar-pop').hide();
        });
    }); */
</script>
</head>
<body>
	<div class="wrapper" id="v-app">
		<%@ include file="../include/header.jsp" %>
		
		<!--container-->
		<div class="container">
			<form name="work_request_form" id="work_request_form" method="post" enctype="multipart/form-data" onsubmit="return false;">
			<input type="hidden" name="userid" :value="loginInfo.userid" />
			<div class="content">
				<div class="content_inner">
					<div class="tit_area">
                        <h2>작업요청하기</h2>
                    </div>
					
					<div class="input_section mt20">
                        <ul class="input_wrap" style="padding-top: 0;">
                            <li class="input_area">
								 <div class="btn_area">
			                        <a href="#" class="btn_large_type04" id="selectmenu">메뉴선택</a>
			                    </div>
			                    
			                    <div class="work_menu_list" id="selected-menu">
				                    <p>선택된 메뉴</p>
			                    	<ul>
			                    	</ul>
			                    </div>
							</li>
                          
							<li class="input_area" style="margin-top: 20px">
                                <label for="">제목</label>
                                <input type="text" name="request_title" placeholder="제목을 입력하세요">
                            </li>
							<li class="input_area">
                                <label for="">수정사항</label>
                                <textarea name="request_content" placeholder="내용을 입력해주세요."></textarea>
                            </li>
							<li class="input_area">
                                <label for="">작업완료일</label>
                                <input type="text" name="end_date" placeholder="날짜를 선택해주세요" class="datepick"  data-type="date">
                            </li>
							<li class="input_area edit_pop" style="width: 100%; box-shadow: none; padding: 0 0; top: 0;">
                                <label for="">첨부파일
                                	<span>
                                		<button @click="addFileInput" class="btn_tiny01">파일추가</button>
                                	</span>
                                </label>
                                
								<div class="edit_data" v-for="(file, index) in files" :key="file.id">
									<input type="file" :id="'file_'+ file.id" v-on:change="fileChange" readonly>
									<label :for="'file_'+ file.id">파일선택</label>
									
									<div class="file_text">
										<input type="text" :id="'file_'+ file.id + '_text'" placeholder="첨부파일 설명">
										<a href="#none" class="btn_small02" @click="delFileInput(index)">삭제</a> 
									</div>
								</div>
								
                            </li>
                        </ul>
                    </div>
                    <div class="btn_area">
                        <a href="/work/list.view" class="btn_large_type02">취소하기</a>
                        <a href="#" class="btn_large_type01" @click.prevent="insert__request">등록하기</a>
                    </div>
				</div>
			</div>
			</form>
		</div>
		<!--// container-->
	</div>

	<script type="text/javascript">
	var _app = null;
	new Vue({
		el: '#v-app',
		store: _store,
		mixins: [channelMixin],
		data: {
			files: [],
			lastFilesIndex: 1,
		},
		created: function () {
			_app = this;
			
			this.app__init();
		},
		methods: {
			addFileInput: function () {
				this.files.push({id: this.lastFilesIndex, value: ''});
				this.lastFilesIndex++;
			},
			delFileInput: function (index) {
				this.files.splice(index, 1);
			},
			fileChange: function (e) {
				document.getElementById(e.target.id+'_text').value = e.target.files[0].name;
			},
			insert__request: function (e) {
				
				if(this.loginInfo.auth !== 'MANAGER' && this.loginInfo.auth !== 'ADMIN') {
					alert('요청 권한이 없습니다.');
					return false;
				}
				
				
				if (rmSpace($('input[name=request_title]').val()) == '') {
					alert('제목을 입력해 주세요.');
					$('input[name=request_title]').focus();
					return false;
				}
				
				if (rmSpace($('textarea[name=request_content]').val()) == '') {
					alert('수정사항을 입력해 주세요.');
					$('textarea[name=request_content]').focus();
					return false;
				}
				
				if (rmSpace($('input[name=end_date]').val()) == '') {
					alert('작업완료일을 입력해 주세요.');
					$('input[name=end_date]').focus();
					return false;
				}
				
				var requestIaData = $('#request_ia_form').serializeArray();
				
				var iaDataList = requestIaData.map(function (v, k) {
					return v.value;
				});
				
				
				var formData = new FormData($('#work_request_form')[0]);
				var sendData = new FormData();
				
				/*
				 * v: array value, k: array key
				 * new Date 를적용하기위해 새로운 FormData 를 생성후 form 의 내용을 삽입
				*/
				formData.forEach(function (v, k) {
					if (k == 'end_date') {
						sendData.append(k, new Date(v));
					}
					else {
						sendData.append(k, v);
					}
				});
				sendData.append('site_code', this.getChannelCode);
				sendData.append('username', this.loginInfo.username);
				
				// 선택한 메뉴가 있는경우
				if (iaDataList.length) {
					sendData.append('req_ia', iaDataList);
				}
				
				// 첨부파일 추가 
				sendData = uijs.addFileData(sendData, $('#work_request_form'));
			
				uijs.ajaxFormData({
					url: '/work/request/insert.data',
					data: sendData,
					successCallback: function (data) {
						
						// 새글알림 메세지 전송
						_app.$sendMsg([
							_app.loginInfo.userid, 
							_app.selectedChannel.name + ' 채널에 새로운 작업요청이 등록 되었어요!'
						]);
						
						alert('작업요청이 완료 되었습니다.');
						
						location.href = "/work/list.view";
					},
					errorCallback: function (error) {
						console.log(error);
					}
				});
			}
		}
	});
    //<![CDATA[
	$(function () {
		
		//작업완료일 달력 선택
		$('input[name=end_date]').datepicker({
			beforeShow: function(input, inst) { 
				setTimeout(function () {
			        inst.dpDiv.css({"z-index":1000});
				});
		    }
		});
		
		// 요청작업 메뉴 선택
		$('#selectmenu').on('click', function () {
			uijs.requestWork.requestTypePopup();
		});
		
		
		// 작업요청 등록하기
		$('#btn-work-request').click(function (e) {
			e.preventDefault();
			
			if(uijs.logininfo.get('auth') !== 'MANAGER' && uijs.logininfo.get('auth') !== 'ADMIN') {
				uijs.msg.alert('요청 권한이 없습니다.');
				return false;
			}
			
// 			if (!$('input[name=request_type]:checked').length) {
// 				uijs.msg.alert('작업구분(신규/변경)을 선택해 주세요.');
// 				return false;
// 			}
			
			if (rmSpace($('input[name=request_title]').val()) == '') {
				uijs.msg.alert('제목을 입력해 주세요.');
				$('input[name=request_title]').focus();
				return false;
			}
			
			if (rmSpace($('textarea[name=request_content]').val()) == '') {
				uijs.msg.alert('수정사항을 입력해 주세요.');
				$('textarea[name=request_content]').focus();
				return false;
			}
			
			if (rmSpace($('input[name=end_date]').val()) == '') {
				uijs.msg.alert('작업완료일을 입력해 주세요.');
				$('input[name=end_date]').focus();
				return false;
			}
			
			var requestIaData = $('#request_ia_form').serializeArray();
			
			var iaDataList = requestIaData.map(function (v, k) {
				return v.value;
			});
			
			
// 			if (!iaDataList.length) {
// 				uijs.msg.alert('메뉴를 하나이상 선택해 주세요. 작업요청메뉴가 리스트에 없을경우 "메뉴관리" 에서 등록후 요청 바랍니다.');
// 				return false;
// 			}
			
			var formData = new FormData($('#work_request_form')[0]);
			var sendData = new FormData();
			
			/*
			 * v: array value, k: array key
			 * new Date 를적용하기위해 새로운 FormData 를 생성후 form 의 내용을 삽입
			*/
			formData.forEach(function (v, k) {
				if (k == 'end_date') {
					sendData.append(k, new Date(v));
				}
				else {
					sendData.append(k, v);
				}
			});
			sendData.append('site_code', uijs.channel.get());
			sendData.append('username', uijs.logininfo.get('username'));
			
			// 선택한 메뉴가 있는경우
			if (iaDataList.length) {
				sendData.append('req_ia', iaDataList);
			}
			
			// 첨부파일 추가 
			sendData = uijs.addFileData(sendData, $('#work_request_form'));
		
			uijs.ajaxFormData({
				url: '/work/request/insert.data',
				data: sendData,
				successCallback: function (data) {
					uijs.msg.alert('작업요청이 완료 되었습니다.');
					location.href = "/work/list.view";
				},
				errorCallback: function (error) {
					console.log(error);
				}
			});
			
		});
	});	   
    //]]>
    </script>

</body>

</html>
