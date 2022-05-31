<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../include/html_head.jsp" %>
</head>
<body>
	<div class="wrapper" id="v-app">
		<!-- header-->
		<%@ include file="../include/header.jsp" %>
		<!--// header-->
		
		<!--container-->
        <div class="container">
            
            <div class="content">
                <div class="content_inner">
                	<form name="userForm" id="userForm">
                    <div class="tit_area">
                        <h2>사용자 등록</h2>
                    </div>
                    <div class="input_section">
                        <ul class="input_wrap">
                            <li class="input_area">
                                <label for="userid">아이디</label>
                                <input type="text" name="userid" id="userid" placeholder="아이디를 입력하세요" maxlength="10" value="${userid}" readonly>
                            </li>
                            <li class="input_area">
                                <label for="password">이전비밀번호</label>
                                <input type="password" name="old_password" id="old_password" placeholder="비밀번호를 입력하세요" maxlength="10">
                            </li>
                            <li class="input_area">
                                <label for="password">새비밀번호</label>
                                <input type="password" name="password" id="password" placeholder="비밀번호를 입력하세요" maxlength="10">
                            </li>
                            <li class="input_area">
                                <label for="username">이름</label>
                                <input type="text" name="username" id="username" placeholder="이름을 입력하세요" maxlength="10">
                            </li>
                            <li class="input_area">
                                <label for="team">부서</label>
                                <input type="text" name="team" id="team" placeholder="부서를 입력하세요" maxlength="20">
                            </li>
                            <li class="input_area">
                                <label for="part">담당업무</label>
                                <select class="selectbox" name="part" id="part">
                                    <option value="MANAGER">담당자(현업)</option>
                                    <option value="PLAN">기획</option>
                                    <option value="DESIGN">디자인</option>
                                    <option value="PUBLISH">퍼블리셔</option>
                                    <option value="ADMIN">관리자</option>
                                </select>
                            </li>
                            <li class="input_area">
                                <label for="tel1">전화번호</label>
                                <div class="tel_box">
	                                <input type="tel" name="tel1" id="tel1" maxlength="3">-
	                                <input type="tel" name="tel2" id="tel2" maxlength="4">-
	                                <input type="tel" name="tel3" id="tel3" maxlength="4">
                                </div>
                            </li>
                            <li class="input_area">
                                <label for="email">이메일</label>
                                <input type="text" name="email" id="email" placeholder="이메일을 입력하세요" maxlength="50">
                            </li>
<!--                             <li class="input_area"> -->
<!--                                 <label for="auth">권한</label> -->
<!--                                 <select class="selectbox" name="auth" id="auth"> -->
<!--                                     <option value="MANAGER">관리자(현업)</option> -->
<!--                                     <option value="WORKER">작업자(UI/UX 담당)</option> -->
<!--                                     <option value="USER">일반사용자(파일리스트 뷰)</option> -->
<!--                                 </select> -->
<!--                             </li> -->
                        </ul>
                    </div>
                    <div class="btn_area" id="action-btn">
                        <a href="/user/list.view?page=${page}"class="btn_large_type02">목록</a>
                        <a href="#none" class="btn_large_type01" id="btn_user_insert">수정</a>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <!--// container-->
	</div>
	
