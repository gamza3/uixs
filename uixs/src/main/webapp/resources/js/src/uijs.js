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
		var returnData;
		// loading 시작
		loading('start');
		$.ajax({
			url: "/work/request_list/detail?ref_table="+ref_table+"&ref_id="+ref_id,
			method: 'GET',
			dataType: 'json',
			async: false
		})
		.done(function (data) {
			returnData = data;
		})			
		.always(function () {
			// loading 종료
			loading('stop');
		});
		
		return returnData;
	}
	
	/**
	 * 작업요청 내역 상세 
	 */
	function getWorkListOne(ref_table, ref_id) {
		var returnData;
		// loading 시작
		loading('start');
		$.ajax({
			url: "/work/work_list/detail?ref_table="+ref_table+"&ref_id="+ref_id,
			method: 'GET',
			dataType: 'json',
			async: false
		})
		.done(function (data) {
			returnData = data;
		})			
		.always(function () {
			// loading 종료
			loading('stop');
		});
		
		return returnData;
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
			var popup = {};
			
			popup.frame =  $(`
				<div class="modal_layer_pop work_type" id="vue-popup" @click="closeWithDim" v-if="active">
					<div class="modal_layer_inner" style="background:#fff">
						<div class="pop_tit"></div>
						<div class="pop_content" style="height: 750px;"></div>
					</div>
				</div>`
			);
			
			// 작업요청내역 상세보기 팝업 닫기버튼
			popup.head = function () {
				var btn= $('<a href="#none" class="btn_pop_close" title="레이어팝업 닫기" @click="popupClose"></a>');
			
				return btn;
			};

			// 작업요청내역 상세보기 팝업 
			popup.body = function () {
				var html = `
					<ul class="work_temp">
						<li class="cont">
							<div class="work_factor">
								<dl><dt>
									<div>{{requestIa}}</div>
										<a href="#none">{{compuUsernameContent}}</a>
								<dd></dt>
								<dd>
                    				<div class="work_area" v-html="compuContent"></div>
                    				<div class="work_section">
                    					<div class="sec_01">
                    						<p>화면경로</p>
                    						<div v-html="requestIas"></div>
                    					</div>         
                    					<div class="sec_02">
                    						<p>작업일정</p>    
                    						<div class="work_day" v-if="!dateEditMode" @click="dateEdit">
                                                <span>~{{endDate}} 까지</span>
                                           </div>
                    						<div class="work_day" style="display:flex;align-content:center;padding:4px" v-else>
                                           	<input v-model="endDate" ref="dateInput"/>
                    						<button type="button" class="btn_small01  mr4" @click="editDate">수정</button>
                    						<button type="button" class="btn_small01  mr4" @click="dateEditMode=false">취소</button>
                                           </div>
                                        </div>
                                    </div>
                    				<div class="react-work-section"></div>
                                    <div class="work_file">
                                        <p>첨부파일</p>
                                        <ul class="mt20">
					                       <li v-for="file in files" :key="file.id">
			                                  <strong>{{file.original_filename}}</strong>
			                                  <a :href="'/file/download?file_id='+file.file_id" class="btn_text down">다운로드</a>
			                               </li>
                                		</ul>
                                    </div>
                                    <div class="mt20" style="margin:20px 20px 0 20px">
                                        <ul class="box_type_check">
                                            <li>
                                                <input type="radio" v-model="requestState" name="request_state" id="team01" value="WORKING">
                                                <label for="team01">수용</label>
                                            </li>
                                            <li>
                                                <input type="radio" v-model="requestState" name="request_state" id="team02" value="CANCEL">
                                                <label for="team02">미수용</label>
                                            </li>
                                        </ul>
                                        <div class="input_section">
                                            <ul class="input_wrap" style="max-width:100%">
                                                <li class="input_area">
                                                    <textarea v-model="cancelContent"
                    								type="text"
                    								 name="cancel_content"
                    								 placeholder="미수용 사유 입력"></textarea>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="pop_btn_area">
                                            <a href="#none" class="btn_large_type02 btn-cancel" @click="popupClose">닫기</a>
                                            <a href="#none" class="btn_large_type01 btn-confirm" @click="confirmRequest">확인하기</a>
                                        </div>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </li></ul>`;
                    
                    html = $(html);
                    
//                  ReactDOM.render(
//						<Schedule reqData={reqData} />, 
//						html.find('.react-work-section')[0]
//					);
                    
                    return html;
			};// popup.body = function () 
				
			popup.frame.find('.pop_tit').append(popup.head);
			popup.frame.find('.pop_content').append(popup.body);
			
			$('body').append(popup.frame);
			
			new Vue({
				el: '#vue-popup',
				data: {
					requestIa: request_id,
					dateEditMode: false,
					workRequestData: {},
					requestIaList: null,
					requestIaPath: [],
					files: [],
					endDate: '',
					requestState: 'WORKING',
					cancelContent: '',
					active: false,
				},
				created: function () {
					vapp.loading('start');
				},
				computed: {
					compuUsernameContent: function () {
						return (
							this.workRequestData.username ? 
							'['+this.workRequestData.username+']' + this.workRequestData.request_title : 
							this.workRequestData.request_title
						);
					},
					compuContent: function () {
						return this.workRequestData.request_content ? this.workRequestData.request_content.replace(/\r\n/g, '<br>') : '';
					},
					requestIas: function () {
						var path = '';
						
						if (this.requestIaPath.length) {
							for(var item of this.requestIaPath) {
								path += '<ul class="polder"><li>'+item+'</li></ul>\n';	
							}
						}
						else {
							path = '<ul class="polder"><li>없음</li></ul>';	
						}
						
						return path;
					}
				},
				mounted: function () {
					var app = this;
					
					this.getData().then(function (data) {
						app.workRequestData = data.REQUEST_WORK;
						app.files = data.FILES;
						
						if (data.REQUEST_IA_LIST) {
							app.requestIaPath = getMenuPathString(data.REQUEST_IA_LIST);
						}
						
						app.endDate = new Date(app.workRequestData.end_date).format('yyyy-MM-dd');
						//app.requestState = app.workRequestData.request_state;
						
						vapp.loading('stop');
						
						app.active = true;
					});
				},
				methods: {
					dateEdit: function () {
						var app = this;
						
						this.dateEditMode = true;
						
						// 인풋에 데이트피커 설정
						setTimeout(function () {
							$(app.$refs.dateInput).datepicker({
								beforeShow: function(input, inst) { 
									setTimeout(function () {
								        inst.dpDiv.css({"z-index":1000});
									});
							    },
							    // date picker 날짜 변경시 ia data 변경
							    onSelect: function(dateText, inst) {
							    	app.endDate = dateText;
							    }
							});
						})
					},
					// 상세데이터 조회
					getData: async function () {
						var url = '/work/request_list/detail?ref_table=REQUEST_LIST&ref_id='+request_id;
						
						const response = await fetch(url);
						
						return response.json();
					},
					// 종료일자 수정
					editDate: function () {
						var app = this;
						var sendData = new FormData();
						
						sendData.append('request_id', this.workRequestData.request_id);
						sendData.append('request_state', this.workRequestData.request_state);
						sendData.append('end_date', new Date(this.endDate));
						
						uijs.ajaxFormData({
							url: '/work/request_list/detail/change_state',
							data: sendData,
							successCallback: function (data) {
								app.dateEditMode = false;
							},
							errorCallback: function (error) {
								console.log(error);
								app.dateEditMode = false;
							}
						});
					},
					// 데이트 피커 제거
					datepickerDel: function () {
						$(this.$refs.dateInput).datepicker("destroy");
						$('.ui-datepicker').remove();
					},
					popupClose: function () {
						this.datepickerDel();
						this.$el.remove();
					},
					// 딤드영역 클릭하여 닫기
					closeWithDim: function (e) {
						if (e.target.classList[0] == 'modal_layer_pop') {
							this.popupClose();
						}
					},
					confirmRequest: function (e) {
						e.preventDefault();
						var app = this;
						
						if (uijs.logininfo.get('auth') !== 'WORKER' && uijs.logininfo.get('auth') != 'ADMIN' ) {
							uijs.msg.alert('작업자 또는 관리자 권한이 아닙니다.');
							return false;
						}
						
						var request_state = this.requestState;
						var cancel_content = this.cancelContent;
						
						var sendData = {
							"request_id": request_id,
							"request_state": request_state,
							"cancel_content": cancel_content,
							"part": 'PLAN',
							"state": 'WORKING'
						};
						
						if (request_state == 'CANCEL') {
							if(cancel_content.replace(/\s/g, '') == '') {
								alert('미수용 사유를 입력해 주세요');
								return;
							}
						}
						
						// 작업요청내역 상세보기 팝업 에서 수용/미수용 내용 저장하기		
						uijs.ajaxDef({
							url: '/work/request_list/detail/change_state',
							data: sendData,
							callback: function () {
								vapp.loadList(['request', 'process']);
								
								app.popupClose();
								
							}
						});
					}
				}
			})
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
			
			var appendPosition = null;
			var listData = [];
			
			// 작업중인 목록 html 만들기
			function makeList(part, isSearch) {
			} // end makeList()
			
			// 작업중인 목록 화면에 그리기
			function list(options) {
			} // end list()
			
			// 요청작업 전체 검수요청/검수완료 갯수 설정-화면에 표시
			function setConfirmCount() {
				vapp.setConfirmCount();
			}; // setConfirmCount()
			
			/**
			 * 진행중/완료 작업내역 상세보기 팝업
			 * request_id: 작업요청 아이디, view_type: 작업완료 목록에서 팝업띄웠을경우 COMPLETE 값 전달됨  
			 */
			function detailPopup(request_id, view_type) {
				
				// 팝업 프레임
				var $POPUP = popupFrame('work'); // 팝업요소
				
				$POPUP =  $(`
					<div class="modal_layer_pop work_type" id="vue-popup">
						<div class="modal_layer_inner" style="background:#fff">
							<div class="pop_tit"></div>
							<div class="pop_content" style="height: 750px;"></div>
						</div>
					</div>`
				);
				
				// 팝업 닫기 버튼
				var popupCloseBtn = $('<a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>');
				
				// 팝업닫기 버튼 이벤트 추가
				popupCloseBtn.on('click', function () {
					$POPUP.remove();
				})
				.appendTo($POPUP.find('.pop_tit'));
				
				// 팝업 dim 영역클릭
				$POPUP.off('click.dim').on('click.dim', function (e) {
					if ($(e.target)[0].classList[0] == 'modal_layer_pop') {
						$POPUP.remove();
						e.preventDefault();
					}
				});
				
				var datas = getWorkListOne('WORK_LIST', request_id);
				
				var files = datas.FILES;
				var workData = datas.REQUEST_WORK;
				var requestPath = [];
				if (datas.REQUEST_IA_LIST) {
					requestPath = getMenuPathString(datas.REQUEST_IA_LIST);
				}
				var attatch = '';
				if (files !== null && files !== undefined && files.length > 0) {
					attatch = `
						<div class="work_file">
							<p>첨부파일</p>
								<ul class="mt20">
					`;
					for(var file of files) {
						attatch += `
	                        <li>
                               <strong>${file.original_filename}</strong>
                               <a href="/file/download?file_id=${file.file_id}" class="btn_text down">다운로드</a>
                            </li>`;
					}
					attatch += 
						`</ul>
					</div>`;
				}
				// 작업완료 요청일 (희망완료일)
				var endDate = new Date(workData.end_date);
				var endDay = endDate.format('yyyy-MM-dd');
				
				// 작업요청시 선택한 메뉴리스트 
				var requestIas = ''; 
				
				if (requestPath.length) {
					for(var item of requestPath) {
//						2021-09-08 사용안함
						requestIas += '<li>'+item+'</li>\n';	
					}
				}
				else {
					requestIas = '<li>없음</li>\n';	
				}
				
				var username = workData.username ? '['+workData.username+']' : '';
				// 팝업 내용
				var content = `
	                <ul class="work_temp">
	                    <li class="cont">
	                        <div class="work_factor">
	                            <dl>
	                                <dt>
	                                    <div>ID ${request_id}</div>
	                                    <a href="#none">${username} ${workData.request_title}</a>
	                                </dt>
	                                <dd>
	                                    <div class="work_area">
	                                        ${workData.request_content.replace(/\r\n/g, '<br/>')}
	                                    </div>
	                                    <div class="work_section">
	                                        <div class="work_menu_list">
	                                            <p>화면목록</p>
	                                            <ul>
	                								${requestIas}  
	                                            </ul>
	                                        </div>
	                                        <div class="sec_02">
	                                            <p>작업일정</p>
	                                            <div class="work_day">
	                                                <span>~ ${endDay} 까지</span>
	                                            </div>
	                                        </div>
	                                    </div> ${attatch} 
	                                </dd>
	                            </dl>
	                		</div>
	                          <div class="work_step_area">
	                			<div class="work_part">
	                				<div class="btn_area">
                                        <a href="#none" class="btn_small01 btn-all-confirm-cancel" 
                                        ${
										view_type != undefined && view_type == 'COMPLETE' ? 
										'style="display:none"' : 
										''
										}
                                        >전체검수취소</a>
                                    </div>
						           <ul>
							           <li class="end fix">
								           <span>업무요건</span>
								           <div class="mt10">
								           <button type="button" class="btn_small01 active on">수용완료</button>
								           </div>
								           <em style="display: block">(${new Date(workData.response_date).format('yyyy.MM.dd')})</em>
							           </li>
							           <li class="fix">
								           <span>작업완료</span>
								           <div class="mt10">
								           <button type="button" class="btn_small01 active btn-complete-confirm" style="display:none">완료확인</button>
								           </div>
							           </li>
						           </ul>
						           </div></div>
								<div class="active_txt">
						           <div class="work_message">
						           		<p>작업내역</p>
						           </div>
						        </div>
	                    </li>
	                </ul>`;
            	
            	// 팝업내용 jquery dom 형식으로 변경
            	var jqContent = $(content);	
            	
            	// 작업현황 추가
            	jqContent.find('.work_part').find('ul > li:first').after(workStatus);
            	
				
				// 작업검수 전체취소            	
            	jqContent.find('.btn-all-confirm-cancel').on('click', function (e) {
					e.preventDefault();
					
					if (uijs.logininfo.get('auth') != 'MANAGER' && uijs.logininfo.get('auth') != 'ADMIN') {
						alert('검수취소 권한이 없습니다.');
						return false;
					}
	
					var sendData = {
						"work_id": workData.work_id
						, "request_id": workData.request_id
						, "part": 'PLAN'
						, "plan": 'WORKING'
						, "design": 'PENDING'
						, "publish": 'PENDING'
					};
					
					uijs.ajaxDef({
						ajaxOption: {
							url: '/work/work_list/detail/update_state',
							data: sendData
						},
						
						callback: function(data) {
							jqContent.find('.part-state').each(function () {
								var $this = $(this);
								
								// 초기화시 기획만 작업중 나머지는 대기
								if ($this.attr('data-part') == 'PLAN') {
									$this
										.removeClass('end')
										.addClass('ing')
										.attr('data-state', 'WORKING');	
								}
								else {
									$this
										.removeClass('end ing')
										.attr('data-state', 'PENDING');	
								}
								
								$this.find('em.edate').remove();
								
								$this
									.find('.request-confirm')
									.prop('checked', false)
									.next('label')
									.text('검수요청');
							});
							
							jqContent
								.find('.fix:last')
								.removeClass('end')
								.end()
								.find('.btn-complete-confirm')
								.hide();
								
							// 전체검수 취소 알림 메세지 전송
							/*
							uijs.sendMsg({
								receiver_auth: 'WORKER'
								, content: workData.request_id +': 전체 검수 취소 되었습니다.'
								, sender_id: uijs.logininfo.get('userid')
							});
							*/
						}
					});
					
				});
				
				// 전체 작업완료 버튼...
				jqContent.find('.btn-complete-confirm').on('click', function (e) {
					e.preventDefault();
					
					if (view_type != undefined && view_type == 'COMPLETE') {
						return false;
					}
					
					var sendData = {
						"request_id": workData.request_id
						, "request_state": 'COMPLETE'
						, "complete_date": new Date()
					};
					
					uijs.ajaxDef({
						url: '/work/request_list/detail/change_state'
						, data: sendData
						, callback: function () {
							$POPUP.remove();
							
							// 작업 리스트 전체 다시 로드
							vapp.loadList();
							
							//uijs.requestWork.reloadList()
							//uijs.processWork.reloadList();
							//uijs.completeWork.reloadList();
							
						}
					});
				})
            	
            	/**
            	 * 전체검수완료 확인
            	 */
            	function setStateComplete() {
					var partState = jqContent.find('.work_part').find('.part-state');
					var complete = true;
					
					partState.each(function() {
						var state = $(this).attr('data-state');
						
						if (state !== 'CONFIRM_COMPLETE') {
							complete = false;
						}
					});
					
					if (complete) {
						jqContent
							.find('.work_part')
							.find('.fix:last')
							.addClass('end')
							.end()
							.find('.btn-complete-confirm')
							.show();
					}
				}
				// end setWorkComplete()
				
				setStateComplete();
            	
            	// 작업현황
            	function workStatus() {
	
					var part = {
							"PLAN": "기획"
							, "DESIGN": "디자인"
							, "PUBLISH": '퍼블'
						},
						
						stateText = {
							"PENDING": {
								"text": '검수요청'
								, "class": ''
								, "check": ''
							}
							, "WORKING": {
								"text": '검수요청'
								, "class": 'ing'
								, "check": ''
							}
							, "CONFIRM_REQUEST": {
								"text": '검수요청'
								, "class": 'ing'
								, "check": 'checked'
							}
							, "CONFIRM_COMPLETE": {
								"text": '검수완료'
								, "class": 'end'
								, "check": 'checked'
							}
						};
					
					//if (workData.state === 'PLAN')
					
		            var html = '';
		            
					for(var key in part) {
						
						var stateClass = '';
						var keyForDb = key.toLowerCase(); // workData 의 속성들은 소문자로 되어있어서. 비교나 속성 값을 얻기위해 소문자로 변경
						var state = workData[keyForDb];
						
						var requestState = '';
						
						if (workData.part == key && state == 'CONFIRM_REQUEST') {
							requestState = 'checked';
						}
						
						//if (key == workData.part)
						var partStateText = stateText[workData[keyForDb]].text;
						stateClass = stateText[workData[keyForDb]].class;
						
						// 상태별 검수상태 체크박스 checked 유무
						var stateCheck = stateText[workData[keyForDb]].check;
						
						// 검수요청일자 설정
						var confirmRequestDate = (
							workData[keyForDb+'_req_sdate']==null ?
							'' :
							new Date(workData[keyForDb+'_req_sdate']).format('yyyy.MM.dd')
						);
						
						// 검수완료 일자
						var confirmCompleteDateHtml = (
							(state == 'CONFIRM_COMPLETE' && workData[keyForDb+'_req_sdate'] != null) ?
							'<em class="edate">'+(new Date(workData[keyForDb+'_req_edate']).format('yyyy.MM.dd'))+'</em>' :
							''
						);
						//if (workData.part == key) stateClass = 'ing';
						
						
						html += 
							'<li class="'+stateClass+' part-state" data-state="'+state+'" data-part ="'+key+'">\n'+
				                '<span class="part-title">'+part[key]+'</span>\n'+
				                '<div class="work_step_check">\n'+
				                	'<input type="checkbox" class="request-confirm" id="'+key+'" '+stateCheck+' />' +
				                	'<label for="'+key+'">'+partStateText+'</label>' +
					                '<em class="sdate">'+confirmRequestDate+'</em>\n'+
					                confirmCompleteDateHtml+
					                '<button type="button" class="btn_confirm on btn_show_confirm_panel" '+
					                (state === 'CONFIRM_COMPLETE' ? 'style="display: none"' : '') +
					                '></button>\n'+
				                '</div>\n'+
				                '<div class="edit_pop" style="top: 125px; display: none" >\n'+
				                	'<div class="edit_tit">\n' +
					                	'검수확인'+
					                	'<a href="#none" class="btn_edit_close" title="레이어팝업닫기"></a>\n'+
				                	'</div>\n' +
				                	'<div class="edit_data">\n' +
				                		'<ul class="box_type_check">\n'+
				                			'<li>\n'+
				                				'<input type="radio" id="state1_'+key+'" name="state_'+key+'" value="CONFIRM_COMPLETE">\n'+
				                				'<label for="state1_'+key+'" class="btn-confirm-ok" style="cursor: pointer">검수확인</label>\n'+
				                			'</li>\n'+
				                			'<li>\n'+
				                				'<input type="radio" id="state_2'+key+'" name="state_'+key+'" value="WORKING">\n'+
				                				'<label for="state_2'+key+'" class="btn-request-edit" style="cursor: pointer">수정요청</label>\n'+
				                			'</li>\n'+
				                		'</ul>\n'+
				                	'</div>\n'+
				                '</div>\n'+
			                '</li>\n';
			                
					}
					
					var statusHtml = $(html);
					
					// 검수완료인경우 클릭이벤트 무시 false
					statusHtml.find('.work_step_check').find('label').on('click', function (e) {
						var $this = $(this);
						var thisState = $this.closest('.part-state').attr('data-state');
						
						if (thisState == 'CONFIRM_COMPLETE') {
							return false;
						}
					});
					
					// 검수요청버튼 클릭 이벤트
					statusHtml.find('input[class=request-confirm]').off('change').on('change', function () {
						
						if (uijs.logininfo.get('auth') != 'WORKER' && uijs.logininfo.get('auth') != 'ADMIN') {
							alert('요청 권한이 없습니다.');
							$(this).prop('checked', false);
							return false;
						}
						
						var $this = $(this);
						var closestLi = $this.closest('li');
						var nowState = closestLi.data('state');
						var nowPart = closestLi.data('part');
						var sendData = {
							work_id: workData.work_id,
							request_id: workData.request_id,
							part: nowPart
						};
						
						// 검수요청 일자
						var confirmRequestDate = new Date();
						
						// 요청 파트의 상태 검수요청으로 변경
						sendData[nowPart.toLowerCase()] = 'CONFIRM_REQUEST';
						// 요청 파트의 검수요청일자 수정
						sendData[nowPart.toLowerCase()+'_req_sdate'] = confirmRequestDate;
						
						if ($this.prop('checked') == true && nowState == 'WORKING') {
							
							var returnData;
							
							if ($this.closest('.ing')) {
								
								uijs.ajaxDef({
									ajaxOption: {
										url: '/work/work_list/detail/update_state',
										data: sendData,
										method: 'POST',
										dataType: 'json',
										async: false
									},
									
									callback: function(data) {
										returnData = data;
										
										closestLi.attr('data-state', 'CONFIRM_REQUEST');
										
										// 검수완료 또는 수정요청 버튼 show
										closestLi.find('.work_step_check').find('button').show();
										
										// 검수요청일자 표시
										closestLi.find('em.sdate').text(confirmRequestDate.format('yyyy.MM.dd')).show();
										
										// 검수요청/검수완료 갯수 업데이트
										setConfirmCount();
										
										/*
										uijs.sendMsg({
											receiver_auth: 'MANAGER'
											, content: workData.request_id +': '+ part[nowPart]+' 검수요청이 있습니다.'
											, sender_id: uijs.logininfo.get('userid')
										});
										*/
										// vue 리스트 call
										vapp.loadList(['process']);
										
										// 검수요청완료 메세지 팝업
										uijs.msg.alert('검수요청이 완료 되었습니다.');
									}
								});
								
							} 
							else {
								return;
							}
						}
						else {
							$this.prop('checked', true);
						}
			
						
					});
					
					// 검수 or 수정요청 팝업열기
					statusHtml.find('.btn_show_confirm_panel').off('click').on('click', function () {
						$(this).closest('li').find('.edit_pop').show();
					});
					
					// 검수 or 수정요청 팝업 닫기
					statusHtml.find('.btn_edit_close').on('click', function (e) {
						e.preventDefault();
						
						$(this).closest('.edit_pop').hide();
					});
					
					// 검수완료 or 수정요청 이벤트
					statusHtml.find('input[name^=state_]').on('change', function () {
						var $this = $(this);
						
						if (uijs.logininfo.get('auth') != 'MANAGER' && uijs.logininfo.get('auth') != 'ADMIN') {
							alert('검수 권한이 없습니다.');
							$this.prop('checked', false);
							return false;
						}
						
						if ($this.prop('checked')) {
							var stateValue = $this.val();
							var nextPart;
							var closestLi = $this.closest('.part-state');
							var nowPart = closestLi.data('part');
							
							var partArray = Object.keys(part);
							
							// 다음작업 
							for(var index in partArray) {
								var nextIndex = parseInt(index) + 1;
								
								if (nextIndex > partArray.length) break;
								
								if (nowPart == partArray[index]) {
									nextPart = partArray[nextIndex];
									
									break;
								}
							}
							
							// 검수요청 전송 데이터
							var sendData = {
								work_id: workData.work_id,
								request_id: workData.request_id,
							};
							
							// 검수완료 날짜
							var confirmCompleteDate = new Date();
							
							// 현재파트의 검수데이터가 검수 완료인경우 데이터의 PART 를 다음 작업파트로 변경
							if (stateValue == 'CONFIRM_COMPLETE') {
								
								// 다음 작업 파트가 없는경우
								if (nextPart === undefined) {
									sendData.part = nowPart;
								}
								// 다음 작업파트가 있는경우
								else {
									sendData.part = nextPart;
									// 다음파트 작업상태를 working 으로 변경
									sendData[nextPart.toLowerCase()] = 'WORKING';
								}
								
								// 현재작업의 검수완료 날짜 삽입
								sendData[nowPart.toLowerCase()+'_req_edate'] = confirmCompleteDate;
							}
							// 검수완료가 아닌경우 = 수정요청
							else {
								sendData.part = nowPart;
							}
							// 현재파트 작업상태 변경 CONFIRM_REQUESR or CONFIRM_COMPLETE
							sendData[nowPart.toLowerCase()] = stateValue;
//							send
							
//							return false;
		
							if (closestLi.attr('data-state') == 'CONFIRM_REQUEST') {
								uijs.ajaxDef({
									ajaxOption: {
										url: '/work/work_list/detail/update_state',
										data: sendData,
										method: 'POST',
										dataType: 'json',
										async: false
									},
									
									callback: function () {
										closestLi.attr({
											"data-state": stateValue
										});
										
										closestLi.find('.work_step_check').find('button').hide();
										
										// 검수완료인 경우
										if (stateValue == 'CONFIRM_COMPLETE') {
											// 현재 작업상태를 알리는 클래스 변경 ing: 작업중, end: 작업완료
											closestLi.removeClass('ing').addClass('end');
											closestLi.find('.request-confirm').next('label').text(stateText[stateValue].text);
											
											// 작업완료 날짜 표기 = 검수요청일 뒤에 검수완료일 삽입.
											closestLi.find('em.sdate').after(function () {
												var html = '<em class="edate">' + confirmCompleteDate.format('yyyy.MM.dd') + '</em>';
												return html;
											});
											
											if (nextPart === undefined) {
												//closestLi.next('.fix').addClass('end');
												setStateComplete();
											}
											else {
												closestLi.next('.part-state').attr('data-state', 'WORKING').addClass('ing');
											}
											
											// 검수완료 알림 메세지 전송
											/*
											uijs.sendMsg({
												receiver_auth: 'WORKER'
												, receiver_part: nowPart
												, content: workData.request_id +': '+ part[nowPart]+' 검수완료 되었습니다.'
												, sender_id: uijs.logininfo.get('userid')
											})
											*/;
											//uijs.processWork.reloadList();
										}
										// 수정요청인경우
										else {
											
											// 검수취소-수정 알림 메세지 전송
											/*
											uijs.sendMsg({
												receiver_auth: 'WORKER'
												, receiver_part: nowPart
												, content: workData.request_id +': '+ part[nowPart]+' 수정요청 하였습니다.'
												, sender_id: uijs.logininfo.get('userid')
											});
											*/
											// 검수요청 버튼 다시 활성화
											closestLi.find('.request-confirm').prop('checked', false);
											// 검수요청날짜 숨김
											closestLi.find('em.sdate').hide();
										}
										
										// 작업내역 다시 검색
										vapp.loadList(['process']);
										
										$this.closest('.edit_pop').hide();
										$this.prop('checked', false);
									}
								});
							}
						
							
						}
					});
					
					return statusHtml;
		            //tempHtml.replace('{{title}}', )
		            
				} // end workStatus()
				
				
            	// 댓글 영역
				var commentArea =  
					$(
                    '<ul>\n'+
                        '<li class="write"></li>\n'+
                    '</ul>\n'
		          	);
			
				/**
				 * 쓰기영역
				 */
				function commentWrite() {
					var selectedPart = uijs.logininfo.get('part');
					var mnSel = '', pnSel = '', dsSel = '', pbSel = '';
					
					switch(selectedPart) {
						case 'MANAGER': 
							mnSel = 'selected';
							break;
						case 'PLAN':
							pnSel = 'selected';
							break;
						case 'DESIGN':
							dsSel = 'selected';
							break;
						case 'PUBLISH':
							pbSel = 'selected';
							break;
					}
					
					
					var writeHtml = 
						$(
		                '<div class="work_form">'+
			                '<form name="comment_form" id="comment_form" method="post" enctype="multipart/form-data" onsubmit="return false;">'+
			                	'<input type="hidden" name="ref" value="WORK_LIST" />'+
			                	'<input type="hidden" name="ref_id" value="'+workData.work_id+'" />'+
			                    '<select class="selectbox" name="writer_type">'+
			                        '<option value="MN" '+mnSel+'>담당자</option>'+
			                        '<option value="PN" '+pnSel+'>기획</option>'+
			                        '<option value="DS" '+dsSel+'>디자인</option>'+
			                        '<option value="PB" '+pbSel+'>퍼블</option>'+
			                    '</select>\n'+
			                    '<div class="coment_box">\n'+
			                        '<textarea placeholder="내용을 입력해주세요" name="content"></textarea>\n'+
			                        '<div class="btn_coment">\n'+
			                        	'<div class="file_info_area">'+
			                        	'<span class="file-info"></span>\n'+
			                        	'</div>'+
			                        	'<div class="comment_btn_area">'+
				                        	'<a href="#none" class="btn_small01" style="position: relative">파일업로드+\n'+
				                        		'<input type="file" id="cfile" name="cfile" style="opacity: 0; width: 100%; position: absolute; left:0; top: 0"/>\n'+
				                        	'</a>\n' +
				                            '<a href="#none" class="btn_small02 btn-regist">등록</a>\n'+
			                            '<div>'+
			                        '</div>\n'+
			                    '</div>\n'+
			                '</form>\n'+
		                '</div>\n'
						);
					
					// 작업완료 목록에서 팝업띄웠을때는 쓰기영역 공배 div 
					if (view_type != undefined && view_type == 'COMPLETE') {
						writeHtml = $('<div></div>');
					}
					/**
					 * 코멘트 등록
					 */
					var regist = function () {
						/*alert('등록하시겠습니까?');*/
						var cform = writeHtml.find('#comment_form');
						
						if (cform.find('[name=content]').val().replace(/\s/g, '') == '') {
							alert('내용을 입력해 주세요');
							cform.find('[name=content]').focus();
							return;
						}
						
						var formDataWithFile = new FormData(cform[0]);
						
						formDataWithFile = uijs.addFileData(formDataWithFile, cform);
						formDataWithFile.append('writer', uijs.logininfo.get('userid'));
						
						// 댓글 등록 action
						uijs.ajaxFormData({
							url: '/cmt/insert',
							data: formDataWithFile,
							successCallback: function (data) {
								if (data.insertid) {
									cform.find('[name=content]').val('');
									cform.find('[name=cmt_file]').val('');
									cform.find('.file-info').text('');
									
									cform.find('.file_info').remove();
									cform.find('[id^=cfile_]').remove();
									
									commentReload();
								}
							},
							errorCallback: null
						});
		
					}; // end regist
					
					/**
					 * 코멘트 등록
					 */
					writeHtml.find('.btn-regist').off('click.regcomment').on('click.regcomment', function (e) {
						e.preventDefault();
						
						regist();
					});
					
					// 파일 선택 event
					writeHtml.find('input[name=cfile]').on('change', function (e) {
						e.preventDefault();
						
						if($(this)[0].files[0].name != '') {
							var fileInputId = 'cfile_'+(Date.now());
							var fileInputClone = $(this).clone(true);
							
							fileInputClone.attr({
								'id': fileInputId
								, 'name': 'cfile'
								, 'style': 'display: none'
							});
							// 실제업로드에 필요한 파일 input 을 form 에 삽입
							writeHtml.find('#comment_form').append(fileInputClone);
							
							// 업로드파일 이름+ 삭제버튼 그룹
							var fileInfoArea = $('<p class="file_info">');
							// 첨부파일 이름
							$('<span>', {
								text: fileInputClone[0].files[0].name 
							})
							.appendTo(fileInfoArea);
							
							// 파일삭제 버튼
							$('<a>', {
								class:"btn_inline_delete"
								,'data-ref-id': fileInputId
								, href: '#none'
							})
							.on('click', function (e) {
								e.preventDefault();
								var $this = $(this);
								var fileId = $this.attr('data-ref-id');
								
								// 실제업로드 용으로 추가한 file input 삭제
								$('#'+fileId).remove();
								// 첨부파일 이름 표시영역중 삭제된 파일 제거
								$this.closest('.file_info').remove();								
							})
							.appendTo(fileInfoArea);
							
							// 선택한 첨부파일 이름 화면에 표시
							writeHtml.find('.file_info_area').append(fileInfoArea);
							
							$(this).val('');
						}
						//console.log($(this).val())
					});
					
					return writeHtml;
					
				}; // end commentWrite()
				
				
				/**
				 * 코멘트 목록
				 */
				function commentList() {
					
					var returnList;
					
					loading('start');
					
					$.ajax({
						url: '/cmt/list',
						data: {ref: 'WORK_LIST', ref_id: workData.work_id},
						dataType: 'json',
						method: 'GET',
						async: false
					})
					.done(function (data) {
						console.log('댓글', data)
						var writerType = {
							'MN': '담당자',
							'PN': '기획자',
							'DS': '디자인',
							'PB': '퍼블'
						};
						
						returnList =  data.map(function (v) {
							
							var wt = writerType[v.WRITER_TYPE];
							var files = [];
							files = v.FILES;
							
							var fileHtml = '';
							// 파일정보 저장
							if (files.length) {
								for(var file of files) {
									if (file.original_filename != null) {
			                            fileHtml += 
		                            	'<div class="plus_file">\n'+
	                                    	'<a href="/file/download?file_id='+file.file_id+'" class="btn_text down">'+file.original_filename+'</a>\n'+
	                                	'</div>\n';
									}
								}
							}
							
							// 코멘트 목록 item
							var listHtml = 
								 '<li class="list" data-id="'+v.CMT_NO+'">\n'+
			                        '<div class="work_member">\n'+
			                            '<span class="mem" '+
			                            (v.WRITER_TYPE == 'MN'? 'style="color: #fff; background: #00a684"':'')+
			                            '>'+wt+'</span>\n'+
			                        '</div>\n'+
			                        '<div class="work_text">\n'+
			                            '<p>'+v.USERNAME+'</p>\n'+
			                            '<em>'+new Date(v.REGDATE).toLocaleString()+'</em>\n'+
			                            '<div class="data" style="position: relative">\n'+
			                                v.CONTENT.replace(/\r\n/g, '<br>')+'\n'+
			                            '</div>\n'+
			                             fileHtml + // 파일정보
			                        '</div>\n';
			                        
			                        // 작성자인경우  수정/삭제버튼 노출
		                        	if (uijs.logininfo.get('userid') === v.WRITER) {
										listHtml +=	
										'<div style="text-align: right; margin-top: 10px;">\n'+
			                                '<a href="#" class="btn_small01 edit" style="">수정</a>\n'+
			                                '<a href="#" class="btn_small01 delete" style="">삭제</a>\n'+
		                                '</div>\n';
									}
				                    listHtml +=
				                    '</li>';
							
							listHtml = $(listHtml);
							
							// 댓글 수정
							listHtml.find('.edit').off('click').on('click', function (e) {
								e.preventDefault();
								
								editCommentPopup(v);
							});
							
							// 댓글 삭제
							listHtml.find('.delete').off('click').on('click', function (e) {
								e.preventDefault();
					
								if (confirm('삭제 하시겠습니까?')) {
									//console.log(id);
									uijs.ajaxDef({
										url: '/cmt/delete.data'
										, data: {'cmt_no': v.CMT_NO}
										, dataType: 'text'
										, callback: function (data) {
											commentReload();
										}
									});
								}
								else {
									return false;
								}
							});
							
							return listHtml;
						});
					})
					.fail(function () {
						loading('stop');
					})
					.always(function () {
						loading('stop');
					});
					
					return returnList;
				}; // end commentList
				
				
				// 댓글 목록 다시 로드
				function commentReload() {
					jqContent.find('.work_message').find('li.list').remove();
					
					jqContent.find('.work_message').find('ul').append(commentList);
				} // end commentReload
            	
            	// 댓글영역에 쓰기영역 추가
            	commentArea.find('.write').html(commentWrite);
            	
            	// 댓글영역에 목록 추가
            	commentArea.append(commentList);
				
            	// 팝업에 댓글 추가
            	jqContent.find('.work_message').append(commentArea);
            	
            	// 팝업에 전체내용 추가
            	$POPUP.find('.pop_content').append(jqContent);
            	//popup.find('.work_message').append(commentArea);
            	
            	// 바디에 상세보기 팝업 추가
            	$POPUP.appendTo('body');
            	
            	
            	
				// 댓글 수정 팝업
				function editCommentPopup(item) {
					var $item = item; // 수정될 댓글 정보
					
					function makePopup() {
						
						var files = $item.FILES;
						
						var fileHtml = '';
						// 파일정보 저장
						if (files.length) {
							for(var file of files) {
								if (file.original_filename != null) {
		                            fileHtml += 
		                            '<p class="file_info">\n'+
		                            	'<span style="font-weight:bold">'+file.original_filename+'</span>\n'+
		                            	'<a class="btn_inline_delete" data-id="'+file.file_id+'" href="#none"></a>\n'+
		                            '</p>\n';
								}
							}
						}
						
						var htm = 
						'<div class="modal_layer_pop work_type">\n'+
							'<div class="modal_layer_inner" style="background:#fff;">\n'+
								'<div class="pop_tit">\n'+
									'<a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>\n'+
								'</div>\n'+
								'<div class="pop_content" style="height: 100%">\n'+
									'<ul class="work_temp" style="height: 100%">\n'+
										'<li class="cont" style="height: 100%">\n'+
											'<div class="active_txt" style="height: 100%">\n'+
												'<div class="work_message">\n'+
													'<p>댓글수정</p>\n'+
													'<ul>\n'+
														'<li class="write">\n'+
															'<div class="work_form" style="padding-left:0">\n'+
																'<form name="comment_edit_form" id="comment_edit_form" method="post" enctype="multipart/form-data" onsubmit="return false;">\n'+
																'<div class="coment_box">\n'+
																	'<textarea placeholder="내용을 입력해주세요" name="content">'+item.CONTENT+'</textarea>\n'+
																	'<div class="btn_coment">\n'+
																		'<div class="file_info_area" style="margin-top: 30px">'+fileHtml+'</div>\n'+
																		'<div class="comment_btn_area">\n'+
																			'<a href="#none" class="btn_small01" style="position: relative">파일업로드+\n'+
																				'<input type="file" id="cfile" name="cfile" style="opacity: 0; width: 100%; position: absolute; left:0; top: 0">\n'+
																			'</a>\n'+
																			'<a href="#none" class="btn_small02 btn-regist">수정</a>\n'+
																		'<div>\n'+
																	'</div>\n'+
																'</div>\n'+
																'</form>\n'+
															'</div>\n'+
														'</li>\n'+
													'</ul>\n'+
												'</div>\n'+
											'</div>\n'+
										'</li>\n'+
									'</ul>\n'+
								'</div>\n'+
							'</div>\n'+
						'</div>\n';
						
						htm = $(htm);
						
						// 팝업 닫기
						htm.find('.btn_pop_close').off('click.closeedit').on('click.closeedit', function (e) {
							e.preventDefault();
							
							htm.remove();
						});
						
						// 수정팝업 딤등영역 클릭 으로 닫기
						htm.off('click.popup').on('click.popup', function (e) {
							if ($(e.target)[0].classList[0] === 'modal_layer_pop') {
								htm.remove();
							}
						});
						
						// 파일삭제
						htm.off('click.file_delete').on('click.file_delete', '.btn_inline_delete', function (e) {
							e.preventDefault();
							
							var $this = $(this);
							var fileId = $this.attr('data-id');
						
							if (confirm('파일을 삭제 하시겠습니까?')) {
								uijs.ajaxDef({
									ajaxOption: {
										url: '/cmt/delete_file'
						                , data: {file_id: fileId}
						                , method: 'POST'
						                , dataType: 'text'
						                , async: true 
									}
								    , callback: function (data) {
										if (data == 'SUCCESS') {
											$this.closest('.file_info').remove();
											
											// 댓글목록 다시로드
											commentReload();
										}
								    }
								});
							}
						}); // 파일삭제
						
						// 파일 선택 event
						htm.find('input[name=cfile]').on('change', function (e) {
							e.preventDefault();
							
							if($(this)[0].files[0].name != '') {
								var fileInputId = 'cfile_'+(Date.now());
								var fileInputClone = $(this).clone(true);
								
								fileInputClone.attr({
									'id': fileInputId
									, 'name': 'cfile'
									, 'style': 'display: none'
								});
								// 실제업로드에 필요한 파일 input 을 form 에 삽입
								htm.find('#comment_edit_form').append(fileInputClone);
								
								// 업로드파일 이름+ 삭제버튼 그룹
								var fileInfoArea = $('<p class="file_info">');
								// 첨부파일 이름
								$('<span>', {
									html: '<i style="color: blue">[new]</i> '+fileInputClone[0].files[0].name 
								})
								.appendTo(fileInfoArea);
								
								// 파일삭제 버튼
								$('<a>', {
									class:"btn_inline_delete"
									,'data-ref-id': fileInputId
									, href: '#none'
								})
								.on('click', function (e) {
									e.preventDefault();
									var $this = $(this);
									var fileId = $this.attr('data-ref-id');
									
									// 실제업로드 용으로 추가한 file input 삭제
									$('#'+fileId).remove();
									// 첨부파일 이름 표시영역중 삭제된 파일 제거
									$this.closest('.file_info').remove();								
								})
								.appendTo(fileInfoArea);
								
								// 선택한 첨부파일 이름 화면에 표시
								htm.find('.file_info_area').append(fileInfoArea);
								
								$(this).val('');
							}
							//console.log($(this).val())
						});
						
						// 댓글 수정 실행
						htm.find('.btn-regist').on('click', function (e) {
							e.preventDefault();
							
							var cform = htm.find('#comment_edit_form');
						
							if (cform.find('[name=content]').val().replace(/\s/g, '') == '') {
								alert('내용을 입력해 주세요');
								cform.find('[name=content]').focus();
								return;
							}
							
							var formDataWithFile = new FormData(cform[0]);
							
							formDataWithFile = uijs.addFileData(formDataWithFile, cform);
//							formDataWithFile.append('content', "sssss");
							formDataWithFile.append('cmt_no', $item.CMT_NO);
							
						
							// 댓글 등록 action
							uijs.ajaxFormData({
								url: '/cmt/update_cmt',
								data: formDataWithFile,
								successCallback: function (data) { // data return value = String
									//if (parseInt(data) > 0 ) {
										htm.remove();
										
										commentReload();
									//}
								},
								errorCallback: null
							});
						})
						
						$('body').append(htm);
					} // makePopup()
					
					makePopup();
				}// editCommentPopup()
				
			} // end detailPopup()
			
			
			
			// 진행중인작업 목록 다시 로드
			function reloadList(part, isSearch) {
				var thisPart = '';
				
				if (part != undefined) thisPart = part;
				
				list({
					"appendPosition": appendPosition,
					"part": thisPart,
					"isSearch": isSearch
				});
			} // end reloadList()
			
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
			var MORE_POPUP_ID;
			
			function list() {
				
				uijs.ajaxDef({
					ajaxOption: {
						url: '/work/complete_list'
						, data: {
							site_code: uijs.channel.get()
							, orderkey: 'regdate'
							, listsort: 'd'
						}
						, method: 'GET'
						, dataType: 'json'
						, async: false 
					},
					
					callback: function (data) {
						//console.log(data); 
						
						var complete_list = $(
							'<dl>\n'+
								'<dt>\n'+
									'<p>작업완료\n'+
										'<a href="#none" class="btn_small01" id="btn-complete-more">작업완료 더보기</a>\n'+
									'</p>\n'+
									'<span>'+data.length+'건</span>\n'+
								'</dt>\n'+
								'<dd class="">\n'+
								'</dd>\n'+
							'</dl>\n'
						);
						
						var complete_item = '';
						
						for(var index in data) {
							
							var item = data[index];
							
//							var requestTypeStr = _workType[item.request_type].text,
//								requestTypeCss = _workType[item.request_type].css;
							
							var dbDate = new Date(item.end_date);
							var endDate = dbDate.format('yyyy.MM.dd');
												
							complete_item +=
								'<div class="work_factor complete" data-request-id="'+item.request_id+'">\n'+
									'<dl>\n'+
										'<dt>\n'+
											'<div>'+item.request_id+'</div>\n'+
											'<ul class="work_label">\n'+
												'<li><a href="#none" class="work_label04">작업완료</a></li>\n'+
											'</ul>\n'+
//											'<a href="#none" class="btn-view-detail"><span class="'+requestTypeCss+'">'+requestTypeStr+'</span>\n'+
											'<a href="#none" class="btn-view-detail">\n'+
												item.request_title+'</a>\n'+
										'</dt>\n'+
										'<dd>\n'+
											'<div class="work_area">\n'+
												item.request_content+'\n'+
											'</div>\n'+
											'<div class="date_area">\n'+
												'<span>~'+endDate+' 까지</span>\n'+
											'</div>\n'+
										'</dd>\n'+
									'</dl>\n'+
								'</div>\n';
						}
							
						
						complete_list.append(complete_item);
						
						var completeWorks = $('#complete_list').html(complete_list);
						
						// 상세보기 팝업 띄우기
						completeWorks
						.find('.btn-view-detail')
						.on('click', function(e) {
							e.preventDefault();
							
							var request_id = $(this).closest('.work_factor.complete').attr('data-request-id');
							
							uijs.processWork.detailPopup(request_id, 'COMPLETE');
						});
						
						// 작업완료더보기 클릭 이벤트 - 팝업
						completeWorks
						.find('#btn-complete-more')
						.on('click', function () {
							listMore();
						});
					}
				});
			}// list
			
			// 작업완료 더보기
			function listMore() {
				var $PAGE=1, $START=1, $LIMIT= 10;
				// = 'complete-more-'+Date.now();
				
				function makePopup(data) {
					MORE_POPUP_ID = 'complete-more-'+Date.now();
					
					var htm = 
					'<div class="modal_layer_pop" id="'+MORE_POPUP_ID+'">\n'+
		                '<div class="modal_layer_inner" style="overflow-y: auto">\n'+
		                    '<div class="pop_tit">\n'+
		                        '<h1>작업완료 더보기</h1>\n'+
		                        '<a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>\n'+
		                    '</div>\n'+
		                    
		                    '<div class="pop_content">\n'+
		                    	'<div class="input_section right_type mb40" style="border-bottom:0;">\n'+
			                        '<ul class="input_wrap">\n'+
			                            '<li class="input_area search_case" style="float: left">\n'+
			                            	'<label for="">정렬</label>\n'+
			                                '<select class="selectbox" name="orderkey">\n'+
			                                    '<option value="regdate" selected>요청일기준</option>\n'+
			                                    '<option value="completedate">완료일기준</option>\n'+
			                                '</select>\n'+
			                            '</li>\n'+
			                            '<li style="float: left">\n'+
			                            	'<input type="radio" name="listsort" id="listsort_desc" style="height: 36px; margin-left: 20px" value="d" checked/>\n'+
			                            	'<label for="listsort_desc">최근순</label>\n'+
			                                '<input type="radio" name="listsort" id="listsort_asc" style="height: 36px; margin-left: 10px" value="a"/>\n'+
			                            	'<label for="listsort_asc">오래된순</label>\n'+
			                            '</li>\n'+
			                        '</ul>\n'+
			                    '</div>\n'+
		                    	'<div id="complete-more-popup-list-area">\n';
		                    	htm += makeListItems(data);
								htm +=
		                        '</div>\n'+
		                        '<div class="btn_more_area">\n'+
		                            '<a href="#none" class="btn-more-view">더보기</a>\n'+
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
					
					// 더보기 클릭
					retHtm.on('click', '.btn-more-view', function () {
						moreView(retHtm);
					});
					
					retHtm.on('change', 'input[name=listsort], select[name=orderkey]', function () {
						listSort(retHtm);
					});
					
					
					// 완료내용 상세보기
					retHtm.on('click', '.history-detail', function () {
						var requestId = $(this).attr('id');
						
						uijs.processWork.detailPopup(requestId, 'COMPLETE');
					});
		            
		            return retHtm;
				}// makePopup()
				
				// 조회된 목록 html 생성
				function makeListItems(data) {
					var items = '';
						 
					for (var item of data) {
						items +=
						'<div class="work_factor" style="position: relative;">\n'+
                            '<dl>\n'+
                                '<dt>\n'+
                                    '<div>ID '+item.request_id+'</div>\n'+
                                    '<ul class="work_label">\n'+
										'<li><a href="#none" class="work_label04">작업완료</a></li>\n'+
									'</ul>\n'+
                                    '<a href="#" class="history-detail" id="'+item.request_id+'">'+item.request_title+'</a>\n'+
                                '</dt>\n'+
                                '<dd>\n'+
                                    '<div class="work_area">\n'+
                                        item.request_content+'\n'+
                                    '</div>\n'+
                                    '<p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; left: 100px; top: 10px;">\n'+
                                    (new Date(item.regdate)).format('yyyy.MM.dd')+'\n'+
                                    '</p>\n'+
                                '</dd>\n'+
                            '</dl>\n'+
                        '</div>\n';
					}
					
					return items;
				}// makeListItems()
				
				// 팝업 오픈
				function openPopup() {
					if (MORE_POPUP_ID != undefined) {
						$('#'+MORE_POPUP_ID).remove();
					}
					
					getData({}, function (data) {
						if (data.length <= 0) return;
						
						var popup = makePopup(data);
					
						$('body').append(popup);
						
						$PAGE += 1;
					});
				} // openPopup()
				
				
				// 목록 정렬
				function listSort(htm) {
					//$START = (($PAGE-1) * $LIMIT) + 1;
					
					var orderkey = htm.find('select[name=orderkey]').val();
					var listsort = htm.find('input[name=listsort]:checked').val();
					
					getData({
						start: 1
						, limit: ($PAGE-1) *  $LIMIT
						, orderkey: orderkey
						, listsort: listsort 
					}, function (data) {
						if (data.length <= 0) {
//							alert('마지막 입니다.'); 
							return;
						}
						// 목록 html 생성
						var items = makeListItems(data);
						
						htm.find('#complete-more-popup-list-area').html(items);
					});
				}// listSort()
				
				// 더보기 버튼클릭시 실행
				function moreView(htm) {
					
					$START = (($PAGE-1) * $LIMIT) + 1;
					
					var orderkey = htm.find('select[name=orderkey]').val();
					var listsort = htm.find('input[name=listsort]:checked').val();
					
					getData({
						orderkey: orderkey
						, listsort: listsort 
					}, function (data) {
						if (data.length <= 0) {
							alert('마지막 입니다.'); 
							return;
						}
						// 목록 html 생성
						var items = makeListItems(data);
						
						htm.find('#complete-more-popup-list-area').append(items);
						
						$PAGE += 1;
					});
				} // moreView()
				
//				function 
				
				// 데이터 조회
				function getData(data, callbackFn) {
					
					var dataDef = {
						site_code: uijs.channel.get()
						, start: $START
						, limit: $LIMIT
						, orderkey: 'regdate'
						, listsort: 'd'
					};
					
					dataDef = $.extend(dataDef, data);
					
//					console.log(dataDef);
					
					uijs.ajaxDef({
						url: '/work/complete_list'
						, data: dataDef
						, method: 'GET'
						, callback: callbackFn
					});
				} // getData()
				
				openPopup();
	            
			}; // listMore()
			
			
			function reloadList() {
				list();
			}
			
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
        var channel = sessionStorage.getItem('channel') == null ? 'CB_M' : sessionStorage.getItem('channel');
        var channels;
        
        // 채널 목록 데이터 
        function getChannels() {
//			channels;
			
			if (sessionStorage.getItem('channels') == null) {
				uijs.ajaxDef({
					ajaxOption: {
						url: '/chan/channels.data'
					},
					callback: function(data) {
						//channels = data;
						sessionStorage.setItem('channels', JSON.stringify(data));	
					}
				});
			}
			else {
				channels = JSON.parse(sessionStorage.getItem('channels'));
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
				// socket.send(sendParam.sender_id+','+sendParam.receiver_auth+','+sendParam.receiver_part+','+sendParam.content);
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
			var htm = 
			'<div class="modal_layer_pop" id="">\n'+
	            '<div class="modal_layer_inner" style="overflow-y: auto; width: 480px">\n'+
	                '<div class="pop_tit">\n'+
	                    '<h1>요청작업 내역</h1>\n'+
	                    '<a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>\n'+
	                '</div>\n'+
	                
	                '<div class="pop_content" style="margin-top: 0;">\n'+
	                	'<div class="work_message">\n'+
		                	'<ul class="msg_list">\n';
	                		for(var item of data) {
								htm +=
								'<li class="list">\n'+
									'<div class="work_text" style="padding-left: 0">\n'+
										'<em>'+(new Date(item.WRITE_DATE)).format('yyyy.MM.dd hh.mm.ss')+'</em>\n'+
										'<div>'+item.CONTENT+'</div>\n'+
									'</div>\n'+
		                		'</li>\n';
							}
	                		htm +=
		                	'</ul>\n'+
		                '</div>\n'+
		                '<div class="btn_more_area">\n'+
							'<a href="#none" class="btn-more-view">더보기</a>\n'+
						'</div>\n'+
	                '</div>\n'+
	            '</div>\n'+
	        '</div>';
	        
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
						htm +=
						'<li class="list">\n'+
							'<div class="work_text" style="padding-left: 0">\n'+
								'<em>'+(new Date(item.WRITE_DATE)).format('yyyy.MM.dd hh.mm.ss')+'</em>\n'+
								'<div>'+item.CONTENT+'</div>\n'+
							'</div>\n'+
                		'</li>\n';
					}
					
					htm.find('.msg_list').append(htm);
				});
			});
	        
	        htm.appendTo('body');
	        
	        // 받은메세지 갯수 초기화
	        var msgCnt = parseInt($('.bell').find('.alam_msg').attr('data-cnt'));
	        
	        // 알림메세지 0으로 설정
	        $('.bell').show().find('.alam_msg').html('알림 0');
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

var socket = null;
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
	 * 선택된 메뉴 표시
	*/
	if(location.pathname.indexOf('/work') != -1) {
		$('.header').find('nav ul li:eq(0)').find('a').addClass('on').parent().siblings('li').find('a').removeClass('on')
	}
	else if(location.pathname.indexOf('/ia') != -1) {
		$('.header').find('nav ul li:eq(1)').find('a').addClass('on').parent().siblings('li').find('a').removeClass('on')
	}
	else if (location.pathname.indexOf('/user') != -1) {
		$('.header').find('nav ul li:eq(2)').find('a').addClass('on').parent().siblings('li').find('a').removeClass('on')
	}
	else if (location.pathname.indexOf('/resource') != -1) {
		$('.header').find('nav ul li:eq(3)').find('a').addClass('on').parent().siblings('li').find('a').removeClass('on')
	}
	
	
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
	
	uijs.setMsgCnt();
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
