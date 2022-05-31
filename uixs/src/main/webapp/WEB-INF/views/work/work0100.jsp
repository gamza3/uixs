<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../include/html_head.jsp" %>
</head>
<body>
<div class="wrapper" id="v-app" v-cloak>
	<%@ include file="../include/header.jsp" %>
	
	<div class="container" :class="{'mobile-container': isMobile}">
			
			<div class="content">
				<div class="content_inner">
					<div class="tit_area" >
                        <h2 style="border-bottom: 0;">작업관리</h2>
						<div class="input_section right_type" :style="isMobile && 'width: 100%; position: relative'">
							<ul class="input_wrap" :style="isMobile && 'width: 100%;max-width:none;'">
								<li class="input_area search_case" :style="isMobile && 'display: flex;justify-content:right;'">
									<label for="" v-if="!isMobile">검색</label>
									<select class="selectbox" id="search_list" v-model="searchKey" :style="isMobile && 'width: 30%'">
										<option value="ALL">전체</option>
										<option value="USERNAME">작성자</option>
										<option value="REQUEST_TITLE">제목</option>
										<option value="REQUEST_CONTENT">내용</option>
										<option value="REQUEST_ID">화면아이디</option>
									</select>
									<input type="text" class="search-string" placeholder="검색어를 입력하세요" v-model="searchWord" @keyup.enter="listSearch" :style="isMobile && 'width: 70%'">
									<button type="button" class="btn_search" @click.prevent="listSearch"></button>
								</li>
							</ul>
						</div>
                    </div>
					
					<ul class="view_list_wrap bor_top">
						<li>
							<div class="list">
								<div class="ch_tit">
									<strong class="tit-channel-type">{{selectedChannel.name}}</strong> <!--<span class="bul_type01">개인</span>-->
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
														<span style="color:red">{{confirmCount.REQUEST_CNT}}건</span>
													</a>
												</li>
												<li>
													<a href="#none">
														검수완료
													<span>{{confirmCount.COMPLETE_CNT}}건</span>
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
									<li class="work_inner" id="request_list">
										<dl  v-show="requestListShow">
											<dt><p>작업요청내역</p>
												<span>{{requestList.length}}건</span>
											</dt>
											<dd>
												<div class="work_factor request" style="position: relative" v-for="item in requestList">
													<span class="new_sticker" 
														v-if="$dateDiff(new Date(), item.regdate) >= -2">
													</span>
													<dl>
														<dt>
															<div class="bid">ID {{item.request_id}} 
																<a href="#none" 
																	v-if="loginInfo.userid == item.userid"
																	class="request_work_del" 
																	:data-reuqest-id="item.request_id" 
																	:data-state="item.request_state"
																	@click="requestWorkDelete(item.request_id)"></a>
															</div>
															<a href="#none" @click="requestWorkDetail(item.request_id)">{{item.request_title}}</a>
														</dt>
														<dd>
															<div class="work_area" 
																v-html="getReplaceContent(item.request_content)">
															</div>
															<div class="state_step_area">
																<span class="step01">
																{{
																item.request_state == 'PENDING' ? 
																'미확인' : 
																('CANCEL' ? '작업불가' : item.request_state)
																}}
																</span>
															</div>
														</dd>
													</dl>
												</div>
											</dd>
										</dl>
										<div class="btn_more_area" v-if="requestList.length >= limit">
					                    	<a href="#none" class="btn-more-view" @click="getRequestListMore">더보기</a>
										</div>
									</li> <!-- // 미확인 게시물 목록 -->
