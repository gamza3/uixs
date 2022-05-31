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
                        <h2 style="border-bottom: 0;">메뉴관리</h2>
                    </div>
                    
                    <ul class="view_list_wrap bor_top">
                        <li>
                            <div class="list link active">
                                <a href="#none"><strong class="tit-channel-type">{{selectedChannel.name}}</strong> <!-- <span class="bul_type01">개인</span> --></a>
                                <div class="btn_edit_area">
<!--                                     <button type="button" class="btn_small01 download">다운로드</button> -->
                                    <button type="button" class="btn_small01 listview">메뉴목록</button>
                                </div>
                            </div>
                            <div class="grey_list_type white">
                                <div class="left_con_area">
                                    <div class="btn_menu">
                                        <a href="#none" class="btn_mid_type03" id="add-menu">메뉴 추가하기</a>
                                    </div>
                                    <div id="menutree" class="menulist"></div>
                                    <ul class="menu_list">
                                        
                                    </ul>
                                </div>
                                <div class="con_area" style="padding-left: 290px">
                                    <div class="tit_area">
                                        <h2 style="height: 50px"><span></span> <a href="#none" class="btn_small01 add-list-menu" id="add-subtree-depth1">메뉴추가</a></h2>
<!--                                         <div class="input_section"> -->
<!--                                             <ul class="input_wrap"> -->
<!--                                                 <li class="input_area search_case"> -->
<!--                                                     <label for="">화면명 검색</label> -->
<!--                                                     <input type="text" placeholder="화면명을 입력하세요" id="search-node" value=""> -->
<!--                                                     <button type="button" class="btn_search"></button> -->
<!--                                                 </li> -->
<!--                                             </ul> -->
<!--                                         </div> -->
                                    </div>
                                    <div class="con_menu_list" id="con_menu_list">
                                        
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
		<!--// container-->
		
		<!-- ia 상세내용 수정 팝업 -->
		<div class="modal_layer_pop" :data-ia-id="ia.id" v-show="iaDetailShow" @click="closePopupFromDim">
	        <div class="modal_layer_inner" style="max-height: 650px; overflow-y: auto;">
	            <div class="pop_tit">
	                <h1>상태 관리</h1>
	                <a href="#none" class="btn_pop_close" title="레이어팝업 닫기" @click="closeIaDetailPopup"></a>
	            </div>
	            <div class="pop_content">
					<div class="grey_list_type">
						<ul class="list_type01">
							<li class="input_area">
								<label for="ia-text">Name</label>
								<input type="text" id="ia-text" name="text" v-model="ia.text"/>
							</li>
							<li class="input_area">
								<label for="ia-link">File Directory <span style="font-size:12px">({{iaPlaceHolder}})</span></label>
								<input type="text" id="ia-link" name="link" v-model="ia.link" :placeholder="iaPlaceHolder"/>
							</li>
							<li class="input_area">
								<p class="inp_tit">퍼블상태</p>
								<ul class="box_type_check no-position">
									<li>
										<input type="radio" name="publ" id="publ1" value="1" v-model="ia.publ">
										<label for="publ1">작업중</label>
									</li>
									<li>
										<input type="radio" name="publ" id="publ2" value="2" v-model="ia.publ">
	                            		<label for="publ2">완료</label>
	                            	</li>
	                            	<li>
		                            	<input type="radio" name="publ" id="publ3" value="3" v-model="ia.publ">
	                                	<label for="publ3">수정</label>
	                            	</li>     
	                            </ul>
							</li>
							<li class="input_area">
								<p class="inp_tit">검수결과</p>
								<ul class="box_type_check no-position">
									<li>
										<input type="radio" name="confirm" id="confirm1" value="1" v-model="ia.confirm">
										<label for="confirm1">작업중</label>
									</li>
									<li>
										<input type="radio" name="confirm" id="confirm2" value="2" v-model="ia.confirm">
	                            		<label for="confirm2">검수요청</label>
	                            	</li>
	                            	<li>
		                            	<input type="radio" name="confirm" id="confirm3" value="3" v-model="ia.confirm">
	                                	<label for="confirm3">검수완료</label>
	                            	</li>     
	                            </ul>
							</li>
							<li class="input_area">
                                <label for="update-date">최종수정일자</label>
                                <input type="text" id="update-date" name="update_date" placeholder="날짜를 선택해주세요" class="datepick" data-type="date" v-model="ia.update_date">
                            </li>
						</ul>
					</div>
	                <div class="pop_btn_area">
	                    <a href="#none"class="btn_large_type02" id="btn_cancel" @click="closeIaDetailPopup">취소하기</a>
	                    <a href="#none" class="btn_large_type01" id="btn_upload" @click="updateIa">확인하기</a>
	                </div>
	            </div>
	        </div>
	    </div> <!--// end : ia 상세내용 수정 팝업    -->
	</div>
	
	
