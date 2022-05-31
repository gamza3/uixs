<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../include/html_head.jsp" %>
</head>
<body>
	<div class="wrapper" id="v-app">
		<!--header-->
		<%@ include file="../include/header.jsp" %>
		<!--// header-->
		
		<!--container-->
		<div class="container">
            
            <div class="content">
                <div class="content_inner">
                    <div class="tit_area" >
                        <h2 style="">화면목록</h2>
                        <span class="tit_btn_area" v-if="!isMobile">
                            <a href="/ia/manage" class="btn_mid_type01" >메뉴생성/관리</a>
                        </span>
                    </div>
                    
                    <ul class="view_list_wrap bor_top">
                        <li>
                        	<ul class="pb_w_tab" v-if="tabChannel">
                        		<li><button @click="toggleTap('개인뱅킹')" :class="{'on': tabGubun == '개인뱅킹'}">개인뱅킹</button></li>
                        		<li><button @click="toggleTap('기업뱅킹')" :class="{'on': tabGubun == '기업뱅킹'}">기업뱅킹</button></li>
                        		<li><button @click="toggleTap('금융상품')" :class="{'on': tabGubun == '금융상품'}">금융상품</button></li>
                        		<li><button @click="toggleTap('인증센터')" :class="{'on': tabGubun == '인증센터'}">인증센터</button></li>
                        		<li><button @click="toggleTap('KJB서비스')" :class="{'on': tabGubun == 'KJB서비스'}">KJB서비스</button></li>
                        	</ul>
                            
                            <div class="grey_list_type white">
                                <div class="con_area">
                                    <div class="tit_area" style="display: ">
                                        <h2 style="height: 50px"></h2>
                                        <div class="input_section" style="display: ">
                                            <ul class="input_wrap">
                                                <li class="input_area search_case">
                                                    <label for="search-string">검색</label>
                                                    <input type="text" placeholder="화면명을 입력하세요" v-model="searchText" @keyup.enter="searchHandler" :style="isMobile && 'width: 82%'">
                                                    <button type="button" class="btn_search" @click.prevent="searchHandler"></button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div id="view-list-table">
<!--                                     <div class="input_section right_type" v-if="isMobile"> -->
<!--                                     	<ul class="input_wrap"> -->
<!--                                     		<li class="input_area search_case">  -->
<!--                                     			<label for="search-string">메뉴검색</label> -->
<!-- 	                                    		<input id="search-string" type="text" placeholder="검색어를 입력하세요" class="search-string" v-model="searchText" @keyup.enter="searchHandler">  -->
<!-- 	                                    		<button type="button" class="btn_search" @click.prevent="searchHandler"></button> -->
<!--                                     		</li> -->
<!--                                     	</ul> -->
<!--                                     </div> -->
                                    <table border="0" class="working-list">
								    <colgroup>
								      <col style="width:5%;" v-if="!isMobile"/>
								      <col style="width:auto;"/>
								      <col style="width:25%;" v-if="!isMobile"/>
								      <col style="width:10%;" v-if="!isMobile"/>
								      <col style="width:10%;" v-if="!isMobile"/>
								      <col style="width:7%;" v-if="!isMobile"/>
								    </colgroup>
								    <thead>
								    <tr>
								      <th v-if="!isMobile">No</th>
								      <th>Depth</th>
								      <th v-if="!isMobile">File Directory (URL)</th>
								      <th v-if="!isMobile">Date</th>
								      <th v-if="!isMobile">검수 상태</th>
								      <th v-if="!isMobile">퍼블 상태</th>
								    </tr>
								    </thead>
								    <tbody>
									    <template v-for="(ia, index) in searchList">
									    <tr v-if="ia.parent == 0" class="linetitle">
									      	<td :colspan="!isMobile ? 6 : ''">
									        	<div class="sub-tit">{{iaPath(ia.path)}}</div>
									      	</td>
									    </tr>
									    <tr v-else>
									    	<td v-if="!isMobile">{{index}}</td>
									      	<td style="text-align: left;" v-if="ia.link != '#' && ia.link != '' && ia.link">
									      		<a :href="docRoot+ia.link"  @click.prevent="openHtml(docRoot+ia.link, $event)">{{iaPath(ia.path)}}</a>
									      	</td>
									      	<td style="text-align: left;" v-else>
									      		{{iaPath(ia.path)}}
									      	</td>
									      	<td v-if="!isMobile"><a :href="docRoot+ia.link" @click.prevent="openHtml(docRoot+ia.link, $event)">{{ia.link}}</a></td>
									      	<td v-if="!isMobile">{{(new Date(ia.update_date)).format('yyyy-MM-dd')}}</td>
									      	<td v-if="!isMobile">{{confirmText(ia.confirm)}}</td>
									      	<td v-if="!isMobile">{{publText(ia.publ)}}<span class="state"><span class="complete"></span></span></td>
									    </tr>
									    </template>
								    </tbody>
                                   	</table>
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
		<!--// container-->
		
		<!-- 모바일 html 미리보기 -->
		<div class="modal_layer_pop" v-show="htmlShow" @click="closeHtmlFromDim">
			<div class="mobile_view" style="position:absolute">
	            <ul class="box_type_check" style="position: absolute; top: -58px; left: 5px;">
	                <li>
	                    <input type="radio" id="resize-viewer1" name="resize-viewer" value="375" class="resize-viewer" checked>
	                    <label for="resize-viewer1">375px</label>
	                </li>
	                <li >
	                    <input type="radio" id="resize-viewer2" name="resize-viewer"   value="360" class="resize-viewer">
	                    <label for="resize-viewer2">360px</label>
	                </li>
	                <li>
	                    <input type="radio" id="resize-viewer3" name="resize-viewer" value="320" class="resize-viewer">
	                    <label for="resize-viewer3">320px</label>
	                </li>
	                <li>
	                    <input type="text" readonly id="resize-viewer-custom" name="resize-viewer" value="375px" class="resize-viewer" style="font-size: 12px; border: 1px solid #ccc">
	                </li>
	            </ul>
	            <iframe src="about:blank" frameborder="0" id="html-view-area" style="width: 100%; height: 100%; display: none; overflow: hidden;"></iframe>
	        </div>
        </div>
		
	</div> <!-- // end : wrapper -->

