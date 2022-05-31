<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>광주은행</title>
<link rel="stylesheet" href="/css/common.css">
<script type="text/javascript" src="/js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="/js/jquery-ui.js"></script>

<script type="text/javascript" src="/js/html.popup.js"></script>
<script type="text/javascript" src="/js/comment/comment.view.js"></script>
<script type="text/javascript" src="/js/axios.min.js"></script>
<!-- <script type="text/javascript" src="/js/kjbui.js"></script> -->

</head>
<body>
	<div class="wrapper">
		<!--header-->
		<div class="header">
			<div>
				<h1><a href="#none"><img src="../../img/img_logo.png" alt=""></a></h1>
				<div class="channel_select mb40">
					<div class="input_section">
						<ul class="input_wrap">
							<li class="input_area">
								<label for="">채널명</label>
								<div class="select_list"> <!--dropdown  열릴때 on클래스 추가, 아래 ul태그 block-->
									<div class="active">
										모바일뱅킹 <span class="bul_type01">개인</span>
									</div>
									<ul style="display: none; z-index: 10000;" class="option-list">
										<li><a href="#none">모바일뱅킹 <span class="bul_type01">개인</span></a></li>
										<li><a href="#none">모바일뱅킹 <span class="bul_type03">개인</span></a></li>
										<li><a href="#none">모바일뱅킹 <span class="bul_type03">개인</span></a></li>
										<li><a href="#none">모바일뱅킹 <span class="bul_type03">개인</span></a></li>
										<li><a href="#none">모바일뱅킹 <span class="bul_type03">개인</span></a></li>
										<li><a href="../chan/chan0100.html">채널관리</a></li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<nav>
					<ul>
						<li><a href="#none" class="on">작업관리</a></li>
						<li><a href="#none">화면목록</a></li>
						<li><a href="#none">권한관리</a></li>
						<li><a href="#none">파일관리</a></li>
					</ul>
				</nav>
				<a href="#none" class="btn_logout" style="display: none;">로그아웃</a>
			</div>
		</div>
		<!--// header-->
		<!--container-->
		<div class="container">
			
			<div class="content">
				<div class="content_inner">
					<div class="tit_area" >
                        <h2 style="border-bottom: 0;">작업관리</h2>
						<div class="input_section right_type">
							<ul class="input_wrap">
								<li class="input_area search_case">
									<label for="">검색</label>
									<select class="selectbox" id="search_list">
										<option value="1">작업요청자</option>
										<option value="2">메뉴명</option>
										<option value="3">작업기간</option>
									</select>
									<input type="text" class="search-string" placeholder="검색어를 입력하세요">
									<input type="text" class="datepicker" placeholder="시작일" style="width: 140px;display: none;">
									<input type="text" class="datepicker" placeholder="종료일" style="width: 140px;display: none;">
									<button type="button" class="btn_search"></button>
								</li>
							</ul>
					
						</div>
                    </div>
					
					
					<ul class="view_list_wrap bor_top">
						<li>
							<div class="list">
								<div class="ch_tit">
									<strong>모바일뱅킹</strong> <span class="bul_type01">개인</span>
									<button type="button" class="btn_small03 work work-inspection">작업요청</button>
								</div>
								<div class="confirm_area">
									<dl>
										<dt>검수요청</dt>
										<dd>
											<ul>
												<li>
													<a href="#none" id="btn-ins-request">
														요청중
														<span>1건</span>
													</a>
												</li>
												<li>
													<a href="#none">
														검수완료
													<span>10건</span>
													</a>
												</li>
											</ul>
										</dd>
									</dl>

								</div>
								<div class="btn_edit_area">
									
								</div>
							</div>
							<div class="grey_list_type white none">
								<ul class="work_list_wrap">
									<li class="work_inner">
										<dl>
											<dt>
												<p>작업요청내역</p>
												<span>4건</span>
											</dt>
											<dd>
												<div class="work_factor request" id="new-request-panel" style="display: none;">
													<dl>
														<dt>
															<div>ID A007</div>
															<a href="#none"><span class="bul_small_type02">변경</span>빠른이체를 추가해주세요</a>
														</dt>
														<dd>
															<div class="work_area">
																이체안에 빠른이체를 추가해주세요.
															</div>
															<div class="state_step_area">
																<span class="step01">미확인</span>
															</div>
														</dd>
													</dl>
												</div>
												<div class="work_factor request">
													<dl>
														<dt>
															<div>ID A007</div>
															<a href="#none">
																<span class="bul_small_type02">변경</span>
																어카운트인포 관리서비스 추가작업
															</a>
														</dt>
														<dd>
															<div class="work_area">
																수정사항 내용이 들어가는 부분입니다.
															</div>
															<div class="state_step_area">
																<span class="step03">작업불가</span>
															</div>
														</dd>
													</dl>
												</div>
												
											</dd>
										</dl>
									</li>
									<li class="work_inner">
										<dl>
											<dt>
												<p>작업진행내역
													<select class="selectbox" name="" id="" style="height: 40px; width: 120px; background: #fff url(../../img/ico_select_arrow1.png) no-repeat right 15px top 50%;;">
														<option value="">전체보기</option>
														<option value="">기획</option>
														<option value="">디자인</option>
														<option value="">퍼블</option>
													</select>
												</p>
												<span>4건</span>
											</dt>
											<dd>
												<div class="work_factor working" style="display: none;" id="new-working-panel">
													<dl>
														<dt>
															<div>ID A007</div>
															<a href="#none"><span class="bul_small_type02">변경</span>빠른이체를 추가해주세요</a>
														</dt>
														<dd>
															<div class="work_area">
																이체안에 빠른이체를 추가해주세요.
															</div>
															<div class="date_area">
																<span>~2021.06.10까지</span>
															</div>
															<div class="state_step_area">
																<span class="step01">기획</span>
															</div>
															<!-- <div class="work_member">
																<a href="#none">기획</a>
															</div> -->
														</dd>
													</dl>
												</div>
												<div class="work_factor working">
													<dl>
														<dt>
															<div>ID A007</div>
															
															<a href="#none"><span class="bul_small_type01">신규</span>
																메뉴별 아이콘 변경</a>
														</dt>
														<dd>
															<div class="work_area">
																수정사항 내용이 들어가는 부분입니다.
															</div>
															<div class="date_area">
																<span>~2021.05.31까지</span>
															</div>
															<div class="state_step_area">
																<span class="step01">퍼블</span>
															</div>
														</dd>
													</dl>
												</div>
											</dd>
										</dl>
									</li>
									<li class="work_inner">
										<dl>
											<dt>
												<p>작업완료
													<a href="#none" class="btn_small01" id="btn-complete-more">작업완료 더보기</a>
												</p>
												<span>4건</span>
											</dt>
											<dd>
												<div class="work_factor complete" id="new-complete-panel" style="display: none;">
													<dl>
														<dt>
															<div>ID A007</div>
															<ul class="work_label">
																<li><a href="#none" class="work_label04">작업완료</a></li>
															</ul>
															<a href="#none"><span class="bul_small_type01">변경</span>
																이체안에 빠른이체를 추가해주세요.</a>
														</dt>
														<dd>
															<div class="work_area">
																이체안에 빠른이체를 추가해주세요.
															</div>
															<div class="date_area">
																<span>~2021.06.10까지</span>
															</div>
															
														</dd>
													</dl>
												</div>
												<div class="work_factor complete">
													<dl>
														<dt>
															<div>ID A007</div>
															<ul class="work_label">
																<li><a href="#none" class="work_label04">작업완료</a></li>
															</ul>
															<a href="#none"><span class="bul_small_type01">신규</span>
																어카운트인포 관리서비스 추가작업</a>
														</dt>
														<dd>
															<div class="work_area">
																수정사항 내용이 들어가는 부분입니다.
															</div>
															<div class="date_area">
																<span>~2021.02.28까지</span>
															</div>
															
														</dd>
													</dl>
												</div>
												<div class="work_factor complete">
													<dl>
														<dt>
															<div>ID A007</div>
															<ul class="work_label">
																<li><a href="#none" class="work_label04">작업완료</a></li>
															</ul>
															<a href="#none"><span class="bul_small_type01">신규</span>
																어카운트인포 관리서비스 추가작업</a>
															
														</dt>
														<dd>
															<div class="work_area">
																수정사항 내용이 들어가는 부분입니다.
															</div>
															<div class="date_area">
																<span>~2021.02.28까지</span>
															</div>
															
														</dd>
													</dl>
												</div>
											</dd>
										</dl>
									</li>
								</ul>
							</div>
						</li>
					</ul>
					<!-- <div class="btn_mywork">
						<button type="button" id="open-todo-list">
							<span>내 할일을 확인해보세요</span>
							<strong></strong>
						</button>
					</div> -->
				</div>
			</div>
		</div>
		<!--// container-->
	</div>
	<div class="modal_layer_pop" id="todo-list" style="display: none;">
		<div class="modal_layer_right" style="right: -100%;">
			<div class="pop_tit">
				<h1>내 할일</h1>
                <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
            </div>
			<div class="pop_content">
				<ul class="work_summary">
					<li>
						<div>ID A006 <span class="bul_small_type01">신규</span></div>
						<a href="#none">어카운트인포 관리서비스 추가작업</a>
						<div class="work_box_summary">
							<ul>
								<li><strong><span>[댓글]</span> 수정사항은 언제까지 진행되어야 할까요?</strong></li>
								<li><strong><span>[파일]</span> 설계서가 업로드 되었습니다.</strong></li>
							</ul>
						</div>
					</li>
					
				</ul>
				<div class="btn_more_area">
					<a href="#none" class="w100">더보기</a>
				</div>
			</div>
		</div>
	</div>
	
	
	<div class="part"></div>
	
	
	<script type="text/javascript">
		$(document).ready(function () {
			console.log('sdfsf')
			
			var testDiv = $('<div class="modal">우우우우');
			
			$('.part').replaceWith(testDiv);
		});
	</script>

</body>

</html>

