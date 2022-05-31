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
			<form name="channelForm" id="channelForm" method="post" action="/chan/update.data" >
			<input type="hidden" name="useyn" value="Y" />
			<div class="content">
				<div class="content_inner">
					<div class="tit_area">
                        <h2>채널 수정</h2>
                    </div>
					<div class="input_section">
                        <ul class="input_wrap">
                            <li class="input_area">
                                <label for="name">채널명</label>
                                <input type="text" name="name" id="name" placeholder="채널이름을 입력하세요">
                            </li>
                            <li class="input_area">
                                <label for="code">코드</label>
                                <input type="text" name="code" id="code" placeholder="채널 코드를 입력하세요" maxlength="5" style="text-transform: uppercase;" pattern="[A-Z]+" value="${code}" readonly>
                            </li>
                            <li class="input_area">
                                <label for="device">사용환경</label>
                                <select class="selectbox" name="device" id="device">
                                    <option value="MOBILE">MOBILE</option>
                                    <option value="PC">PC</option>
                                </select>
                            </li>
                            <li class="input_area">
                                <label for="cuser">사용자구분</label>
                                <select class="selectbox" name="cuser" id="cuser">
                                    <option value="개인">개인</option>
                                    <option value="기업">기업</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                    <div class="btn_area">
                        <a href="/chan/list.view"class="btn_large_type02" id="cancel-insert">취소하기</a>
                        <a href="#none" class="btn_large_type01" id="channel-insert">수정하기</a>
                    </div>
				</div>
			</div>
			
			</form>
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
	}
});
$(document).ready(function () {
	
	// 데이터 삽입
	uijs.ajaxDef({
		url: '/chan/channelone.data'
		, data: {code: '${code}'}
		, callback: function (data) {
			$('#name').val(data.name);
			$('#device').val(data.device);
			$('#cuser').val(data.cuser);
		}
	});
	
	$('#channel-insert').on('click', function (e) {
		e.preventDefault();
		
		$('#channelForm').submit();
	});
	
	$('#channelForm').on('submit', function (e) {
		var nameValue = rmSpace($('#name').val());
		var codeValue = rmSpace($('#code').val());
		var deviceValue = rmSpace($('#device').val());
		var cuserValue = rmSpace($('#cuser').val());
		
		if (nameValue == '') {
			uijs.msg.alert('채널명을 입력해주세요.');
			
			$('#name').val('').focus();
			
			return false;
		}
		
		
		if (deviceValue == '') {
			uijs.msg.alert('사용환경을 선택해주세요.');
			
			$('#device').val('').focus();
			
			return false;
		}
		
		if (cuserValue == '') {
			uijs.msg.alert('사용자구분을 선택해주세요.');
			
			$('#cuser').val('').focus();
			
			return false;
		}
		
		if(confirm('전송 ok?')) {
			
			$('#code').val(codeValue.toUpperCase());
			
			return;
		}
		else {
			return false;
		}
	});
});
</script>
</html>