</body>
<script>
var _app = null;
new Vue({
	el: '#v-app',
	store: _store,
	mixins: [channelMixin],
	created: function () {
		_app = this;
		
		this.app__init();
	},
	mounted: function () {
	},
	watch: {
		loginInfo: function() {
			console.log(this.loginInfo)
		}
	}
});
$(document).ready(function () {
	if (uijs.logininfo.get('userid') !=  '${userid}' && uijs.logininfo.get('auth') != 'ADMIN') {
		alert('수정 권한이 없습니다.');
		history.back(-1);
	}
	
	if (uijs.logininfo.get('auth') === 'ADMIN') {
		var delBtn = $('<a>', {
			class: 'btn_large_type02',
			text: '삭제',
			href: '#none',
			id: 'btn_user_del'
		});
		
		delBtn.on('click', function (e) {
			e.preventDefault();
			
			if (confirm('사용자를 삭제 하시겠습니까?')) {
				uijs.ajaxDef({
					url: '/user/del.data',
					data: {'userid': '${userid}'},
					callback: function (data) {
						if(data.RESULT === 'SUCCESS') {
							alert('삭제가 완료되었습니다.');
							location.href = '/user/list.view';							
						}
						else {
							alert(data.MESSAGE);
						}
					}
				});
			}
			else {
				return;
			}
			
		});
		
		$('#action-btn').append(delBtn);
	}
	
	(function userUpdate() {
		var passwordMatch = false;
		var userid = rmSpace($('input[id=userid]').val());
		
		function _focus(target) {
			$('input[name='+target+']').val('').focus();
		}
		
		// 이전 비밀번호 비교 확인
		$('#old_password').on('blur', function () {
			var target = $(this);
			var old_password = rmSpace(target.val());
			
			if (old_password != '') {
				uijs.ajaxDef({
					ajaxOption: {
						url: '/user/passwordMatch.data'
						, data: {'userid': userid, 'old_password': old_password}
			     		, method: 'POST'
			     		, dataType: 'json'
			     		, async: false
					},
					callback: function (data) {
						if(!data) {
							uijs.msg.alert('비밀번호가 일치하지 않습니다.');
							_focus('old_password');
						}
						
						passwordMatch = data;
					}
				});
			}
			else {
				passwordMatch = false;
			}
		});
		
		
		if (userid != '') {
			uijs.ajaxDef({
				ajaxOption: {
					url: '/user/user.data'
					, data: {userid: userid}
		     		, method: 'POST'
		     		, dataType: 'json'
	     			, async: false
				},
				callback: function (data) {
					if (data) {
						$('#username').val(data.username);
						$('#team').val(data.team==null?'':data.team);
						$('#part').val(data.part==null?'':data.part);
						
						var tel = data.tel==null?[]:data.tel.split('-');
						
						$('#tel1').val(tel[0]);
						$('#tel2').val(tel[1]);
						$('#tel3').val(tel[2]);
						
						$('#email').val(data.email==null?'':data.email);
						$('#auth').val(data.auth);
					}
				}
			});
		}
	
		
		// 전화번호에 값 입력후 이동시
		$('#tel1, #tel2, #tel3').on('blur', function (e) {
			var $this = $(this);
			var val = rmSpace($this.val());  
			
			if ( val != '' && !$.isNumeric(val) ) {
				uijs.msg.alert('숫자만 입력 가능합니다.');
				$this.val('').focus();
				return false;
			}
		});
		
		$('#password').on('blur', function () {
			if (rmSpace($(this).val()) != '') {
				uijs.msg.alert('비밀번호 변경을 원하시면 이전 비밀번호를 입력해 주세요.');
				_focus('old_password');
				return false;
			}
		});
		
		$('#btn_user_insert').on('click', function (e) {
			e.preventDefault();
			
			var formData = new FormData(document.getElementById('userForm')); 
			var sendData = {}; // ajax 전송용 데이터
			var tel; // 전화번호 tel1 + tel2 + tel3
			
			// formData 를 쪼개서 json 형태로 만들기 = sendData 
			for(var data of formData) {
				// rmSpace 공백 제거
				sendData[data[0]] = rmSpace(data[1]);
			}

			if (sendData.username == '') {
				uijs.msg.alert('이름을 입력해 주세요.');
				_focus('username');
				return false;
			}
			
			if (sendData.old_password != '' && passwordMatch) {
				if (sendData.password == '') {
					uijs.msg.alert('비밀번호를 입력해 주세요.');
					_focus('password');
					return false;
				}
				
				if (sendData.password.length < 4 || sendData.password.length > 10) {
					uijs.msg.alert('비밀번호는 최소 4자리 최대 10자리 까지 입력 가능합니다.');
					_focus('password');
					return false;
				}
			}
			else {
				sendData.password = '';
			}
			
			/*
			if (sendData.tel1 == '') {
				uijs.msg.alert('전화번호 첫번째자리를 입력해 주세요.');
				_focus('tel1');
				return false;
			}
			
			if (sendData.tel2 == '') {
				uijs.msg.alert('전화번호 두번째자리를 입력해 주세요.');
				_focus('tel2');
				return false;
			}
			
			if (sendData.tel3 == '') {
				uijs.msg.alert('전화번호 세번째자리를 입력해 주세요.');
				_focus('tel3');
				return false;
			}
			*/
			
			if (sendData.email !== '') {
				if (!validEmail(sendData.email)) {
					uijs.msg.alert('이메일 형식이 잘못 되었습니다.');
					_focus('email');
					return false;
				}
			}
			
			if (sendData.tel1 != '' && sendData.tel2 != '' && sendData.tel3 != '') {
				tel = sendData.tel1 + '-' + sendData.tel2 + '-' + sendData.tel3;
				sendData.tel = tel;
			}
			else {
				sendData.tel = '';
			}
			
			uijs.ajaxDef({
				ajaxOption: {
					url: '/user/edit.data'
					, data: sendData
				},
				callback: function (data) {
					if (data.result == 'success') {
						uijs.msg.alert('사용자 수정이 완료 되었습니다.');
						location.href = '/user/list.view';
					}
					else {
						uijs.msg.alert('사용자 수정중 오류가 발생하였습니다.');
					}
				}
			});
		});
	})();
	
});
</script>
</html>
