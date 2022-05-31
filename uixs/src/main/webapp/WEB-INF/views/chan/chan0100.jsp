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
                        <h2>채널관리</h2>
						<span class="tit_btn_area">
							<a href="/chan/insert.view" class="btn_mid_type01">채널 등록하기</a>
						</span>
                    </div>
					<ul class="view_list_wrap arrow" id="late_list">
						
					</ul>
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
	
	var channelListDom;
	/**
	 * 채널목록 생성
	*/
	function makeChannelList(data) {
		var html = '';
		
		for (var channel of data) {
			
			var bulTypeClass = '';
			
			switch(channel.cuser) {
				case '개인':
					bulTypeClass = 'bul_type01';
					break;
				case '금융상품몰' :
					bulTypeClass = 'bul_type02';
					break;
				case '기업' :
					bulTypeClass = 'bul_type03';
					break;
			}
			
			html +=
			'<li class="channel-item" data-code="'+channel.code+'">\n'+
				'<div class="list link ">\n'+
					'<a href="#none"><strong>'+channel.name+'</strong> <span class="'+bulTypeClass+'">'+channel.cuser+'</span></a>\n'+
					'<div class="btn_edit_area">\n'+
						'<button type="button" class="btn_small01 write btn-channel-modi" >수정</button>\n'+
// 						'<button type="button" class="btn_small01 delete btn-channel-del">삭제</button>\n'+
					'</div>\n'+
				'</div>\n'+
				'<div class="grey_list_type" style="display: none">\n'+
					'<div class="point_area">\n'+
						'<strong>작업현황</strong>\n'+
						'<ul>\n'+
							'<li><span>신청중</span> <em>('+channel.req_pending_cnt+'건)</em></li>\n'+
							'<li><span>작업중</span> <em>('+channel.req_working_cnt+'건)</em></li>\n'+
							'<li><span>작업완료</span> <em>('+channel.req_complete_cnt+'건)</em></li>\n'+
						'</ul>\n'+
						'<div class="point_btn_area">\n'+
							'<a href="#none" class="btn_small01 go work-list" data-code="'+channel.code+'">바로가기</a>\n'+
						'</div>\n'+
					'</div>\n'+
					'<ul class="list_type01 mt20">\n'+
						'<li>\n'+
							'<dl>\n'+
								'<dt>등록일자</dt>\n'+
								'<dd>'+(new Date(channel.regdate)).format('yyyy.MM.dd')+'</dd>\n'+
							'</dl>\n'+
						'</li>\n'+
						'<li>\n'+
							'<dl>\n'+
								'<dt>IA등록</dt>\n'+
								'<dd>\n'+ // 원본 <dd><span></span>
									'<a href="#none" class="btn_small01 go ia-insert" data-code="'+channel.code+'">바로가기</a>\n'+
								'</dd>\n'+
							'</dl>\n'+
						'</li>\n'+
					'</ul>\n'+
				'</div>\n'+
			'</li>\n';
		} // for
		
		
		channelListDom = $('#late_list').html(html);
		
		// 이벤트 등록
		addEvent(channelListDom);
	} // makeChannelList()
	
	// 채널 목록에있는 버튼 이벤트 추가
	function addEvent(context) {
		// 작업현황 바로가기버튼 이벤트
		context.find('.go.work-list').on('click', function (e) {
			e.preventDefault();
			
			var channel = $(this).attr('data-code');
			
			uijs.channel.set(channel);
			
			location.href = '/work/list.view';
		});	
		
		// ia 등록 바로가기버튼 이벤트
		context.find('.go.ia-insert').on('click', function (e) {
			e.preventDefault();
			
			var channel = $(this).attr('data-code');
			
			uijs.channel.set(channel);
			
			location.href = '/ia/manage';
		});	
		
		// 채널 수정버튼 클릭 이벤트
		context.find('.btn-channel-modi').on('click', function (e) {
			var code = $(this).closest('.channel-item').attr('data-code');
			
			var form = $('<form>', {
				method: 'post'
				, name: 'channelUpdateForm'
				, id: 'channelUpdateForm'
				, action: '/chan/update.view'
			});
			
			var inputCode = $('<input>', {
				name: 'code'
				, type: 'hidden'
				, value: code
			}).appendTo(form);
			
			form.appendTo('body');
			
			form.submit();
		});
		
		// 채널목록중 첫번째 show
		context.find('.list.link:eq(0)').addClass('active').next('.grey_list_type').show();
		
		// 채널목록 아코디언
		context.find('.list.link').on('click', function () {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active').next('.grey_list_type').hide();
			}
			else {
				$(this).addClass('active').next('.grey_list_type').show();
			}
		});
	}
	
	
	uijs.ajaxDef({
		url: '/chan/channels.data'
		, callback: function (data) {
			if (data !== null) {
				makeChannelList(data);
			}
		}
	});
});
</script>
</html>