<!-- 									<li class="work_inner" id="request_list"></li> -->
									<li class="work_inner" id="request_list" >
										<process-work-list 
											:prop-list="processList" 
											@show-detail="processWorkDetail" 
											:key="processListKey"></process-work-list>
											
										<div class="btn_more_area" v-if="processList.length >= limit">
											<a href="#none" class="btn-more-view" @click="getProcessListMore">더보기</a>
										</div>
									</li>
									<li class="work_inner">
										<complete-work-list 
											:prop-list="completeList" 
											@show-detail="processWorkDetail"
											:key="completeKey"></complete-work-list>
										
										<div class="btn_more_area" v-if="completeList.length >= limit">
											<a href="#none" class="btn-more-view" @click="getCompleteListMore">더보기</a>
										</div>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				
				</div>
			</div>
		</div>
		<!--// container-->
		
		<!--start: 진행중인 작업 상세보기 팝업 -->
		<div 
			is="process-work-detail" 
			v-if="showProcessWorkDetail"
			@show-detail="processWorkDetail"
			@close-detail="processWorkDetailClose"
			:opener="processWorkDetailCaller"
			:request-id="processWordDetailId"
			:key="processWordkDetailKey"></div>
		<!--//end: 진행중인 작업 상세보기 팝업 -->
		
		<!-- 요청작업 상세보기 팝업 -->
		<request-work-detail 
			:request-id="requestWorkDetailId" 
			:key="requestWorkDetailKey" 
			v-if="requestWorkDetailId"
			@close="requestWorkDetailClose"></request-work-detail>
			
		<msg-component></msg-component>
</div>

<script type="text/javascript" src="/resources/js/src/RequestWorkComponent.js?v=20220524_01"></script>
<script type="text/javascript" src="/resources/js/src/ProcessWorkComponent.js?v=20220526_01"></script>
<script type="text/javascript" src="/resources/js/src/CompleteWorkComponent.js?v=20220524_01"></script>
<script type="text/javascript">
var EventBus = new Vue();

