'use strict';

/*function loading(flag) {
        
    var loadingContainer = $('<div/>', {class: 'loading-container'});
    var loading = $('<div/>', {class: 'loading'});
    var loadingText = $('<div/>', {id: 'loading-text'}).text('loading');
        
    loading.appendTo(loadingContainer);
    loadingText.appendTo(loadingContainer);

    
    if (flag == 'start') {
        loadingContainer.appendTo('body');
    }
        $('#loading').remove();
    }
}*/
//import {JobSchedule} from './jsx/root.js';
 
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

window.uijs = (function ($) { 'use strict';
	
	var uijs = {};
	
	var _workType = {
		NEW: {
			text: '신규'
			, css: 'bul_small_type01'
		}
		, EDIT: {
			text: '변경'
			, css: 'bul_small_type02'
		}
	};
	
	Object.assign = window.Object.assign || {};
	
	function popupFrame(type) {
		
		var workType = '';
		
		if (type == 'work') {
			workType = 'work_type';
		}
		
		var frame =  $(
			'<div class="modal_layer_pop '+workType+'" id="vue-popup">\n'+
			'	<div class="modal_layer_inner" style="background:#fff">\n'+
			'		<div class="pop_tit"></div>\n'+
			'		<div class="pop_content" style="height: 750px;"></div>\n'+
			'	</div>\n'+
			'</div>'
		);
		
		return frame;
	};
	
	function objectAssign(def, opt) {
		var rtn = def;
		
		if (opt != undefined) {
			for(var key in opt) {
				rtn[key] = opt[key];
			}
		}
		
		return rtn;
	}
	
	function loading(flag) {
		
		var loadingContainer = $('<div/>', {class: 'loading-container'});
        var loading = $('<div/>', {class: 'loading'});
        var loadingText = $('<div/>', {id: 'loading-text'}).text('loading');
            
        loading.appendTo(loadingContainer);
        loadingText.appendTo(loadingContainer);
    
        
        if (flag == 'start') {
            loadingContainer.appendTo('body');
        }
        else {
            $('.loading-container').remove();
        }
        
	}
	
	
	function getIa() {
		var rtn = null;
		
		var sendData = {
			site_code: uijs.channel.get()
			, parent: 0
		};
		
		uijs.ajaxDef({
			ajaxOption: {
				url: '/ia/iadata',
				method: 'GET',
				data: sendData
			},
			callback: function (data) {
				rtn =  uijs.iatree.makeTreeData(data);
			}
		});
		
		return rtn;
	}
	
	function getChildTree(iaNo) {
		var ia = getIa();
			
		return ia.filter(function(t) { return t.parent == iaNo });
	}
	
	/**
	 * 작업요청 메뉴 전체경로 
	 */
	function getMenuPathString(requestIaList) {
		var path = requestIaList.map(function (item) {
			var itemArr = item.PATH.split('[>]');
			var itemArrRevers = itemArr.reverse();
			
			return itemArrRevers.join(' > ');
		});
		
		return path;
	}
	
	
	/**
	 * 작업요청 내역 상세 
	 */
	function getRequestListOne(ref_table, ref_id) {
		
	}
	
	/**
	 * 작업요청 내역 상세 
	 */
	function getWorkListOne(ref_table, ref_id) {
		
	}
	
	uijs.msg = (function () {
		
		return {
			alert: function (message) {
				window.alert.call(null, message);
			},
			confirm: function (message, confirmF, cancelF) {
				if (window.confirm.call(null, message)) {
					confirmF.call(null);
				}
				else {
					if (cancelF != undefined) {
						cancelF.call(null);
					}
				}
			}
		};
		
	})();
	
	/**
	 * 작업요청내역 목록
	 */
	uijs.requestWork = (function () {
					
		/**
		 * 작업요청에서 신구/변경 선택했을때 뜨는 팝업
		 */
		function requestTypePopup() {
			
			var popupId = 'work-request-type-'+Date.now();
			
			var iaTreeData = [];
			
			/**
			 * 작업요청하기에서 신규/변경 선택시 뜨는 팝업 만드는 함수 
			 */
			function makePopup(iaTreeData) {
				
				var rootTree = iaTreeData.filter(function (item) {
					return item.parent == '#';
				});
				
				var popupHtml = 
				'<div class="modal_layer_pop work_type" id="'+popupId+'">\n'+
	                '<div class="modal_layer_inner" style="background:#fff">\n'+
	                    '<div class="pop_tit">\n'+
	                        '<a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>\n'+
	                    '</div>\n'+
	                    '<div class="pop_content" style=" height: 750px;">\n'+
	                        '<div class="work_pop_wrap">\n'+
	                            '<div class="work_factor" style="padding-bottom: 0;">\n'+
	                                '<div class="work_tit">\n'+
	                                    '<h1>메뉴선택</h1>\n'+
	                                '</div>\n'+
	                            '</div>\n'+
	                            '<div class="work_check">\n'+
	                                '<div class="grey_list_type white">\n'+
	                                    '<div class="left_con_area">\n'+
	                                        '<ul class="menu_list">\n';
	                                        for(var root of rootTree) {
												var active = '';
												if (root.id == rootTree[0].id) {
													active = 'active';
												}
	                                            popupHtml +='<li>\n'+
	                                                '<a href="#none" class="'+active+'" data-id="'+root.id+'">'+root.text+'</a>\n'+
	                                            '</li>\n';
	                                        }
										popupHtml +='</ul>\n'+
	                                    '</div>\n'+
	                                    '<div class="con_area">\n'+
	                                   
	                                    '</div>\n'+
	                                '</div>\n'+
	                            '</div>\n'+
	                        '</div>\n'+
	                    '</div>\n'+
	                '</div>\n'+
	            '</div>';
	            
	            $('body').append(popupHtml);
	            
	            makeList(iaTreeData, rootTree[0].id);
	            
	            addEvent();
			}; // makePopup
        
	        function makeList(datas, parent) {
	            if (parent != undefined) datas = uijs.iatree.makeTreeData(datas, parent);
	            
	            var i;
	            var dataLen = datas.length;
	            var listWrapper = $('<div class="con_menu_list">');
	            var sortedData = $.extend([], datas);
	            var maxDepth = 0;
	            
	            var selectedIa = [];
	            if ($('#request_ia_form').length) {
					var iaQuery = $('#request_ia_form').serializeArray();
					
					selectedIa = iaQuery.map(function (k) {
						return k.value;
					});
				}
	            
	            if(dataLen > 0) {
	                maxDepth = sortedData.sort( 
	                  function(a, b) {
	                     return parseInt(b['depth']) - parseInt(a['depth']);
	                  }
	                )[0]['depth'];
	            }
	            
	            listWrapper.empty().append('<ul>');
	            
	            for(i = 0; i < dataLen; i++) {
	                var data = datas[i];
	                var depth = data.depth;
	                var childNo = depth-1;
	                
	                var html =
	                '<li id="'+data.id+'">\n'+
	                    '<div class="inner">\n';
	                    	
	                    	// 최하위 depth 인경우 
	                        if (depth == maxDepth) {
	                            html +=
	                            '<span>'+data.text+'</span>\n';
//	                            '<strong>화면ID <em>'+(data.view_name == null ? '' : data.view_name)+'</em></strong>\n';
	                        }
	                        else {
	                            html +=
	                            '<button type="button" class="btn_minus" aria-controls="panel_'+data.id+'">하위메뉴 접기</button>\n'+
	                            '<span>'+data.text+'</span>\n';
	                        }
	                    html += 
		                    '<div class="input_wrap">\n'+
	                            '<div class="input_area cal_check">\n'+
	                                '<div class="check">\n'+
	                                    '<input type="checkbox" data-depth="'+data.depth+
	                                    '" id="menu-check-'+data.id+'"' +
	                                    (selectedIa.indexOf(data.id) != -1 ? "checked": "") +' value="'+data.id+'">\n'+
	                                    '<label for="menu-check-'+data.id+'"></label>\n'+
	                                '</div>\n'+
	                            '</div>\n'+
	                        '</div>\n'+
	                    '</div>\n'+ //class="inner"
	                    '<ul id="panel_'+data.id+'"></ul>\n'+
	                '</li>\n';
	        
	        		html = $(html);
	        		
	        		// 메뉴 열고 닫기
		            html.find('.btn_plus, .btn_minus')
		            .off('click.openclose')
		            .on('click.openclose', function () {
						var $this = $(this);
						var className = $this.attr('class');
						var panel = $this.attr('aria-controls');
						
						if (className == 'btn_plus') {
							$('#'+panel).show();
							$this.removeClass('btn_plus').addClass('btn_minus');
							
							$this.closest('li').find('ul').show();
							$this.closest('li').find('.btn_plus').removeClass().addClass('btn_minus');
						}
						else {
							$('#'+panel).hide();
							$this.removeClass('btn_minus').addClass('btn_plus');
						}
					});
					
	                if (data.parent != '#' && listWrapper.find('#'+data.parent).length) {
	                    listWrapper.find('#'+data.parent).children('ul').append(html);
	                }
	                else {
	                    listWrapper.children('ul').append(html);
	                }
	            }
	            
	            var btnAreaHtml = 
	            '<div class="pop_btn_area">\n'+
                    '<a href="#none" class="btn_mid_type01 select-reset">다시선택하기</a>\n'+
                    '<a href="#none" class="btn_mid_type02 selected-complete">선택완료</a>\n'+
                '</div>\n';
                
                listWrapper.find('.pop_btn_area').remove();
                listWrapper.append(btnAreaHtml);
	            
	            $('#'+popupId).find('.con_area').html(listWrapper);
	            //listWrapper.append($(html));
	        } // makeList
	        
	        
	        // 팝업에서 체크박스 누르거나 버튼 눌렀을때 발생하는 이벤트 생성함수
	        function addEvent() {
				var popup = $('#'+popupId); 
				
				popup.off('change.menu_check').on('change.menu_check', 'input[type=checkbox]', function () {
					var $this = $(this);
					var depth = $this.attr('data-depth');
					
					if ($this.prop('checked')) {
						$this.closest('li').find('input[type=checkbox]').prop('checked', true);
					}
					else {
						$this.closest('li').find('input[type=checkbox]').prop('checked', false);
					}
				});
				
				// 최상위 메뉴 선택시 하위 메뉴리스트 다시 생성
				popup.find('.menu_list a').click(function (e) {
					e.preventDefault();
					var parentId = $(this).attr('data-id');
					
					// 선택된 최상위 메뉴 active 클래스 추가
					$(this)
					.addClass('active')
					.parent()
					.siblings('li')
					.find('a')
					.removeClass('active');
					
					// 하위메뉴 트리 생성
					makeList(iaTreeData, parentId);
				});
				
				// 메뉴(ia) 전체체크 해제(reset)
				popup.off('click.check_reset').on('click.check_reset', '.select-reset', function (e) {
					e.preventDefault();
					
					if(popup.find('input[type=checkbox]:checked').length){
						popup.find('input[type=checkbox]:checked').prop('checked', false);
					}
				});
				
				// 메뉴(ia) 선택완료버튼 클릭했을때 이벤트
				popup.off('click.check_complete').on('click.check_complete', '.selected-complete', function (e) {
					e.preventDefault();
					
					var form = $('<form>', {
						name: 'request_ia_form',
						id: 'request_ia_form'
					});
					
					if ($('#request_ia_form').length) $('#request_ia_form').remove();
					
					if(popup.find('input[type=checkbox]:checked').length){
						var checkedMenuId;
						popup.find('input[type=checkbox]:checked').each(function () {
							checkedMenuId = $(this).val();
							
							var input = $('<input>', {
								name:"request_ia",
								type:'hidden',
								value: checkedMenuId
							});
							
							form.append(input);
						});
						
						// 메뉴 아이디 에 해당하는 데이타 가져오기
						function getItem(id, result = []) {
							var checkedMenu = iaTreeData.filter(function (item) {
								return item.id == id
							});
							
							result.push(checkedMenu);
							
							if (checkedMenu[0].parent !== '#') {
								getItem(checkedMenu[0].parent, result);
							}
							
							return result;							
						}
						
						setTimeout(function () {
							if ($('input[name=request_ia]').length > 0) {
								$('#selected-menu ul').empty();
								
								$('input[name=request_ia]').each(function () {
									var requestedIa = getItem($(this).val());
									
									
									requestedIa.reverse();
									var menuPath = '';
									
									for(var item of requestedIa) {
										
										menuPath += item[0].text + ' > ';
									}
									
									$('#selected-menu ul').append('<li>'+menuPath.substring(0, menuPath.length -2)+'</li>');
								});
							}
						})
						
						
						form.appendTo('body');
					}
					else {
						$('#selected-menu ul').empty();
						// 바닥화면에서 선택 체크 해제하기
						//$('input[name=request_type]:checked').prop('checked', false);
					}
					
					popup.remove();
				});
				
				// 작업요청시 신규또는 변경 선택시 뜨는 팝업 닫기
				popup.find('.btn_pop_close').click(function (e) {
					e.preventDefault();
					
					uijs.msg.confirm(
						'선택하신 메뉴는 "선택해제"됩니다.',
						// 확인 callback 함수 
						function () {
							// 팝업지우기
							popup.remove();
							
							//$('#selected-menu ul').empty();
						}
					)
					// 바닥화면에서 선택 체크 해제하기
					//$('input[name=request_type]:checked').prop('checked', false);
				});
				
			}// addEvent()
	        
	        uijs.ajaxDef({
	            ajaxOption: {
	                url: '/ia/iadata'
	                , data: {site_code: uijs.channel.get(), parent: 0}
	                , method: 'GET'
	            }
	            , callback: function(data) {
	                iaTreeData = uijs.iatree.makeTreeData(data);
	                //console.log(iaTreeData, 'ddd')
	                
	                makePopup(iaTreeData);
	            }
	        });
			
			//popup.deploy();
		}; //requestTypePopup
		
		
		/**
		 * 작업관리의 작업요청내역 목록 생성
		 */
		function requestWorkList(requestOption) {
		} // end requestWorkList
		
		
		// 작업요청내역 다시 로드
		function reloadList() {
		}
		
		// 작업요청내역 상세보기 팝업
		function requestWorkListDetail(request_id) {
		}
		
		return {
			requestTypePopup: requestTypePopup,
			requestWorkList: requestWorkList,
			reloadList: reloadList,
			requestWorkListDetail: requestWorkListDetail
		}
	})(); //end requestWork
	
	
	
	
	/**
	 * 작업진행내역
	 */
	uijs.processWork = (function () {
		
		// processWork 전역함수 VARIABLE
		function processWork() {
			
			
			// 작업중인 목록 html 만들기
			function makeList(part, isSearch) {
			} // end makeList()
			
			// 작업중인 목록 화면에 그리기
			function list(options) {
			} // end list()
			
			// 요청작업 전체 검수요청/검수완료 갯수 설정-화면에 표시
			function setConfirmCount() {
			}; // setConfirmCount()
			
			/**
			 * 진행중/완료 작업내역 상세보기 팝업
			 * request_id: 작업요청 아이디, view_type: 작업완료 목록에서 팝업띄웠을경우 COMPLETE 값 전달됨  
			 */
			function detailPopup(request_id, view_type) {
			} // end detailPopup()
			
			
			
			// 진행중인작업 목록 다시 로드
			function reloadList(part, isSearch) {} // end reloadList()
			
			return {
				"list": list,
				"reloadList": reloadList,
				"detailPopup": detailPopup
			}
			
		} // end processWork()
		
		return processWork();
		
	})(); // end uijs.processWork()
	
	
	/**
	 * 작업관리 - 작업완료 목록
	 */
	uijs.completeWork = (function () {
		
		function completeWork() {
			function list() {}// list
			
			// 작업완료 더보기
			function listMore() {}; // listMore()
			
			
			function reloadList() {}
			
			return {
				"list": list
				, "reloadList": reloadList
			}
		}
		
		return completeWork();
		
	})(); // end uijs.completeWork()
	
	/**
	 * 화면목록 - 메뉴관리
	 */
	 
	uijs.menu = (function () {
		
		function menu () {
			var POPUP_ID = Date.now();
			var MENU_ID;
			
			// 팝업 아이디 생성
			function makePopupId() {
				POPUP_ID = Date.now();
			} // makePopupId
			
			// 메뉴 목록에서 파일 버튼 클릭시 뜨는 팝업 생성
			function makeFileUploadPopup(datas) {
				
				var htmlFile = {}; //html 파일정보
				var pptFile = {}; //ppt(스토리보드) 파일정보
				
				// 조회된 파일정보가 있는경우
				if (datas.length) {
					for(var item of datas) {
						// html 파일정보 담기
						if (item.rel_table == 'IA_HTML') {
							htmlFile = item;
						}
						// ppt 파일정보 담기
						else if (item.rel_table == 'IA_PPT') {
							pptFile = item;
						}
					}
				}
				
				var htm = 
				'<div class="modal_layer_pop" id="popup-files-'+POPUP_ID+'" data-ia-id="">\n'+
			        '<div class="modal_layer_inner" style="height: auto">\n'+ 
			            '<div class="pop_tit">\n'+
			                '<h1>파일 관리</h1>\n'+
			                '<a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>\n'+
			            '</div>\n'+
			            '<div class="pop_content">\n'+
			            	'<form name="iafileForm" id="iafileForm" method="post" enctype="multipart/form-data">'+
							'<div class="grey_list_type">\n'+
								'<ul class="list_type01">\n'+
									'<li class="input_area">\n'+
										'<label for="file_html">HTML</label>\n'+
										'<input type="file" id="file_html" name="html" />\n';
										// html 파일정보가 있는경우 파일표시
										if (Object.keys(htmlFile).length) {
											htm +=
											'<p style="margin-top: 10px">'+
											'<a href="/file/download?file_id='+htmlFile.file_id+'" class="btn_text down">'+htmlFile.original_filename+'</a>'+
											'<button type="button" class="btn_inline_delete" data-id="'+htmlFile.file_id+'"></button>'+
											'<input type="hidden" id="html_file_id" name="file_id" value="'+htmlFile.file_id+'" />'+
											'</p>';
										}
										
									htm +=
									'</li>\n'+
									'<li class="input_area">\n'+
										'<label for="file_ppt">PPT(스토리보드)</label>\n'+
										'<input type="file" id="file_ppt" name="ppt" />\n';
										// 스토리보드 파일정보가 있는경우 파일표시
										if (Object.keys(pptFile).length) {
											htm +=
											'<p style="margin-top: 10px">'+
//											pptFile.original_filename+
											'<a href="/file/download?file_id='+pptFile.file_id+'" class="btn_text down">'+pptFile.original_filename+'</a>'+
											'<button type="button" class="btn_inline_delete" data-id="'+pptFile.file_id+'"></button>'+
											'<input type="hidden" id="ppt_file_id" name="file_id" value="'+pptFile.file_id+'" />'+
											'</p>';
										}
									htm +=										
									'</li>\n'+
								'</ul>\n'+
							'</div>\n'+
			                '<div class="pop_btn_area">\n'+
			                    '<a href="#none"class="btn_large_type02" id="btn_cancel">취소하기</a>\n'+
			                    '<a href="#none" class="btn_large_type01" id="btn_upload">확인하기</a>\n'+
			                '</div>\n'+
			                '</form>'+
			            '</div>\n'+
			        '</div>\n'+
			    '</div>\n';
			    
			    
			    htm = $(htm);
			    
			    // 닫기버튼 클릭 이벤트
			    htm.find('.btn_pop_close').on('click', function () {
					$('#popup-files-'+POPUP_ID).remove();
				}); // 닫기버튼 클릭 이벤트
			    
			     // 팝업 딤드영역 클릭시 팝업 닫기
			    htm.off('click.dim').on('click.dim', function (e) {
			    	// 팝업클릭시 클릭타겟의 클래스명을 배열로 만듬
					var classNames = e.target.className.split(' ');
					
			    	// 클래스명 배열중 modal_layer_pop 이 있는경우 팝업 닫기
					if(classNames.indexOf('modal_layer_pop') != -1) {
						$('#popup-files-'+POPUP_ID).remove();
					}
			    }); // 파일 딤등영역 클릭시 팝업 닫기
			    
			    // 파일삭제
			    // 파일이름 옆에 X(파일삭제) 버튼 클릭 이벤트
			    htm.off('click.file_delete').on('click.file_delete', '.btn_inline_delete', function () {
				
					var fileId = $(this).next('input[name=file_id]').val();
					
					if (confirm('파일을 삭제 하시겠습니까?')) {
						
						uijs.ajaxDef({
							ajaxOption: {
								url: '/ia/delete_iafile'
				                , data: {file_id: fileId}
				                , method: 'POST'
				                , dataType: 'text'
				                , async: false 
							}
						    , callback: function (data) {
								// 잉전 팝업 제거
								$('#popup-files-'+POPUP_ID).remove();
								
								// 팝업 다시 생성
								openFilePopup(MENU_ID);
								
								// 바닥페이지 메뉴트리 reload
						    	$('#con_menu_list').jstree(true).refresh(true);
						    }
						});
					}
				}); // 파일삭제
				
				// 파일업로드
				htm.on('click', '#btn_upload', function (e) {
					e.preventDefault();
							        
			        var form = $(this).closest('form');
			        var formData = new FormData();
			        
			        // html 파일을 새로 업로드하지 안은경우 삭제용 file_id 값 제거
			        if (!htm.find('#file_html')[0].files.length) {
					}
					// html 파일 확장자 체크
					else {
						var htmlFileName = $('#file_html')[0].files[0].name;
						var fileExt = htmlFileName.substring(htmlFileName.lastIndexOf('.')+1);

						if (fileExt.toLowerCase() != 'html') {
							alert('html 파일이 아닙니다.');
							$('#file_html').val('');
							
							return;
						}
						
						if (htm.find('#html_file_id').length) {
							formData.append('file_id', htm.find('#html_file_id').val());
						}
					}
					
			        // ppt 파일을 새로 업로드하지 안은경우 삭제용 file_id 값 제거
			        if (!htm.find('#file_ppt')[0].files.length) {
					}
					// ppt 파일 확장자 체크
					else {
						var pptFileName = $('#file_ppt')[0].files[0].name;
						var fileExt = pptFileName.substring(pptFileName.lastIndexOf('.')+1);

						if (fileExt.toLowerCase() != 'ppt' && fileExt.toLowerCase() != 'pptx') {
							alert('파워포인트 파일이 아닙니다.');
							
							return;
						}
						
						if (htm.find('#ppt_file_id').length) {
							formData.append('file_id', htm.find('#ppt_file_id').val());
						}
					}
					
			        
			        // 첨부파일 추가
			        formData = uijs.addFileData(formData, form);
			        formData.append('id', MENU_ID);
			        formData.append('site_code', uijs.channel.get());
			        
			        uijs.ajaxFormData({
			            url: '/ia/uploadfile',
			            data: formData,
			            method: 'POST',
			            dataType: 'json',
			            anync: true,
			            successCallback: function () {
							// 잉전 팝업 제거
							$('#popup-files-'+POPUP_ID).remove();
							
							// 하위트리 reload
			            	$('#con_menu_list').jstree(true).refresh(true);
			            }
			        });
				}); // 파일업로드
			    
			    return htm;
			} // makeFileUploadPopup
			
			
			// 메뉴관리 메뉴목록에서 파일버튼 클릭시 팝업 띄우기
			function openFilePopup(id) {
				
				MENU_ID = id;
				
				uijs.ajaxDef({
					url: '/ia/files'
					, data: {id: id}
					, callback: function (data) {
						// 팝업아이디 생성
						makePopupId();
						
						// console.log(data);
						
						// 팝업 html 생성
						var popup = makeFileUploadPopup(data);
						
						// 바디에 팝업 삽입
						$('body').append(popup);
					}
				});
				
			} // openFilePopup
			
			return {
				openFilePopup: openFilePopup 
			}
			
		}
		
		return menu();
	})(); // uijs.menu()
	
	/**
	 * 화면목록 
	 */
	uijs.iaViewList = (function () {
        var iaTreeData = [];
        var $HISTORY_POPUP_ID;
        
        function makeList(datas) {
            var i;
            var dataLen = datas.length;
            var listWrapper = $('.view_list');
            var sortedData = $.extend([], datas);
            var maxDepth = 0;
            
            if(dataLen > 0) {
                maxDepth = sortedData.sort( 
                  function(a, b) {
                     return parseInt(b['depth']) - parseInt(a['depth']);
                  }
                )[0]['depth'];
            }
            
            listWrapper.empty().append('<ul>');
            
            for(i = 0; i < dataLen; i++) {
                var data = datas[i];
                var depth = data.depth;
                var childNo = depth-1;
                
                //console.log(data);
                // 작업요청 갯수가 하나이상 있는경우 on 클래스 추가
                var historyOn = parseInt(data.work_request_cnt) > 0 ? 'on' : '';
                
                var html =
                '<li id="'+data.id+'">\n'+
                    '<div class="inner">\n';
                    
//                        if (depth == maxDepth) {
                        if (depth == 1) {
                            html +=
                            '<button type="button" class="btn_plus" aria-controls="panel_'+data.id+'">하위메뉴 접기</button>\n'+
                            '<span>'+data.text+'</span>\n'+
                            '<strong><em>'+(data.view_name == null ? '' : data.view_name)+'</em></strong>\n'+
                            '<em class="btn_history '+historyOn+'"></em>\n';
//                            '<div class="btn_edit_area">\n'+
//                                '<button type="button" \n'+ 
//                                    'class="btn_small01 btn-mobile-view" \n'+
//                                    'style="height: 30px;" \n'+ 
//                                    'data-url="/resources/'+uijs.channel.get()+'/html/'+data.view_name+'">view \n'+
//                                '</button>\n'+
//                            '</div>';
                        }
                        else {
							html +=
							'<button type="button" class="btn_plus" aria-controls="panel_'+data.id+'">하위메뉴 접기</button>\n'+
                            '<span>'+data.text+'</span>\n'+
                            '<strong><em>'+(data.view_name == null ? '' : data.view_name)+'</em></strong>\n'+
                            '<em class="btn_history '+historyOn+'"></em>\n'+
                            '<div class="btn_edit_area">\n'+
                                '<button type="button" \n'+ 
                                    'class="btn_small01 btn-mobile-view" \n'+
                                    'style="height: 30px;" \n'+ 
                                    'data-url="/resources/'+uijs.channel.get()+'/html/'+data.view_name+'">view \n'+
                                '</button>\n'+
                            '</div>';
//                            html +=
//                            '<button type="button" class="btn_plus" aria-controls="panel_'+data.id+'">하위메뉴 접기</button>\n'+
//                            '<span>'+data.text+'</span>\n';
                        }
                    html +=
                    '</div>\n'+
                    '<ul style="display: none" id="panel_'+data.id+'"></ul>\n'+
                '</li>\n';
        
                
                if (data.parent != '#' && listWrapper.find('#'+data.parent).length) {
                    listWrapper.find('#'+data.parent).children('ul').append(html);
                }
                else {
                    listWrapper.children('ul').append(html);
                }
                
            }// end for
           
           
           	// 메뉴 열고 닫기
            listWrapper.find('.btn_plus, .btn_minus')
            .off('click.openclose')
            .on('click.openclose', function () {
				var $this = $(this);
				var className = $this.attr('class');
				var panel = $this.attr('aria-controls');
				
				if (className == 'btn_plus') {
					$('#'+panel).show();
					$this.removeClass('btn_plus').addClass('btn_minus');
					
					$this.closest('li').find('ul').show();
					$this.closest('li').find('.btn_plus').removeClass().addClass('btn_minus');
				}
				else {
					$('#'+panel).hide();
					$this.removeClass('btn_minus').addClass('btn_plus');
				}
			});
			
			// 히스토리 팝업 보기
			listWrapper.find('.btn_history')
			.off('click.history')
			.on('click.history', function () {
				
				var iaNo = $(this).closest('li').attr('id'); 
				
				historyPopup(iaNo);
			});
			
        }// makeList
        
        // 메뉴에 요청된 작업 내역 팝업
		function historyPopup(iaNo) {
			var IA_NO = iaNo;
			
			function makePopup(data) {
				$HISTORY_POPUP_ID = 'menu-request-work-'+Date.now();
				
				var htm = 
				'<div class="modal_layer_pop" id="'+$HISTORY_POPUP_ID+'">\n'+
	                '<div class="modal_layer_inner" style="overflow-y: auto">\n'+
	                    '<div class="pop_tit">\n'+
	                        '<h1>요청작업 내역</h1>\n'+
	                        '<a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>\n'+
	                    '</div>\n'+
	                    
	                    '<div class="pop_content">\n'+
	                    	'<div id="compolte-more-popup-list-area">\n';
	                    	htm += makeListItems(data);
							htm +=
	                        '</div>\n'+
	                    '</div>\n'+
	                '</div>\n'+
	            '</div>';
	            
	            var retHtm = $(htm);
	            
	            // 딤드영역 클릭 이벤트
	            retHtm.on('click', function (e) {
					if($(e.target)[0].classList[0] === 'modal_layer_pop') {
						retHtm.remove();
					}
				});
				
				// 닫기버튼 클릭 이벤트
				retHtm.on('click', '.btn_pop_close', function () {
					retHtm.remove();
				});
	            
	            // 상세보기
	            retHtm.on('click', '.history-detail', function () {
					var $this = $(this);
					var requestId = $this.attr('id');  
					var state = $this.closest('.work_factor').attr('data-state');
					
					if (state == 'PENDING' || state == 'WORKING') {
						if( confirm('작업진행을위해 "작업관리" 화면으로 이동 하시겠습니까?') ){
							location.href = '/work/list.view';	
						}
						else {
							return false;
						}
					}
					else {
						uijs.processWork.detailPopup(requestId, 'COMPLETE');
					}
				});
	            
	            return retHtm;
			}// makePopup()
			
			// 조회된 목록 html 생성
			function makeListItems(data) {
				var items = '';
					 
				for (var item of data) {
					var workLabel = '';
					var stateText = '';
					
					if (item.REQUEST_STATE == 'PENDING') {
						workLabel = 'work_label01';
						stateText = '작업요청'
					}
					else if (item.REQUEST_STATE == 'WORKING') {
						workLabel = 'work_label02';
						stateText = '작업중'
					}
					else if (item.REQUEST_STATE == 'COMPLETE') {
						workLabel = 'work_label04';
						stateText = '작업완료'
					}
					
					items +=
					'<div class="work_factor" style="position: relative;" data-state="'+item.REQUEST_STATE+'">\n'+
                        '<dl>\n'+
                            '<dt>\n'+
                                '<div>ID '+item.REQUEST_ID+'</div>\n'+
                                '<ul class="work_label">\n'+
									'<li><a href="#none" class="'+workLabel+'">'+stateText+'</a></li>\n'+
								'</ul>\n'+
                                '<a href="#" class="history-detail" id="'+item.REQUEST_ID+'">'+item.REQUEST_TITLE+'</a>\n'+
                            '</dt>\n'+
                            '<dd>\n'+
                                '<div class="work_area">\n'+
                                    item.REQUEST_CONTENT+'\n'+
                                '</div>\n'+
                                '<p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; left: 100px; top: 10px;">\n'+
                                (new Date(item.REGDATE)).format('yyyy.MM.dd') +' ~ '+ (new Date(item.END_DATE)).format('yyyy.MM.dd')+'\n'+
                                '</p>\n'+
                            '</dd>\n'+
                        '</dl>\n'+
                    '</div>\n';
				}
				
				return items;
			}// makeListItems()
			
			// 팝업 오픈
			function openPopup() {
				if ($HISTORY_POPUP_ID != undefined) {
					$('#'+$HISTORY_POPUP_ID).remove();
				}
				
				getData({ia_no: IA_NO}, function (data) {
					if (data.length <= 0) return;
					
					var popup = makePopup(data);
				
					$('body').append(popup);
				});
			} // openPopup()
			
			
			// 데이터 조회
			function getData(data, callbackFn) {
				
				var dataDef = {
					ia_no: null
				};
				
				dataDef = $.extend(dataDef, data);
				
				uijs.ajaxDef({
					url: '/ia/request_work_list'
					, data: dataDef
					, method: 'GET'
					, callback: callbackFn
				});
			} // getData()
			
			openPopup();
            
		}; // historyPopup()
        
        return {
			init: function () {
				uijs.ajaxDef({
		            ajaxOption: {
		                url: '/ia/menulist'
		                , data: {site_code: uijs.channel.get(), parent: 0}
		                , method: 'GET'
		            }
		            , callback: function(data) {
		                iaTreeData = uijs.iatree.makeTreeData(data);
		                
		                makeList(iaTreeData);
		            }
		        });
			},
            search: function (text) {
                var searchData;
                
                searchData = iaTreeData.filter(function (item) {
                    //return item.depth == 4 && item.text.indexOf(text) != -1;
                    return item.text.indexOf(text) != -1;
                });
                
                if (text == undefined) {
                    searchData = iaTreeData;
                }
                else {
                    if (text.replace(/\s/g, '') == '') searchData = iaTreeData;
                }
                
                makeList(searchData);
            }
        }
    })(); // end iaViewList 
    
    
    /**
     * 로그인되있는경우 로그인 정보 가져오기
     */
    uijs.logininfo = (function () {
		var loginInfo = null;
		
		// 로그인 세션 정보 
		function init() {
			
			uijs.ajaxDef({
				url: '/login/info.data'
				, method: 'GET'
				, callback: function (data) {
					//alert(data.userid)
					if (data.userid == null) {
						if (location.pathname !== '/login') {
							location.href = '/login';		
						}	
					}
					
					loginInfo = data;
				}
			});
		}
		
		// 로그아웃 실행
		function logout() {
			uijs.ajaxDef({
				url: '/logout'
				, dataType: 'text'
				, callback: function () {
					location.href = '/login';
				}
			})
		}
		
		return {
			init: init,
			/**
			 * item userid [사용자아이디]
			 * item username [사용자이름]
			 * item team [부서]
			 * item part [작업자인경우 담당업무 PLAN:기획자, DESIGN: 디자이너, PUBLISH: 퍼블리셔];
			 * item tel;
			 * item email;
			 * item auth [권한 MANAGER:관리자, WORKER: 작업자, USER: 일반사용자 - VIEW 만가능];
			 */
			get: function (item) {
//				console.log(loginInfo)
				if (loginInfo == null) {
					uijs.msg.alert('로그인 후 이용 가능합니다.');
				}
	
				return loginInfo[item];
			},
			logout: logout
		}
	})();
    
    /**
     * 권한관리- 사용자 목록
     */
    uijs.user = (function () {
	
		var userDatas = []; // 사용자 목록 데이터
		var start = 1;
		var limit = 10;
		var nowPage = 1;
		
		function getUserList(page=1) {
			nowPage = page;
			start = (page-1) * limit + 1;
			
			uijs.ajaxDef({
				ajaxOption: {
					url: '/user/list.data'
					, method: 'GET'
					, data: {'start': start, 'limit': limit}
					, dataType: 'json'
					, async: false
				},
				callback: function(data) {
					userDatas = data.list;
					
					
					var totalLen = data.count;
					var totalPage = Math.floor((totalLen-1) / limit) + 1;
					
					
					makeList(userDatas);
					makePaging(totalPage, page);
					addEvent(page);
				}
			});
			
		};
		
		function makePaging(totalPage, page) {
			var paging = '<ul>';
			
			//'<li><a href="#none" class="prev-first"></a></li>'
            paging += '<li><a href="#none" class="prev"></a></li>\n';
            
			for(var i=1; i <= totalPage; i++) {
				paging += '<li><a href="#none" data-page="'+i+'" '+(i==page?'class="active"':'')+'>'+i+'</a></li>\n';
			}
			paging += '<li><a href="#none" class="next"></a></li>\n';
            //'<li><a href="#none" class="next-last"></a></li>'  
             
            paging += '</ul>';
            
            $('.paging-area').html(paging);
		}
		
		/**
		 * 사용자 목록 html 생성
		 */
		function makeList(datas) {
			var html;
			var authkr = {
				MANAGER: '담당자',
				WORKER: '작업자',
				USER: '일반사용자',
				ADMIN: '관리자'
			}
			
			for(var user of datas) {
				//console.log(user)
				var tels = [];
				if (user.tel != null) {
					tels = user.tel.split('-');
				}
				html+=
				'<tr class="user-list" data-userid="'+user.userid+'">\n'+
		            /*
		            '<td>\n'+
		                '<div class="input_wrap" style="padding: 0 0; max-width: none;">\n'+
		                    '<div class="input_area cal_check">\n'+
		                        '<div class="check" style="bottom: 0; top: -3px;">\n'+
		                            '<input type="checkbox" id="cont_01">\n'+
		                            '<label for="cont_01"></label>\n'+
		                        '</div>\n'+
		                    '</div>\n'+
		                '</div>\n'+
		            '</td>\n'+
		            */
		            '<td>'+user.username+'</td>\n'+
		            '<td>'+(user.team==null?'':user.team)+'</td>\n'+
		            '<td>'+(user.part==null?'':user.part)+'</td>\n'+
		            '<td>\n';
		            if (tels.length) {
			            html+= tels[0]+'-'+tels[1]+'-'+tels[2];
					}
				html +='</td>\n'+
		       		'<td>'+(user.email==null?'':user.email)+'</td>\n'+
		            '<td>\n'+
		                '<ul>\n'+
		                    '<li style="text-align: center;">'+authkr[user.auth]+'</li>\n'+
		                    '<!-- <li style="text-align: center;">파일관리</li> -->\n'+
		                '</ul>\n'+
		            '</td>\n'+
		        '</tr>\n';
			}
			
			$('#user-list-wrap').html(html);
			// user data select from db
		};
		
		function addEvent(page) {
			// 사용자 목록 클릭
			$('#user-list-wrap').off('click.user_list').on('click.user_list', 'tr.user-list', function () {
				var id = $(this).attr('data-userid');
				
				if (uijs.logininfo.get('userid') !=  id && uijs.logininfo.get('auth') != 'ADMIN') {
					alert('수정 권한이 없습니다.');
					return;
				}
				
				var form = $('<form>', {
					method: 'post',
					action: '/user/edit.view'
				});
				
				form.append('<input type="hidden" name="userid" value="'+id+'"/>');
				form.append('<input type="hidden" name="page" value="'+page+'"/>');
				
				form.appendTo('body');
				
				form.submit();
			});
			
			// 페이지 이동
			$('.paging-area').off('click.movepage').on('click.movepage', 'a', function() {
				var page = $(this).attr('data-page');
				
				uijs.user.list(page);
			});
			
			$('#user-list-wrap').find('tr.user-list').css({'cursor': 'pointer'});
		}
		
		return {
			list: function (page=1) {
				var queryString = location.search.replace('?', '');
				//var page = 1;
				
				if(queryString.length) {
					queryString = queryString.split('&');
				};
				
				var query = {};
				for(var item of queryString) {
					var itemArr = item.split('=');
					if (item.length) {
						query[itemArr[0]] = itemArr[1];
					}
				}
			
				if (query.length) {
					page = query['page'];	
				}
		
				getUserList(page);
				//this.page = pg;
			}
		}
	})(); // uijs.user
	
	/**
	 * 채널관리
	 */ 
	uijs.channel= (function () {
        var channel = localStorage.getItem('channel') == null ? 'PB_M' : localStorage.getItem('channel');
        var channels;
        
        // 채널 목록 데이터 
        function getChannels() {
//			channels;
			
			if (localStorage.getItem('channels') == null) {
				uijs.ajaxDef({
					ajaxOption: {
						url: '/chan/channels.data'
					},
					callback: function(data) {
						//channels = data;
						localStorage.setItem('channels', JSON.stringify(data));	
					}
				});
			}
			else {
				channels = JSON.parse(localStorage.getItem('channels'));
			}
			
			return channels;
		}
		
		function getChannelOne() {
			return channels.filter(function (arrItem) {
				return arrItem.code === uijs.channel.get();  
			});
		}
		
		// 채널목록선택 selectbox 만들기
		function makeChanelSelectBox() {
			var channels = getChannels();
			var tmp = channels;
			
			if (channels == null) return;
			
			var selectedChannel = tmp.filter(function (item) {
				return item.code == uijs.channel.get();
			});
			
			if (!selectedChannel.length) {
				selectedChannel = channels[0];	
			}
			else {
				selectedChannel = selectedChannel[0];
			}
			
			var html = 
				'<div class="active"> \n'+
					selectedChannel.name+' <span class="bul_type01">'+selectedChannel.cuser+'</span>\n'+
				'</div>\n'+
				'<ul style="z-index: 10000; display: none" class="option-list">\n';
			for(var channel of channels) {
				html +='<li><a href="#none" data-code="'+channel.code+'">'+
							channel.name+' <span class="bul_type03">'+channel.cuser+'</span>'+
							'</a>'+
						'</li>\n';
			}
					
			html +=	'<li><a href="/chan/list.view" data-code="none">채널관리</a></li>\n'+
				'</ul>\n';
				
			$('.channel-list').html(html);
		}
        
        return {
            get: function () {
                return channel;
            },
            
            getOne: getChannelOne, 
            
            set: function (cha) {
				channel = cha;
				
				sessionStorage.setItem('channel', cha);
				/*
				$('.channel-list').find('.option-list').each(function () {
					var $this = $(this);
					
					if (channel == $this.attr('data-code')) {
						$('.channel-list')
						.find('.active')
						.html(activeHtml)
						.find('span')
						.removeClass('bul_type03').addClass('bul_type01');
						
						$('.channel-list').hide();
					}
					
				});
				*/
            },
			init: function () {
				makeChanelSelectBox();
				
				// 채널선택 목록 열기/닫기
				$('.channel-list')
				.off('click.channelShow')
				.on('click.channelShow', '.active', function () {
					var $this = $(this);
					
					if (!$this.parent().hasClass('on')) {
						$this.parent().addClass('on');
						$this.next('ul').show();
					}
					else {
						$this.parent().removeClass('on');
						$this.next('ul').hide();
					}
				});
				
				// 채널선택 이벤트
				$('.channel-list')
				.off('click.channelSelect')
				.on('click.channelSelect', 'a', function () {
					var activeHtml = $(this).html();
					var code = $(this).attr('data-code');
					//$(activeHtml).find('span')
					
					if (code != 'none') {
						uijs.channel.set(code);
						
						$('.channel-list')
						.find('.active')
						.html(activeHtml)
						.find('span')
						.removeClass('bul_type03').addClass('bul_type01');
						
						$('.channel-list').removeClass('on').children('ul').hide();
						
						location.reload();
					}
				});
			}
        }
    })();
    	
    /**
     * ajax전송
     */
	uijs.ajaxDef = function (options) {
		
		var option = {
			url: null,
			data: null,
			method: 'POST',
			dataType: 'json',
			async: false,
			callback: null
		};
		
		var callbackFn = null;
		
		if (options.hasOwnProperty('ajaxOption')) {
			option = $.extend(option, options.ajaxOption);
			callbackFn = options.callback;
		}
		else {
			option = $.extend(option, options);
			callbackFn = option.callback;
		}
		
		delete option.callback;
		
		loading('start');
		
		$.ajax(
			option
		)
		.done(function (data) {
			if (callbackFn != undefined && typeof callbackFn == 'function') {
				callbackFn.call(this, data);
			}
		})
		.error(function (error) {
			console.log(error, 'error');
            loading('stop');
        })
		.always(function () {
			loading('stop');
		})
		
	};
	
	
	/**
	 * json 타입의 데이터 ajax send 용 함수
	 */
	uijs.ajaxJson = function (url, data, method, callback) {

	    var jsons = data;
	
		loading('start');
	    $.ajax({
	        url: url,
	        method: method,
	        data: JSON.stringify(jsons),
	        dataType: 'json',
	        contentType: "application/json; UTF-8;"
	    })
	    .done(function (data) {
            if(typeof callback === 'function') {
	           callback.call(this);
            }
		})
		.always(function () {
			loading('stop');
		});
	}
	
	/**
	 * ajax 사용하여 파일 업로드시 FormData 에 첨부파일 데이터 추가  
	 */
	uijs.addFileData = function(formData, area) {
		
		var filesTempArr = [];
		
		if (area == undefined) area = '';
		
		$('input[type=file]', area).each(function () {
			var filesArr = Array.prototype.slice.call(this.files);
			
			for(var i = 0; i < filesArr.length; i++) {
				filesTempArr.push(filesArr[i]);
			}
		});
		
	
		if (filesTempArr.length > 0) {
			for(var i = 0; i < filesTempArr.length; i++) {
				formData.append("files", filesTempArr[i]);
			}		
		}
		
		return formData;
	};
	
	/**
	 * 첨부파일과 같이 ajax send 를 위한 함수
	 * FormData ajax submit 
	 */
	uijs.ajaxFormData = function(opt) {
		var defOpt = {
			url: null,
			data: null,
			method: 'POST',
			dataType: 'json',
			async: true,
			successCallback: null,
			errorCallback: null
		}
		
		defOpt = Object.assign({}, defOpt, opt);
		
		
		loading('start');
		
		$.ajax({
			url: defOpt.url,
			data: defOpt.data,
			method: defOpt.method,
			dataType: defOpt.dataType,
			async: defOpt.async,
			//contentType: "application/json; UTF-8;"
			processData: false,
			contentType: false
		})
		.done(function (data) {
			if (defOpt.successCallback != null) defOpt.successCallback.call(this, data);
		})
		.error(function () {
			if (defOpt.errorCallback != null) defOpt.errorCallback.call(this);
		})
		.always(function () {
			loading('stop');
		});
	}
	
	uijs.loading = function() {
		return {
			start: function () {
				loading('start');
			},
			stop: function() {
				loading('stop');
			}
		}
	}
	
	/**
	 * 알림메세지 보내기
	 */
	uijs.sendMsg = function (param) {
		
		var sendParam = {
			receiver_auth: ''
			, receiver_part: ''
			, content: '디자인 검수요청이 있습니다.'
			, sender_id: uijs.logininfo.get('userid')
		};
		
		if (param != undefined) {
			sendParam = $.extend(sendParam, param);
		}
		
		uijs.ajaxDef({
			url: '/msg/send'
			, data: sendParam
			, dataType: 'text'
			, callback: function (data) {
				//socket.send(sendParam.sender_id+','+sendParam.receiver_auth+','+sendParam.receiver_part+','+sendParam.content);
			}
		})
		
	};
	
	/**
	 * 알림메세지 전체보기
	 */
	uijs.viewMsg = function () {
		var $start = 1;
		var $limit = 10;
		var $page = 1;
		
		function makeList(data) {
			var msgList = '';
			for(var item of data) {
				msgList += ` 
				<li class="list">
					<div class="work_text" style="padding-left: 0 ${item.READ_YN == '1' ? 'text-decoration: line-throug' : ''}">
						<em>${new Date(item.WRITE_DATE).toLocaleString()}</em>
						<div>${item.CONTENT}</div>
					</div>
        		</li>`;
			}
			var htm = `
			<div class="modal_layer_pop" id="">
	            <div class="modal_layer_inner" style="overflow-y: auto; width: 480px">
	                <div class="pop_tit">
	                    <h1>요청작업 내역</h1>
	                    <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
	                </div>
	                <div class="pop_content" style="margin-top: 0;">
	                	<div class="work_message">
		                	<ul class="msg_list">
		                	${msgList}
		                	</ul>
		                </div>
		                <div class="btn_more_area">
							<a href="#none" class="btn-more-view">더보기</a>
						</div>
	                </div>
	            </div>
	        </div>`;
	        
	        htm = $(htm);
	        
	        htm.find('.btn_pop_close').click(function () {
				htm.remove();
			});
			
			// 딤드영역 클릭시 팝업 제거
			htm.on('click', function (e) {
				if ($(e.target)[0].classList[0] == 'modal_layer_pop') {
					htm.remove();
				}
			});
			
			htm.find('.btn-more-view').on('click', function () {
				
				getData(function (data) {
					var htm = '';
					
					for(var item of data) {
						htm += `
						<li class="list">
							<div class="work_text" style="padding-left: 0 ${item.READ_YN == '1' ? 'text-decoration: line-throug' : ''}">
								<em>${new Date(item.WRITE_DATE).toLocaleString()}</em>
								<div>${item.CONTENT}</div>
							</div>
                		</li>`;
					}
					
					htm.find('.msg_list').append(htm);
				});
			});
	        
	        htm.appendTo('body');
		}
		
		function getData(callback) {
			$start = ($page-1) * $limit + 1;
			
			uijs.ajaxDef({
				url: '/msg/get_all'
				, data: {receiver_id: uijs.logininfo.get('userid'), start: $start, limit: $limit}
				, callback: function (data) {
					if (data.length > 0) {
						callback(data);
						$page += 1;
					}
				}
			});
		}
        
        getData(makeList);
        
	};
	
	// 전체 메세지 갯수 설정
	uijs.setMsgCnt = function () {
		uijs.ajaxDef({
			url: '/msg/get'
			, data: {'receiver_id': uijs.logininfo.get('userid')}
			, callback: function (data) {
				
				if (parseInt(data.MSG_CNT) > 0) {
					$('.bell').show().find('.alam_msg').attr('data-cnt', parseInt(data.MSG_CNT)).html('알림 '+data.MSG_CNT)
					.on('click', function () {
						uijs.viewMsg();
					});
				}
			}
		});
	}
	
	return uijs;
	
})(jQuery);

