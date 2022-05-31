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
                        <h2>채널 등록</h2>
                    </div>
					<div class="complete_area">
                        <dl>
                            <dt>수정이 완료되었습니다.</dt>
                            <dd>
                                <div class="grey_list_type">
                                    <ul class="list_type01">
                                        <li>
                                            <dl>
                                                <dt>채널명</dt>
                                                <dd>${name}</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt>코드</dt>
                                                <dd>${code}</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt>사용환경</dt>
                                                <dd>${device}</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt>사용자구분</dt>
                                                <dd>${cuser}</dd>
                                            </dl>
                                        </li>
                                    </ul>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div class="btn_area">
                        <a href="/chan/list.view" class="btn_large_type01">목록보기</a>
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
	mixins: [channelMixin],
	created: function () {
		_app = this;
	}
});
</script>
</html>
