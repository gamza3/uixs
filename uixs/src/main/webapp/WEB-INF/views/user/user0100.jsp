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
                    <div class="tit_area">
                        <h2>권한관리</h2>
                        <span class="tit_btn_area">
                            <a href="/user/insert.view" class="btn_mid_type01" id="btn-reg-cont">사용자등록</a>
<!--                             <a href="#none" class="btn_mid_type01" id="btn-edit-cont">권한수정</a> -->
                        </span>
                    </div>
                    <div class="board_table"> 
                        <table class="tbl_st1">
                            <colgroup>
                                <!-- <col class="col-01" width="4%"> -->
                                <col class="col-01" width="10%">
                                <col class="col-02" width="12%">
                                <col class="col-03" width="15%">
                                <col class="col-03" width="15%">
                                <col class="col-03" width="*">
                                <col class="col-03" width="20%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <!-- <th scope="col"></th> -->
                                    <th scope="col"><span>이름</span></th>
                                    <th scope="col"><span>부서</span></th>
                                    <th scope="col"><span>담당업무</span></th>
                                    <th scope="col"><span>연락처</span></th>
                                    <th scope="col"><span>이메일</span></th>
                                    <th scope="col"><span>권한여부</span></th>
                                </tr>
                            </thead>
                            <tbody id="user-list-wrap">
                                
                             </tbody>
                        </table>
                        <div class="paging-area">
                            <ul>
                                <li><a href="#none" class="prev-first"></a></li>
                                <li><a href="#none" class="prev"></a></li>
                                <li><a href="#none" class="active">1</a></li>
                                <li><a href="#none">2</a></li>
                                <li><a href="#none" class="next"></a></li>
                                <li><a href="#none" class="next-last"></a></li>
                            </ul>
                        </div>
                    </div>
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
	}
});
$(document).ready(function () {
	uijs.user.list();
	
// 	if (uijs.logininfo.get('auth') !== 'MANAGER') {
// 		uijs.msg.alert('권한이 없습니다.');
// 		location.href = '/work/list.view';
// 	}
});
</script>
</html>