</body>
<script>
var vapp = null;

new Vue({
	el: '#v-app',
	store: _store,
	mixins: [channelMixin],
	created: function () {
		vapp = this;
		
		this.read__channels();
		this.read__loginInfo();
	},
	data: {
		iaDetailShow: false, // ia 상세보기 팝업 열기/닫기 
		ia: { // ia 상세내용 
			id: null, // 아이디
			parent: null, // 부모카테고리 id
			text: null, // 메뉴명
			link: null, // directory 경로 : [root , site_code] 제외한 경로 
			// reg_date: null, // 최초 등록일
			update_date: null, // 최종 수정일
			//sort: null, // 정렬순서
			confirm: null, // 검수상태 1: 작업중, 2: 검수요청, 3: 검수완료  
			publ: null // 퍼블상태 1: 작업중, 2: 작업완료, 3: 수정중
		},
		oldUpdateDate: null, // 기존 최종 수정일자 - 수동으로 변경한것과 비교함
		
	},
	mounted: function () {
		// 최종수정일자 달력 초기화
		$('input[name=update_date]').datepicker({
			beforeShow: function(input, inst) { 
				setTimeout(function () {
			        inst.dpDiv.css({"z-index":1000});
				});
		    },
		    // date picker 날짜 변경시 ia data 변경
		    onSelect: function(dateText, inst) {
		    	vapp.ia.update_date = dateText;
		    }
		});
	},
	computed: {
		iaPlaceHolder: function () {
			console.log(this.selectedChannel.code)
			switch(this.selectedChannel.code) {
				// 인터넷뱅킹
				case 'PB_W':
					return 'html/폴더명/파일명.html';
					break;
				case 'SB_M':
					return 'html/파일명.html';
					break;
				// 모바일웹뱅킹
				case 'PB_M':
					return '폴더명/파일명.xml';
					break;
				default: 'html/파일명.html';
			}
		}
	},
	methods: {
		// ia 상세내용 수정팝업 열기 
		openIaDetailPopup: function (iaId) {
			uijs.ajaxDef({
				url: '/ia/iadetail',
				data: {id: iaId},
				callback: function (data) {
					vapp.ia.id = data.id;
					vapp.ia.parent = data.parent;
					vapp.ia.text = data.text;
					vapp.ia.link = data.link; // html 경로
					//vapp.ia.reg_date = new Date(data.reg_date).format('yyyy-MM-dd');
					vapp.ia.update_date = vapp.ia.update_date == null ? null : new Date(data.update_date).format('yyyy-MM-dd');
					vapp.ia.confirm = data.confirm ? data.confirm : 1;
					vapp.ia.publ = data.publ ? data.publ : 1;
					
					vapp.oldUpdateDate = vapp.ia.update_date; // 
					vapp.iaDetailShow = true;
				}
			});
		},
		// ia 상세내용 수정팝업 닫기
		closeIaDetailPopup: function () {
			this.ia = {};
			this.iaDetailShow = false;
		},
		// ia 상세내용 수정팝업 딤드영역 클릭시 팝업 닫기
		closePopupFromDim: function (e) {
			if (e.target.getAttribute('class') == 'modal_layer_pop') {
				this.closeIaDetailPopup();
			}
		},
		// ia 상세화면에서 내용수정
		updateIa: function() {
			var sendParams = JSON.parse(JSON.stringify(this.ia));
			
			if (sendParams.update_date == this.oldUpdateDate) {
				sendParams.update_date = new Date(); // Date 
			}
			else {
				sendParams.update_date = new Date(this.ia.update_date);
			}
			
			uijs.ajaxDef({
				url: '/ia/update',
				data: sendParams,
				dataType: 'text',
				callback: function (data) {
					// ia 상세보기 팝업 닫기
	            	vapp.closeIaDetailPopup();
	            	
	            	// ia tree 새로고침
	            	$('#con_menu_list').jstree(true).refresh(true);
				}
			});
		}
	}
});