</body>
<script>

var _app = null;

new Vue({
	el: '#v-app',
	store: _store,
	mixins: [channelMixin],
	data: {
		list: [],
		iaList: [], // ia list
		searchList: [],
		searchText: '',
		htmlShow: false, // html 클릭하여 미리보기 여부
		resizing: false, // html 미리보기 팝업창 리사이징 여부
		perList: [], // 개이뱅킹
		bizList: [], // 기업뱅킹
		pdtList: [], // 금융상품몰 리스트
		autList: [], // 인증센터
		kjbList: [], // kjb서비스
		tabGubun: '개인뱅킹', // 개인뱅킹 선택인경우
		tabChannel: false,
	},
	created: function () {
		_app = this;
		
		this.app__init();
	},
	computed: {
		docRoot: function () {
			var channel = this.getChannelCode;
			var url = '';
			
			switch(channel) {
				// 인터넷뱅킹
				case 'PB_W':
					url = 'http://13.125.31.83:7002/resource/';
					break;
				// 모바일 웹뱅킹
				case 'PB_M':
					url = 'http://13.125.31.83:7004/websquare/websquare.html?w2xPath=/';
					break;
				// 스마트뱅킹
				case 'SB_M':
					url = 'http://13.125.31.83:7003/';
					break;
				// 기업스뱅
				case 'BS_M':
					url = 'http://13.125.31.83:7003/';
					break;
				default: url = 'http://13.125.31.83:7001/'; // uix관리
			}
			
			return url;
		},
	},
	watch: {
		channels: {
			handler: function () {
				this.loading('start');
				var app = this;
				
				uijs.ajaxDef({
					url: '/ia/ialist',
					data: {site_code: this.getChannelCode},
					async: true,
					callback: function (data) {
						_app.iaList = data;
						_app.list = data;
						
						// 인터넷 뱅킹인 경우만
						if (_app.getChannelCode == 'PB_W') {
							_app.tabChannel = true;
							
							_app.iaList.forEach(function (item) {
								if(item.path.startsWith('개인뱅킹')){
									_app.perList.push(item);
								} 
								
								if(item.path.startsWith('기업뱅킹')){
									_app.bizList.push(item);
								} 
								
								if(item.path.startsWith('금융상품몰')){
									_app.pdtList.push(item);
								} 
								
								// 인증센터 리스트
								if(item.path.startsWith('인증센터')){
									_app.autList.push(item);
								} 
								
								// 인증센터 리스트
								if(item.path.startsWith('KJB서비스')){
									_app.kjbList.push(item);
								} 
							});
							
							_app.list = _app.perList;
						}
						
						app.loading('stop');
					}
				});	
			},
			deep: true
		},
		list: function () {
			this.searchList = this.list;
		}
	},
	mounted: function () {
		// 미리보기 영역 resize
	    $('.mobile_view').resizable({
	        minWidth: 320,
	        minHeight: 640,
	        handles: 'w,e',
	        start: function(event, ui) {
	            $('#html-view-area').css('pointer-events', 'none');
	            
	            _app.resizing = true; // html 미리보기 팝업창 리사이징 여부
	        },
	        stop: function (event, ui) {
	            $('#html-view-area').css('pointer-events', 'auto');
	            $('#resize-viewer-custom').val(ui.size.width + 'px');
	            
	            ui.element[0].style.left = 'auto';
	            
	            setTimeout(function () {
	            	_app.resizing = false; // html 미리보기 팝업창 리사이징 여부
	            })
	        }
	    });
	    
	    // 미리보기 화면 리사이즈
	    $('.resize-viewer').on('change', function () {
	        var size = $(this).val();

	        $('.mobile_view').width(size);
	        
	        $('#resize-viewer-custom').val(size+'px');
	    })
	    .on('focus', function () {
	    	$('.box_type_check').find('input:radio').each(function () {
	    		$(this).prop('checked', false);
	    	})
	    });
	    
	 	// 미리보기영역 사이즈 커스텀 input 에서 엔터 친 경우 미리보기창 사이즈 조절
	    $('#resize-viewer-custom').on('keyup', function () {
	    	var size = parseInt($(this).val());
	    	
	    	$('.mobile_view').width(size);
	    });
	},
	methods: {
		changeSize: function (size) {
			console.log(size)
		},
		// 검수결과 텍스트 출력 
		confirmText: function (s) {
			switch(s) {
				case '1':
					return '작업중';
					break;
				case '2':
					return '검수요청';
					break;
				case '3':
					return '검수완료';
					break;
				default: return '';
			}
		},
		// 퍼블상태 텍스트 출력
		publText: function (s) {
			switch(s) {
				case '1':
					return '작업중';
					break;
				case '2':
					return '완료';
					break;
				case '3':
					return '수정중';
					break;
				default: return '';
			}
		},
		// 모바일 html 미리보기 팝업 열기
		openHtml: function (url, e) {
	        var pathname = $(this).attr('data-url');
	        var channel = this.getChannelCode;
	        
	        if (e.shiftKey || channel == 'PB_W' || this.isMobile) {
	        	window.open(url + '?' + Date.now());
	        	e.preventDefault();
	        }
	        else {
		        $('#html-view-area').attr('src', url + '?' + Date.now());
		        setTimeout(function () {
		            $('#html-view-area').show();
		        }, 50);
		        
		        this.htmlShow = true;
				this.resizing = false;
	        }
		},
		// 모바일 html 미리보기 팝업 딤드영역 클릭으로 닫기
		closeHtmlFromDim: function (e) {
			if (e.target.getAttribute('class') == 'modal_layer_pop' && !this.resizing) {
				this.htmlShow = false;
			}
		},
		iaPath: function (path) {
			var newPath = path.replace(/\\/g, ' > ');
			newPath = newPath.replace('&gt;', '>');
			
			return newPath;
		},
		// 인터넷뱅킹인 경우 탭 event
		toggleTap: function (gubun) {
			if (gubun == '개인뱅킹') {
				this.list = this.perList;
			}
			if (gubun == '기업뱅킹') {
				this.list = this.bizList;
			}
			if (gubun == '금융상품') {
				this.list = this.pdtList;
			}
			if (gubun == '인증센터') {
				this.list = this.autList;
			}
			if (gubun == 'KJB서비스') {
				this.list = this.kjbList;
			}
			
			this.tabGubun = gubun;
		},
		searchHandler: function () {
			var app = this;
			
			if (this.searchText.replace(/\s/g, '') == '') {
				this.searchList = this.list;
			}
			else {
				this.searchList = this.list.filter(function (item) {
					return item.path.indexOf(app.searchText) != -1;
				});
			}
		}
	}
});

</script>
</html>