//var socket = null;
//var sock = new SockJS('/echo');
//socket = sock;

$(document).ready(function () {
	/**
	 * 채널 목록 및 이벤트 설정
	 */
	// uijs.channel.init();
	
	/**
	 * 로그인했는지 확인해서 로그인 정보 저장
	 */
	uijs.logininfo.init();
	
	/**
	 * 상단 로그아웃 버튼 클릭이벤트
	 */
	$('.nav-log-out').on('click', function (e) {
		e.preventDefault();
		
		uijs.logininfo.logout();
	});
	
	/**
	 * 페이지에 채널 타이틀 설정
	 */
	 /*
	if($('.tit-channel-type').length) {
		var channelInfo = uijs.channel.getOne();
		
		var channelName = channelInfo[0].name;
		var channelUser = channelInfo[0].cuser;
		
		var channelUserClass = {
			'개인': 'bul_type01'
			, '기업' : 'bul_type03'
		};
		
		$('.tit-channel-type').text(channelName);
		$('.tit-channel-type')
		.next('span')
		.text(channelUser)
		.attr('class', channelUserClass[channelUser]);
	}
	*/
	
	
	/**
	 * datepicker 한글 옵션설정
	 */
	$.datepicker.setDefaults({
	    dateFormat: 'yy-mm-dd',
	    prevText: '이전 달',
	    nextText: '다음 달',
	    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
	    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
	    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	    showMonthAfterYear: true,
	    yearSuffix: '년'
	});
	

	/**
	 * 로그인 상태인 경우 알림 메세지 연결
	 */
	if (uijs.logininfo.get('username') != null) {
		//sock.onmessage = onMessage;
		// 메세지 전송 예시
		//socket.send("관리자,정기수,하이요,http://localhost")
		/*
		 sock.onopen = function() {
			uijs.setMsgCnt();
		 };
		*/
	}
});

// toast생성 및 추가
function onMessage(evt){
    var data = evt.data;
    
    console.log(data)
    
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
};

jQuery.fn.serializeObject = function() {
	
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function() {
                    obj[this.name] = this.value;
                });
            }//if ( arr ) {
        }
    } catch (e) {
        alert(e.message);
    } finally {
    }
 
    return obj;
};

function rmSpace(value) {
	if (value == undefined) return '';
	
	return value.replace(/\s/g, '');
}

function validEmail(email) 
{
	var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

/**
 * 알짜 비교 함수
 */
function dateDiff(_date1, _date2) {
    var diffDate_1 = _date1 instanceof Date ? _date1 :new Date(_date1);
    var diffDate_2 = _date2 instanceof Date ? _date2 :new Date(_date2);
 
    diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
    diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
 
 	console.log(Math.abs(diffDate_2.getTime() - diffDate_1.getTime()));
 
    var diff = diffDate_2.getTime() - diffDate_1.getTime();
    diff = Math.ceil(diff / (1000 * 3600 * 24));
 
    return diff;
}