$(document).ready(function () {
	var menutree = $('#menutree');
	var subtree = $('#con_menu_list');
	var selectedRootNode;
	
	if (selectedRootNode == undefined) {
		$('#add-subtree-depth1').hide();
	}
	else {
		$('#add-subtree-depth1').show();
	}
	
	$('.listview').on('click', function (e) {
		location.href = '/ia/list.view';
	});

	$('#add-menu').off('click').on('click', function () {
		menutree.jstree("create_node", null, null, "last", function (node) {
            this.edit(node);
        });
	});
	
	$('#add-subtree-depth1').on('click', function () {
		subtree.jstree("create_node", selectedRootNode.id, null, "last", function (node) {
            this.edit(node);
        });
	});

	menutree
	.on('create_node.jstree', function (e, node) {
		var ref = $('#menutree').jstree(true);
		
	    uijs.iatree.addNode(node, function (data) {
	    	ref.set_id(node.node, data.id);
	    });
	})
	.on('select_node.jstree', function(event, data){
	    selectRootNode(data.node);
	})
	.on('rename_node.jstree', function (e, node) {
		if (node.text != node.old) {
			uijs.iatree.updateNode(node);
		}
	})
	.on('move_node.jstree', function(e, node) {
		if (node.parent !== node.old_parent) {
			menutree.jstree(true).refresh(true);
			return false;
		}
		else {
			uijs.iatree.updateNode(node, 'move');
		}
	})
	.on('delete_node.jstree', function(e, node) {
		console.log(node, 'delete')
		uijs.iatree.deleteNode(node);
	})
	.jstree({
	    'core': {
	    	"animation" : 0,
	    	"check_callback" : function (operation, node, node_parent, node_position, more) {
				if (operation === 'delete_node') {
					if(!confirm('관련 하위메뉴와 같이 삭제 됩니다. 삭제 하시겠습니까?')) {
                        return false;
                    }
                }
				
                return true;
			},
	    	'data': {
		     	'url': '/ia/iadata', 
		     	'data' : function (node) {
		            return {'mode': 'parent_only', 'site_code' : uijs.channel.get() };
		         }
	    	},
	    },
	    'selectListBtn': {
	    	tree: '#menutree'
	    },
	   
	    "types": {
// 	    	"#": {"max_children" : 1}
	    },
	 
	    "plugins" : [
	    	"contextmenu", "search",
	    	"state", "types", "selectListBtn", "dnd"
	    ]
	});
	
	
	// 서브ia 목록
	subtree.jstree({
		'core': {
			"check_callback" : function (operation, node, node_parent, node_position, more) {
				if (operation === 'delete_node') {
					if(!confirm('관련 하위메뉴와 같이 삭제 됩니다. 삭제 하시겠습니까?')) {
                        return false;
                    }
                }
                return true;
			}
		},
		types: {
			"default": {
				"max_children"  : -1,
		        "max_depth"     : 3,
			}
		},
		selectListBtn: {
            tree: '#con_menu_list',
            isSubtree: true
        },
        node_customize: {
            default: function(el, node) {
            	$(el).find('.jstree-anchor').css({display: 'inline-block'});
            	
            	//console.log(node.parents);
            	
	        }
        },
		'plugins': [
			'dnd',
			'selectListBtn',
			'node_customize',
			'types'
		]
	});
	
	// ia 항목 생성
	subtree.on('create_node.jstree', function (e, node) {
        var ref = subtree.jstree(true);
        
        uijs.iatree.addNode(node, function (data) {
            ref.set_id(node.node, data.id);
        });
    });
	// ia 항목이름 변경
	subtree.on('rename_node.jstree', function (e, node) {
        if (node.text != node.old) {
            uijs.iatree.updateNode(node);
        }
    });
	// ia 항목삭제
	subtree.on('delete_node.jstree', function(e, node) {
        uijs.iatree.deleteNode(node);
    });
	
	// ia 위치 변경
	subtree.on('move_node.jstree', function(e, node) {
		uijs.iatree.updateNode(node, 'move');
    });
	
	subtree.on('select_node.jstree', function(event, data){
        console.log(data)
    });
	
	// 파일업로드 버튼 클릭
	subtree.off('click.file').on('click.file', '.btn_small01.file', function () {
// 		var 
	});
	
	// html 파일 업로드
	subtree.on('change.jstree', 'input[type=file]', function (e) {
		$('#iafileForm').remove();
		var id = $(this).closest('.jstree-node').attr('id');
		var fileWrap = $(this).closest('.jstree-node').find('.attach_file');
		var fileId;
		
		if ($(this).val() != '' &&
			$(this).closest('.jstree-node').find('.delete_iafile').length) {
			
			//$(this).closest('.jstree-node').find('.delete_iafile').trigger('click.deletefile');
		}
		
		// 첨부파일 영역이 있는경우 파일아이디 설정
		if (fileWrap.length) {
			fileId = fileWrap.find('.delete_iafile').attr('data-view-id');
		}
		
        var form = $('<form/>', {
        	id: 'iafileForm'
        	, name: 'iafileForm'
        	, method: 'post'
        	, enctype: 'multipart/form-data'
        });
        var formFile = $(this).clone();
        
        formFile.appendTo(form);
        form.appendTo('body');  
        
        var formData = new FormData($('#iafileForm')[0]);

        // 첨부파일 추가
        formData = uijs.addFileData(formData);
        formData.append('id', id);
        formData.append('site_code', uijs.channel.get());
        
        // 파일아이디가 정의되어있다면 첨부된 파일 아이디
        if(fileId != undefined) formData.append('file_id', fileId);
			
        uijs.ajaxFormData({
            url: '/ia/uploadfile',
            data: formData,
            method: 'POST',
            dataType: 'json',
            anync: false,
            successCallback: function () {
            	subtree.jstree(true).refresh(true);
            }
        });
      
	});
	
	// 파일 삭제
	subtree.on('click.deletefile', '.delete_iafile', function (e) {
		var nodeId = $(this).closest('.jstree-node').attr('id');
		var node = subtree.jstree(true).get_node(nodeId);
		
		var fileId = node.original.view_id;
		
		uijs.ajaxDef({
			ajaxOption: {
				url: '/ia/delete_iafile'
                , data: {file_id: node.original.view_id}
                , method: 'POST'
                , dataType: 'text'
                , async: false 
			}
		    , callback: function (data) {
		    	console.log(data);
		    	subtree.jstree(true).refresh(true);
		    }
		})
		
		
	});
	
    
    subtree.on('focus', 'input', function () {
    	$(this).css({height: 30});
    })

    /**
     * 최상위 메뉴 선택
    */
	function selectRootNode(node) {
		var rootId = node.id;
		
		selectedRootNode = node;
		
		$('#add-subtree-depth1').show();
		
		$('.con_area').find('.tit_area').find('h2 span').text(node.text);
		
		subtree.jstree(true).settings.core.data = 
		{
	        'url': '/ia/iadata', 
	        'data' : function (node) {
              return {'parent': rootId, 'site_code' : uijs.channel.get() };
	        },
	        'success': function (data) {
	        	data.push({id: rootId, parent: '#', text: node.text})
	        }
	    };
	    
		subtree.jstree(true).refresh(true);
	    subtree.off('refresh.jstree').on('refresh.jstree', function () {
// 	    	subtree.jstree('open_node', rootId)
	    	subtree.jstree('open_all');
	    });
	} // selectRootNode()
	
	
	$('.bul_type01').click(function (){

		//subtree.jstree('destroy');
		selectRootNode(selectedRootNode);
//  		subtree.jstree(true).refresh(false);
	});
    
   
});
</script>
</html>
