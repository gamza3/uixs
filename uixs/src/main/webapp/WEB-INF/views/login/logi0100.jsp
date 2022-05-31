<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../include/html_head.jsp" %>

</head>
<body>
	<div class="wrapper" id="v-app">
		
		<!--container-->
		<div class="container">
			<form name="loginForm" id="loginForm" method="post" onsubmit="return false">
			<div class="content">
				<div class="content_inner">
					<div class="tit_area">
                        <h2 :style="isMobile && 'text-align: center'">로그인</h2>
                    </div>
					
					<div class="input_section mt20" :style="isMobile && 'padding: 0 40px'">
                        <ul class="input_wrap" style="padding-top: 0;">
                          
							<li class="input_area">
                                <label for="userid">아이디</label>
                                <input ref="userid" type="text" name="userid" id="userid" placeholder="아이디" v-model="userid">
                            </li>
							<li class="input_area">
                                <label for="password">비밀번호</label>
                                <input ref="password" type="password" @keyup.enter="login" name="password" id="password" placeholder="비밀번호" autocomplete="off" v-model="password">
                            </li>
                        </ul>
                    </div>
                    <div class="btn_area">
                        <!-- <a href="work0100.html" class="btn_large_type02">취소</a> -->
                        <a href="#" class="btn_large_type01"  @click="login">로그인</a>
                    </div>
				</div>
			</div>
			</form>
		</div>
		<!--// container-->
	</div>

	<script>
	new Vue({
		el: '#v-app',
		store: _store,
		mixins: [resizeMixin, channelMixin],
		data: function () {
			return {
				userid: '',
				password: '',
			}
		},
		methods: {
			login: function (e) {
				e.preventDefault();
				
				/* 임시 아이디 선택으로 변경
				*/
				if (rmSpace(this.userid) == '') {
					alert('아이디를 입력해 주세요.');
					this.$refs.userid.focus();
					return false;
				}
				
				if (rmSpace($('input[name=password]').val()) == '') {
					alert('비밀번호를 입력해 주세요.');
					this.$refs.password.focus();
					return false;
				}
				
				axios.post('/login.data', null, {
					params: {userid: this.userid, password: this.password}
				})
				.then(function (response) {
					var data = response.data;
					
					if (data.LOGIN == 'SUCCESS') {
						location.href = '/work/list.view';
					}
					else if (data.LOGIN == 'FAIL') {
						if (data.FAIL_TYPE == 'ID') {
							alert('사용자정보가 없습니다.');
							return;
						}
						else if (data.FAIL_TYPE == 'PASSWORD') {
							alert('비밀번호가 잘못되었습니다.');
							return;
						}
						else {
							alert('알수없는 오류가발생 하였습니다. 관리자에게 문의하시기 바랍니다.');
							return;
						}
					}
				});
			}
		} 
	});
    </script>

</body>

</html>