var vapp = null;
new Vue({
	el: '#v-app',
	store: _store,
	mixins: [channelMixin],
	components: {
		'RequestWorkDetail': RequestWorkDetail(),
		'process-work-list': ProcessWorkList,
		'process-work-detail': ProcessWorkDetail,
		'complete-work-list': CompleteWorkList,
	},
	data: {
		requestList: [], // 미확인 게시물 목록
		processList: [], // 확인한 게시물 목록
		processListKey: 0,
		completeList: [], // 완료 목록
		completeKey: 0, // 완료목록 갱신 키
		confirmCount: {
			REQUEST_CNT: 0,
			COMPLETE_CNT: 0
		},
		requestListShow: false,
		searchKey: 'ALL', // 검색 필터
		searchWord: '', // 검색어
		searched: false, // 검색했는지 안했는지
		page: {
			requestWork: 1,
			processWork: 1,
			completeWork: 1
		},
		start: {
			requestWork: 1,
			processWork: 1,
			completeWork: 1
		},
		limit: 10,
		showProcessWorkDetail: false,
		processWordDetailId: '',
		processWordkDetailKey: 0,
		processWorkDetailCaller: 'process',
		requestWorkDetailId: '', // 작업요청 아이디
		requestWorkDetailKey: 0, // 작업요청 상세보기 팝업 고유키
	},
	created: function () {
		vapp = this;
		
		EventBus.$on('setConfirmCount', this.setConfirmCount);
		EventBus.$on('loadList', this.loadList);
		
		this.app__init();
	},
	mounted: function () {
		this.$socket.onmessage = this.onMessage;
	},
	watch: {
		channels: {
			handler: function() {
				this.loadList();
			},
			deep: true
		},
		requestList: {
			handler: function () {
				this.requestListShow = true;
			},
			deep: false
		},
		processList: {
			handler: function () {
				this.processListKey += 1;
				// 감수요청, 완료 카운팅
				this.setConfirmCount();
			},
			deep: true
		},
		completeList: {
			handler: function () {
				this.completeKey += 1;
			},
			deep: true
		}
	},
	methods: {
		onMessage: function (evt) {
		    var data = evt.data;
		    
		    // 메세지 있음 표시
		    this.$store.commit('setHasMessage', true);
		    
		    $('.message-alam').remove();
		    
		    var toastWrapper = $('<div>', {
				css: {
					position: 'fixed'
					, left: 0
					, top: 0
					, height: 50
					, width: '100%'
					, zIndex: 99999
					, background: 'rgba(0, 0, 0, 0.7)'
					, textAlign: 'center'
					, color: '#fff'
					, lineHeight: '50px'
				}
				, class: 'message-alam'
			})
			.html(data)
			.on('click', function () {
				toastWrapper.remove();
				//var msgCnt = parseInt($('.bell').find('.alam_msg').attr('data-cnt'));
				//console.log(msgCnt)
				//$('.bell').find('.alam_msg').attr('data-cnt', data.MSG_CNT+1).html('알림 '+data.MSG_CNT)
				//uijs.viewMsg();
			})
			.appendTo('body');
			
			//uijs.setMsgCnt();
		},
		// 목록 조회 통합
		loadList: async function(target = null) {
			this.loading('start');
			
			var get = {request: false, process: false, complete: false};
			
			if (target == null) {
				get = {request: true, process: true, complete: true};
			}
			else {
				target.forEach(function (item) {
					get[item] = true;
				});
			}
			
			await this.getRequestWorkList(get.request)
			.then(function (list) {
				vapp.requestList = list;
			})
			.catch(function (error) {
				console.log(error);
			});
			
			await this.getProcessWorkList(get.process)
			.then(function (list) {
				vapp.processList = list;
			})
			.catch(function (error) {
				console.log(error);
			});
			
			await this.getCompleteWorkList(get.complete)
			.then(function (list) {
				vapp.completeList = list;
			})
			.catch(function (error) {
				console.log(error);
			});
			
			this.loading('stop');
		},
		// 진행중인 작업내역 조회
		getProcessWorkList: function (get = true) {
            var app = this;
            
            var sendParam = {
   				site_code: this.getChannelCode,
   				start: this.start.processWork,
   				limit: this.limit
   			};
   			
   			if (this.searched) {
   				sendParam.search_key = this.searchKey;
   				sendParam.search_word = this.searchWord;
   			};
   			
    		return new Promise(function (resolve, reject) {
    			if (!get) reject('no search');
    			
	            uijs.ajaxDef({
	                url: '/work/work_list',
	                data: sendParam,
	                method: 'GET',
	                async: true,
	                callback: function(data){
	                	resolve(data);
	                }
	            });
    		});
		},
		// 요청작업 목록
		getRequestWorkList: function (get = true) {
			var sendParam = {
				site_code: this.getChannelCode,
				start: this.start.requestWork,
				limit: this.limit
			};
			
			if (this.searched) {
				sendParam.search_key = this.searchKey;
				sendParam.search_word = this.searchWord;
			};
			
			return new Promise(function (resolve, reject) {
				if (!get) reject('no search');
				// 미확인 게시물 데이터 조회
				uijs.ajaxDef({
					url: '/work/request_list',
					data: sendParam,
					method: 'GET',
					async: true,
					callback: function (data) {
						resolve(data);
					}
				});
			});
		},
		// 작업완료 목록 조회
		getCompleteWorkList: function (get = true) {
			var sendParam = {
   				site_code: this.getChannelCode,
   				start: this.start.completeWork,
   				limit: this.limit,
   				orderkey: 'regdate',
				listsort: 'd',
   			};
   			
   			if (this.searched) {
   				sendParam.search_key = this.searchKey;
   				sendParam.search_word = this.searchWord;
   			};
   			
   			return new Promise(function (resolve, reject) {
   				if (!get) reject('no search');
   				
				uijs.ajaxDef({
					url: '/work/complete_list'
					, data: sendParam
					, method: 'GET'
					, dataType: 'json'
					, async: true
					, callback: function (data) {
						resolve(data);
					}
				});
   			});
		},
		listSearch: function (e) {
// 			if (this.searchKey === 'ALL') {
// 				this.searched = false;
				
// 				this.searchWord = '';
// 			}
// 			else {
// 				this.searched = true;
// 			}

			this.searched = true;
			
			// page 초기화
			for(var page in this.page) {
				this.page[page] = 1;
			}
			
			// start 초기화
			for(var start in this.start) {
				this.start[start] = 1;
			}
			
			this.loadList();
		},
		// 진행중인 작업 목록 더보기
		getProcessListMore: async function () {
			this.page.processWork += 1;
			this.start.processWork = (this.page.processWork - 1) * this.limit + 1;
			
			this.loading('start');
			
			await this.getProcessWorkList().then(function (response) {
				if (!response.length) {
					alert('더이상 목록이 없습니다.');
					vapp.page.processWork -= 1;
				}
				else {
					vapp.processList.push(...response);	
				}
			});
			
			this.loading('stop');
		},
		// 요청 작업 목록 더보기
		getRequestListMore: async function () {
			this.page.requestWork += 1;
			this.start.requestWork = (this.page.requestWork - 1) * this.limit + 1;
			
			this.loading('start');
			
			await this.getRequestWorkList().then(function (response) {
				if (!response.length) {
					alert('더이상 목록이 없습니다.');
					vapp.page.requestWork -= 1;
				}
				else {
					vapp.requestList.push(...response);	
				}
			});
			
			this.loading('stop');
		},
		// 완료된 작업목록 더보기
		getCompleteListMore: async function () {
			this.page.completeWork += 1;
			this.start.completeWork = (this.page.completeWork - 1) * this.limit + 1;
			
			this.loading('start');
			
			await this.getCompleteWorkList().then(function (response) {
				if (!response.length) {
					alert('더이상 목록이 없습니다.');
					vapp.page.completeWork -= 1;
				}
				else {
					vapp.completeList.push(...response);	
				}
			});
			
			this.loading('stop');
		},
		processWorkDetail: function (id, caller='process') {
			
// 			if (this.isMobile) {
// 				alert('PC버전 에서 확인해 주세요.');
// 				return;
// 			}
			
			this.showProcessWorkDetail = true;
			
			// 진행중인 작업 상세보기할 아이디
			this.processWordDetailId = id;
			// 진행중인 작업 상세보기 컴포넌트 키 증가
			this.processWordkDetailKey += 1;
			// store workStore 실행
			this.$store.commit('workStore/setWorkDetailOpener', caller);
			this.processWorkDetailCaller = caller;
		},
		processWorkDetailClose: function () {
			this.showProcessWorkDetail = false;
		},
		requestWorkDetailClose: function () {
			this.requestWorkDetailId = null;
		},
		// 요청작업 상세보기
		requestWorkDetail: function (id) {
// 			if (this.isMobile) {
// 				alert('PC버전 에서 확인해 주세요.');
// 				return;
// 			}
			this.requestWorkDetailId = id;
		},
		// 요청작업 삭제
		requestWorkDelete: function (id) {
			if(confirm('게시글을 삭제 하시겠습니까?')) {
				uijs.ajaxDef({
					url: '/work/request_list/delete.data'
					, data: {'request_id': id}
					, dataType: 'text'
					, callback: function (data) {
						// 작업요청내역 다시 로드
						vapp.loadList(['request']);
					}
				});
			}
		},
		setConfirmCount: function () {
			var app = this;
			
			var sendParam = {
   				site_code: this.getChannelCode
   			};
   			
   			if (this.searched) {
   				sendParam.search_key = this.searchKey;
   				sendParam.search_word = this.searchWord;
   			};
			
			uijs.ajaxDef({
				url: '/work/work_list/confirm_count'
				, data: sendParam
				, callback: function (data) {
					if(data) {
						app.confirmCount = data;
					}
				}
			});
		},
		getReplaceContent: function (str) {
			return str.replace(/\r\n/g, '<br>');
		},
	}
});
$(function() {
	/*
	var requestList = uijs.requestWork.requestWorkList({
		"appendPosition": "#request_list"
	});
	
	
	var processWork = uijs.processWork.list({
		'appendPosition': '#working_list'
	})
	
	var completeWork = uijs.completeWork.list();
	*/
	
	$('.search-string').on('change', function () {
		console.log($(this).val())
	});
	
	$('.work-inspection').on('click', function() {
		location.href = '/work/request/insert.view';
	})
});
</script>
</body>
</html>