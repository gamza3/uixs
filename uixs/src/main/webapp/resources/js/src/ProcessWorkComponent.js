var processWorkListTemplate = `
<dl>
	<dt>
		<p>작업진행내역
		<select class="selectbox" v-model="searchKey" @change="listSearch" name="" id="" style="height: 40px; width: 120px; background: #fff url(/resources/img/ico_select_arrow1.png) no-repeat right 15px top 50%;">
			<option value="">전체보기</option>
			<option value="PLAN">기획</option>
			<option value="DESIGN">디자인</option>
			<option value="PUBLISH">퍼블</option>
		</select>
		</p>
		<span class="list-count">{{selectedList.length}}건</span>
	</dt>
	<dd>
	    <div class="work_factor working" v-for="(item, index) in selectedList">
	        <dl>
	            <dt>
	                <div>ID {{item.REQUEST_ID}}</div>
	                <a href="#none" @click="openDetail(item.REQUEST_ID)">{{item.REQUEST_TITLE}}</a>
	            </dt>
	            <dd>
	                <div class="work_area" v-html="getReplaceContent(item.REQUEST_CONTENT)"></div>
	                <div class="date_area">
	                    <span>~ {{new Date(item.END_DATE).format('yyyy.MM.dd')}} 까지</span>
	                </div>
	                <div class="state_step_area">
	                    <span class="step01" style="background: #eb5a46" v-if="item.PART == 'PUBLISH' && item.PUBLISH == 'CONFIRM_COMPLETE'">
	                    	{{partName[item.PART]}} : 검수완료
	                    </span>
	                    <span class="step01" 
	                    	:style="{background: item[item.PART] == 'CONFIRM_REQUEST' && '#0565f0'}" v-else>
						{{partName[item.PART]}}
						{{
							item[item.PART] == 'CONFIRM_REQUEST' ? 
							': 검수요청' : ''
						}}
	                    </span>
	                </div>
	            </dd>
	        </dl>
	    </div>
	</dd>
</dl>
`;

var ProcessWorkList = {
    template: processWorkListTemplate,
    mixins:[channelMixin],
    props: ['propList'],
    data: function () {
        return {
            list: this.propList,
            selectedList: this.propList,
            partName: {
                "PLAN": '기획'
                , "DESIGN": '디자인'
                , "PUBLISH": '퍼블'
            },
            searchKey: ''
        }
    },
    mounted: function () {
    },
    computed: {
	},
    watch: {
    },
    methods: {
		getReplaceContent: function (str) {
			return str.replace(/\r\n/g, '<br>');
		},
        openDetail: function (id) {
			//uijs.processWork.detailPopup(id);
			this.$emit('show-detail', id);
		},
		listSearch: function () {
			var app = this;
			
			if (this.searchKey == '') {
				this.selectedList = this.list;
			}
			else {
				this.selectedList = this.list.filter(function (item) {
					return app.searchKey == item.PART;
				});
			}
		}
    }
};
// ==============================================


/**
 * 진행중인작업 상세보기 팝업
 */
const ProcessWorkDetail = function() {
	/**
	 * start: 진행중인작업 상세보기 팝업 - 요청작성 상태 템플릿
	 */
	var PartStateTemplate = 
	`<li 
		:class="stateAttr.class + ' part-state'" 
		:data-state="state" 
		:data-part="part.toUpperCase()">
		<span class="part-title">{{partList[part]}}</span>
	    <div class="work_step_check">
	    	<input type="checkbox" class="request-confirm" :id="detailData.request_id + part" v-model="stateAttr.check" @change.prevent="confirmRequest"/>
	    	<label :for="detailData.request_id + part">{{stateAttr.text}}</label>
	        <em class="sdate" v-if="confirmRequestDate">{{confirmRequestDate}}</em>
	        <em class="edate" v-if="confirmCompleteDate">{{confirmCompleteDate}}</em>
	        <button type="button" class="btn_confirm on btn_show_confirm_panel" v-show="confirmBtn" @click="confirmAction = true"></button>
	    </div>
		<div class="edit_pop" style="top: 125px;" v-show="confirmAction" >
	    	<div class="edit_tit">
	        	검수확인
	        	<a href="#none" class="btn_edit_close" title="레이어팝업닫기" @click="confirmAction = false"></a>
	    	</div>
	    	<div class="edit_data">
	    		<ul class="box_type_check">
	    			<li>
	    				<input type="radio" 
	    					:id="'state1_'+detailKey" 
	    					:name="'state_'+detailKey" 
	    					value="CONFIRM_COMPLETE" 
	    					v-model="confirmResult"
	    					@change="confirmOrEdit">
	    				<label :for="'state1_'+detailKey" class="btn-confirm-ok" style="cursor: pointer">검수확인</label>
	    			</li>
	    			<li>
	    				<input type="radio" 
	    					:id="'state_2'+detailKey" 
	    					:name="'state_'+detailKey" 
	    					value="WORKING" 
	    					v-model="confirmResult"
	    					@change="confirmOrEdit">
	    				<label :for="'state_2'+detailKey" class="btn-request-edit" style="cursor: pointer">수정요청</label>
	    			</li>
	    		</ul>
	    	</div>
		</div>
	</li>`; //end: 진행중인작업 상세보기 팝업 - 요청작성 상태 템플릿
	
	/**
	 * start: 진행중인작업 상세보기 팝업 - 요청작성 상태 컴포넌트
	 */
	var PartStateComponent = {
		template: PartStateTemplate,
		mixins: [channelMixin],
		props: ['part', 'detailData'],
		data: function () {
			return {
				partList: {
					plan: "기획", 
					design: "디자인",
					publish: '퍼블'
				},
				// 작업상태별 속성
				stateItems: {
					"PENDING": {
						"text": '검수요청',
						"class": '',
						"check": false
					}, 
					"WORKING": {
						"text": '검수요청', 
						"class": 'ing', 
						"check": false
					}, 
					"CONFIRM_REQUEST": {
						"text": '검수요청', 
						"class": 'ing', 
						"check": true
					}, 
					"CONFIRM_COMPLETE": {
						"text": '검수완료', 
						"class": 'end', 
						"check": true
					}
				},
				nowPart: this.detailData.part, // 진행중인 작업파트
				state: this.detailData[this.part], // 작업상태
				confirmAction: false, // 검수요청시 - 검수 팝업열기
				confirmResult: '', // 검수결과
				// confirmBtn: false, // 검수완료 및 수정 판넬 열기 버튼
			}
		},
		computed: {
			// 작업 상태별 속성
			stateAttr: function () {
				return this.stateItems[this.state];
			},
			// 검수요청일자
			confirmRequestDate: function() {
				return (
					this.detailData[this.part+'_req_sdate'] == null ?
					'' :
					new Date(this.detailData[this.part+'_req_sdate']).format('yyyy.MM.dd')
				);
			},
			// 검수완료 일자
			confirmCompleteDate: function () {
				return (
					(this.state == 'CONFIRM_COMPLETE' && this.detailData[this.part+'_req_sdate'] != null) ?
					new Date(this.detailData[this.part+'_req_edate']).format('yyyy.MM.dd') :
					''
				);
			},
			// html 요소에 쓰이는 공통키
			detailKey: function () {
				return this.detailData.request_id + this.part;
			},
			// 검수작업 창열기 버튼 - 상태에 따라 보임 또는 안보임
			confirmBtn: function () {
				var ret = false;
				
				switch(this.state) {
					case 'CONFIRM_REQUEST':
						ret =  true;
						break;
					default: ret = false;
				}
				
				return ret;
			}
		},
		methods: {
			// 검수요청
			confirmRequest: async function (e) {
				var logininfo = this.loginInfo;
				
				if (logininfo.auth != 'WORKER' && logininfo.auth != 'ADMIN') {
					alert('요청 권한이 없습니다.');
					
					this.stateAttr.check = false;
					
					return false;
				}
				
				var sendData = {
					work_id: this.detailData.work_id,
					request_id: this.detailData.request_id,
					part: this.part.toUpperCase()
				};
							
				// 검수요청 일자
				var confirmRequestDate = new Date();
							
				// 요청 파트의 상태 검수요청으로 변경
				sendData[this.part] = 'CONFIRM_REQUEST';
				// 요청 파트의 검수요청일자 수정
				sendData[this.part+'_req_sdate'] = confirmRequestDate;
						
				if (this.stateAttr.check == true && this.state == 'WORKING') {
					
					if (this.stateAttr.class == 'ing') {
						
						uijs.ajaxDef({
							ajaxOption: {
								url: '/work/work_list/detail/update_state',
								data: sendData,
								method: 'POST',
								dataType: 'json',
								async: true
							},
							
							callback: function(data) {
								returnData = data;
								
								/*
								uijs.sendMsg({
									receiver_auth: 'MANAGER'
									, content: workData.request_id +': '+ part[nowPart]+' 검수요청이 있습니다.'
									, sender_id: uijs.logininfo.get('userid')
								});
								*/
								// 리스트 다시로드
								EventBus.$emit('loadList', ['process']);
								// 데이터 다시로드
								EventBus.$emit('read__data');
								// 작업요청 갯수 다시로드
								EventBus.$emit('setConfirmCount');
								
								// 검수요청완료 메세지 팝업
								alert('검수요청이 완료 되었습니다.');
							}
						});
						
					} 
					else {
						return;
					}
				}
				else {
					this.stateAttr.check = true;
				}
			}, // end: 검수요청
			// start : 검수 or 수정요청
			confirmOrEdit: async function () {
				var logininfo = this.loginInfo;
				
				if (logininfo.auth != 'MANAGER' && logininfo.auth != 'ADMIN') {
					alert('검수 권한이 없습니다.');
					
					this.stateAttr.check = false;
					
					return false;
				}
				
				if (this.stateAttr.check) {
					var nextPart;
					var partArray = Object.keys(this.partList);
					
					// 다음작업 1
					for(var index in partArray) {
						var nextIndex = parseInt(index) + 1;
						
						if (nextIndex > partArray.length) break;
						
						if (this.part == partArray[index]) {
							nextPart = partArray[nextIndex];
							break;
						}
					}
					
					// 검수요청 전송 데이터
					var sendData = {
						work_id: this.detailData.work_id,
						request_id: this.detailData.request_id,
					};
					
					// 검수완료 날짜
					var confirmCompleteDate = new Date();
					
					// 현재파트의 검수데이터가 검수 완료인경우 데이터의 PART 를 다음 작업파트로 변경
					if (this.confirmResult == 'CONFIRM_COMPLETE') {
						
						// 다음 작업 파트가 없는경우
						if (nextPart === undefined) {
							sendData.part = this.part.toUpperCase();
						}
						// 다음 작업파트가 있는경우
						else {
							sendData.part = nextPart.toUpperCase();
							// 다음파트 작업상태를 working 으로 변경
							sendData[nextPart] = 'WORKING';
						}
						// 현재작업의 검수완료 날짜 삽입
						sendData[this.part+'_req_edate'] = confirmCompleteDate;
					}
					// 검수완료가 아닌경우 = 수정요청
					else {
						sendData.part = this.part.toUpperCase();
					}
					// 현재파트 작업상태 변경 CONFIRM_REQUESR or CONFIRM_COMPLETE
					sendData[this.part] = this.confirmResult;
					
					if (this.state == 'CONFIRM_REQUEST') {
						uijs.ajaxDef({
							url: '/work/work_list/detail/update_state',
							data: sendData,
							method: 'POST',
							dataType: 'json',
							async: true,
							callback: function () {
								EventBus.$emit('read__data');
								
								// 작업내역 다시 검색
								EventBus.$emit('loadList', ['process']);
							}
						}); // end: ajax
					} // end: if
				} // end : if
			}, // end: 검수 - 수정요청
		}
	};//end: 진행중인작업 상세보기 팝업 - 요청작성 상태 컴포넌트

	
	
	/**
	 * start: 댓글 컴포넌트
	 */
	const CommentComponent = function () {
		// 글쓰기 영역 컴포넌트
		const WriteComponent = function () {
			var WriteTmp = `
			<div class="work_form">
			    <form ref="form" name="comment_form" id="comment_form" method="post" enctype="multipart/form-data" onsubmit="return false;">
			        <select class="selectbox" name="writer_type" v-model="form.writerType">
			            <option value="MN">담당자</option>
			            <option value="PN">기획</option>
			            <option value="DS">디자인</option>
			            <option value="PB">퍼블</option>
			        </select>
			        <div class="coment_box">
			            <textarea placeholder="내용을 입력해주세요" name="content" v-model="form.content" ref="content"></textarea>
			            <div class="btn_coment">
			            	<div class="file_info_area">
			            		<span class="file-info"></span>
			            		<p class="file_info" v-for="(file, index) in savedFiles" :key="file.original_filename">
			            			<span>{{file.original_filename}}</span>
			            			<a href="#" class="btn_inline_delete" @click="deleteFile(index, file.file_id)"></a>
			            		</p>
			            		<p class="file_info" v-for="(file, index) in form.files" :key="file.name + '_' + index">
			            			<span>{{file.name}}</span>
			            			<a href="#" class="btn_inline_delete" @click="deleteFile(index)"></a>
			            		</p>
			            	</div>
			            	<div class="comment_btn_area" v-if="!isCompleteWork">
			                	<a href="#none" class="btn_small01" style="position: relative">파일업로드+
			                		<input 
			                			type="file" 
			                			id="cfile" 
			                			name="cfile"
			                			@change="addFile" 
			                			style="opacity: 0; width: 100%; position: absolute; left:0; top: 0">
			                	</a>
			                    <a href="#none" class="btn_small02 btn-regist" @click.prevent="comment__insert">{{registBtnText}}</a>
			                    <a href="#none" class="btn_small01 btn-regist" v-if="mode=='edit'" @click.prevent="cancelEdit">취소</a>
			                </div>
			            </div>
			        </div>
			    </form>
			</div>
			`;
			// return comment WriteComponent
			return {
				template: WriteTmp,
				mixins: [channelMixin],
				props: ['workId', 'mode', 'editItem', 'logininfo'],
				data: function () {
					return {
						form: {
							content: '',
							ref: 'WORK_LIST',
							refId: this.workId,
							writerType: 'MN',
							files: []
						},
						savedFiles: [],
						registBtnText: '등록',
					};
				},
				created: function () {
					if (this.mode == 'edit') {
						this.form.content = this.editItem.CONTENT;
						this.form.writeType = this.editItem.WRITE_TYPE;
						this.savedFiles = this.editItem.FILES;
						
						this.registBtnText = '수정';
					}
				},
				mounted: function () {
					if (this.mode == 'edit') this.$refs.content.focus();
					
					switch(this.logininfo.part) {
						case 'PLAN':
							this.form.writerType = 'PN';
							break;
						case 'DESIGN':
							this.form.writerType = 'DS';
							break;
						case 'PUBLISH':
							this.form.writerType = 'PB';
							break;
						default: this.form.writerType = 'MN';
					}
				},
				computed: {
					isCompleteWork: function () {
						return this.$store.getters['workStore/getWorkDetailOpener'] == 'complete' ? true : false;
					}
				},
				methods: {
					// 댓글 등록 and 수정
					comment__insert: async function () {
						var _this = this;
						var url = '/cmt/insert';
						
						if (this.form.content.replace(/\s/g, '') == '') {
							alert('내용을 입력해 주세요');
							this.$refs.content.focus();
							return;
						}
						
						var sendFormData = new FormData();
						
						sendFormData.append('writer', this.logininfo.userid);
						sendFormData.append('writer_type', this.form.writerType);
						sendFormData.append('ref', this.form.ref);
						sendFormData.append('ref_id', this.form.refId);
						sendFormData.append('content', this.form.content);
						// 파일 삽입
						this.form.files.forEach(function (file) {
							sendFormData.append('files', file);
						});
						
						// 수정인 경우는 url변경과 댓글 번호 전달
						if (this.mode == 'edit') {
							url = '/cmt/update_cmt';
							sendFormData.append('cmt_no', this.editItem.CMT_NO);
						}
						
						_this.loading('start');
						
						// 댓글 등록 action
						$.ajax({
							type: 'POST',
							url: url,
							data: sendFormData,
							dataType: 'json',
							processData: false,
							contentType: false,
						})
						.done(function (data) {
							if (data.insertid || data.updateCnt) {
								_this.$emit('edit-cancel');
								_this.$emit('list-read');
								
								// 작업중인 목록 다시로드
								// EventBus.$emit('loadList', ['process']);
							}
						})
						.fail(function () {
							//_this.loading('stop');
						})
						.always(function () {
							_this.loading('stop');
						});
					}, // end regist
					/** start: add 파일 */
					addFile: function (e) {
						this.form.files.push(e.target.files[0]);
					},// end: add 파일
					
					/** start: del 파일 */
					deleteFile: function (index, fileId=null) {
						var app = this;
						
						if (!fileId) {
							this.form.files.splice(index, 1);
						}
						// fileId 가 있으면 edit 모드임
						else {
							if (confirm('파일을 삭제 하시겠습니까?')) {
								uijs.ajaxDef({
									url: '/cmt/delete_file'
					                , data: {file_id: fileId}
					                , method: 'POST'
					                , dataType: 'text'
					                , async: true 
								    , callback: function (data) {
										if (data == 'SUCCESS') {
											app.savedFiles.splice(index, 1);
										}
								    }
								});
							}//end: confirm
						} //end edit mode if
					},// end: del 파일
					/**start: 수정 취소 */
					cancelEdit: function () {
						this.$emit('edit-cancel');
					}//end: 수정 취소
				}//end: methods
			}
		}();
		
		// 댓글 목록 컴포넌트
		const ListComponent = function() {
			return {
				template: `
				<li class="list" :key="commentKey">
	                <div class="work_member">
	                    <span 
	                    	class="mem" 
	                    	:style="v.WRITER_TYPE == 'MN' ? 'color: #fff; background: #00a684': ''">
	                    	{{writerType[v.WRITER_TYPE]}}
	                    </span>
	                </div>
	                <div class="work_text">
	                    <p>{{v.USERNAME}}</p>
	                    <em>{{new Date(v.REGDATE).toLocaleString()}}</em>
	                    <div class="data" style="position: relative" v-html="content">
	                    </div>
	                    <div class="plus_file" v-for="file in v.FILES">
	                    	<a :href="'/file/download?file_id='+file.file_id" class="btn_text down">{{file.original_filename}}</a>
	                	</div>
	                </div>
					<div style="text-align: right; margin-top: 10px;" v-if="logininfo.userid === v.WRITER && !isCompleteWork">
	                    <a href="#" class="btn_small01 edit" @click.prevent="editComment">수정</a>
	                    <a href="#" class="btn_small01 delete" @click.prevent="comment__delete">삭제</a>
	                </div>
	            </li>
	            `,
                mixins: [channelMixin],
                props: [
					'v', 
                	'logininfo', 
                	'commentKey',
                	'index'
                ],
	        	data: function () {
					return {
						writerType: {
							'MN': '담당자',
							'PN': '기획자',
							'DS': '디자인',
							'PB': '퍼블'
						}
					};
				},
				watch: {
				},
				computed: {
					content: function () {
						return this.v.CONTENT.replace(/\r\n/g, '<br>');
					},
					isCompleteWork: function () {
						return this.$store.getters['workStore/getWorkDetailOpener'] == 'complete' ? true : false;
					}
				},
				methods: {
					/** start: 댓글 삭제 */
					comment__delete: function () {
						var app = this;
						
						if (confirm('삭제 하시겠습니까?')) {
							uijs.ajaxDef({
								url: '/cmt/delete.data'
								, data: {'cmt_no': app.v.CMT_NO}
								, dataType: 'text'
								, callback: function (data) {
									app.$emit('remove-comment-item', app.index);
								}
							});
						}
						else {
							return false;
						}
					},// end: 댓글 삭제
					editComment: function () {
						this.$emit('edit-comment', this.v);
					}
				}
			};//end: return
		}()// end ListComponent function
		
		
		
		/**
		 * start: 댓글 목록 컴포넌트 템플릿
		 */
		const CommentComponentTmp = `
		<ul>
		    <li class="write">
		    	<WriteComponent 
		    		:work-id="workId" 
		    		:mode="writeMode" 
		    		:edit-item="editItem"
		    		:logininfo="logininfo"
		    		:key="writeKey"
		    		@edit-cancel="editCancel"
		    		@list-read="list__read"
		    		v-if="logininfo"></WriteComponent>
		    </li>
	    	<ListComponent 
	    		:comment-key="commentKey"
	    		:key="v.CMT_NO"
	    		:v="v" 
	    		:index="index"
	    		:logininfo="logininfo"
	    		v-for="(v, index) in commentList"
	    		@edit-comment="editComment"
	    		@remove-comment-item="removeCommentItem"
	    		v-if="logininfo"></ListComponent>
		</ul>
		`;
	
		return {
			template: CommentComponentTmp,
			props: ['workId'],
			components: {
				'WriteComponent': WriteComponent,
				'ListComponent': ListComponent,
			},
			mixins: [channelMixin],
			data: function (){
				return {
					commentList: [],
					commentKey: 0,
					writeKey: 0,
					editItem: {},
					writeMode: 'write',
					logininfo: null
				};
			},
			created: function () {
				this.logininfo = this.loginInfo;
				
				this.list__read();
			},
			methods: {
				list__read: function () {
					var _this = this;
					
					_this.loading('start');
					
					$.ajax({
						url: '/cmt/list',
						data: {ref: 'WORK_LIST', ref_id: this.workId},
						dataType: 'json',
						method: 'GET'
					})
					.done(function (data) {
						_this.commentList = data;
						
						_this.commentKey += 1;
					})
					.fail(function () {
//						_this.loading('stop');
					})
					.always(function () {
						_this.loading('stop');
					});
				},
				removeCommentItem: function (index) {
					this.commentList.splice(index, 1);
				},
				editComment: function (item) {
					this.editItem = item;
					this.writeMode = 'edit';
					
					this.writeKey += 1;
				},
				editCancel: function () {
					this.writeMode = 'write';
					
					this.writeKey += 1;
				}
			}
		}
	}();
	//end: 댓글 컴포넌트
	
	/**
	 * 진행중인작업 상세보기 팝업 템플릿
	 */
	const ProcessDetailTemplate = `
	<div class="modal_layer_pop work_type"  @click="closeFromDim" v-cloak v-if="isShow">
		<div class="modal_layer_inner" style="background:#fff">
			<div class="pop_tit"><a href="#none" class="btn_pop_close" title="레이어팝업 닫기" @click="closeDetail"></a></div>
			<div class="pop_content" style="height: 750px;">
				<ul class="work_temp">
		            <li class="cont">
		                <div class="work_factor">
		                    <dl>
		                        <dt>
		                            <div>ID {{requestId}}</div>
		                            <a href="#none">{{detailData.username && '['+detailData.username+']'}} {{detailData.request_title}}</a>
		                        </dt>
		                        <dd>
		                            <div class="work_area" v-html="detailContent"></div>
		                            <div class="work_section">
		                                <div class="work_menu_list">
		                                    <p>화면목록</p>
		                                    <ul>
		        								{{iaPath.length ? iaPath : '없음'}}  
		                                    </ul>
		                                </div>
		                                <div class="sec_02">
		                                    <p>작업일정</p>
		                                    <div class="work_day" v-if="!dateEditMode" @click="dateEdit">
                                                <span>~ {{new Date(detailData.end_date).format('yyyy-MM-dd')}} 까지</span>
                                           	</div>
                    						<div class="work_day" style="display:flex;align-content:center;padding:4px" v-else>
	                                           	<input v-model="endDate" ref="dateInput"/>
	                    						<button type="button" class="btn_small01  mr4" @click="edit__date">수정</button>
	                    						<button type="button" class="btn_small01  mr4" @click="cancelEditDate">취소</button>
                                           	</div>
		                                </div>
		                            </div> 
		                            <div class="work_file">
										<p>첨부파일</p>
										<ul class="mt20">
					                        <li v-for="file in uploadFiles" :key="file.file_id">
				                               <strong>{{file.original_filename}}</strong>
				                               <a :href="'/file/download?file_id='+file.file_id" class="btn_text down">다운로드</a>
				                            </li>
										</ul>
									</div>
		                        </dd>
		                    </dl>
		        		</div>
	                  	<div class="work_step_area">
	        				<div class="work_part">
		        				<div class="btn_area">
		                            <a href="#none" 
		                            	class="btn_small01 btn-all-confirm-cancel" 
		                            	v-show="!workCompleted"
		                            	@click.prevent="allConfirmCancel">전체검수취소</a>
		                        </div>
					           	<ul>
						           	<li class="end fix">
							           <span>업무요건</span>
							           <div class="mt10">
							           		<button type="button" class="btn_small01 active on">수용완료</button>
							           </div>
							           <em style="display: block">({{new Date(detailData.response_date).format('yyyy.MM.dd')}})</em>
						           	</li>
						           	
						           	<!--start: 파트별 작업 진행 상태-->
						           	<PartStateLi 
						           		v-for="part in partItems"
						           		:part="part" 
						           		:detail-data="detailData" 
						           		:key="partStateComponentKey + '_'+part"></PartStateLi>
						           	<!--//end: 파트별 작업 진행 상태-->
						           	
						           	<li class="fix" :class="{'end': workCompleted}">
							           <span>작업완료</span>
							           <div class="mt10">
								           <button 
								           	type="button" 
								           	class="btn_small01 active btn-complete-confirm" 
								           	:class="{'on': workCompleted}"
								           	v-show="confirmCompleteAll"
								           	@click="setWorkComplete">완료확인</button>
							           </div>
						           	</li>
					           	</ul>
				           	</div>
				        </div>
						<div class="active_txt">
				           <div class="work_message">
				           		<p>작업내역</p>
				           		<!--start: 댓글 컴포넌트-->
				           		<CommentComponent 
				           			v-if="Object.keys(detailData).length" 
				           			:work-id="detailData.work_id"></CommentComponent>
				           </div>
				        </div>
		            </li>
		        </ul>
			</div>
		</div>
	</div>
	`;
	
	return {
		template: ProcessDetailTemplate,
		mixins:[channelMixin],
		components: {
			// 파트별 작업상태 컴퍼넌트
			'PartStateLi': PartStateComponent,
			'CommentComponent': CommentComponent
		},
		props: ['requestId', 'opener'],
		data: function () {
			return {
				detailData: {}, // 상세내용 
				uploadFiles: [], // 첨부파일
				iaPath: [], // ia 경로
				isShow: false, 
				partStateComponentKey: 0, // 컴퍼넌트 reload key
				confirmCompleteAll: false, // 전체파트의 작업 검수결과
				partItems: ['plan', 'design', 'publish'], // 파트 목록 
				dateEditMode: false,
				endDate: '',
			}
		},
		created: function () {
			// 초기 상세데이터 read
			this.read__data();
			// 이벤트 버스 등록
			EventBus.$on('read__data', this.read__data);
		},
		computed: {
			// 상세내용 줄바꿈 처리
			detailContent: function () {
				if (this.detailData.request_content) {
					return this.detailData.request_content.replace(/\r\n/g, '<br/>');
				}
				else {
					return '';
				}
			},
			// 요청작업의 처리상태
			workCompleted: function () {
				return this.detailData.request_state == 'COMPLETE';
			}
		},
		methods: {
			// 팝업의 딤드영역 클릭시 팝업 닫힘 설정
			closeFromDim: function (e) {
				if (e.target.classList[0] == 'modal_layer_pop') {
					this.closeDetail();
				}
			},
			// 팝업 닫기
			closeDetail: function () {
				this.$emit('close-detail');
			},
			// 상세데이터 조회
			read__data: function () {
				var _this = this;
				
				// loading 시작
				this.loading('start');
				
				$.ajax({
					url: "/work/work_list/detail?ref_table=WORK_LIST&ref_id="+this.requestId,
					method: 'GET',
					dataType: 'json'
				})
				.done(function (data) {
					_this.detailData = data.REQUEST_WORK;
					_this.uploadFiles = data.FILES;
					if (data.REQUEST_IA_LIST) {
						_this.iaFath = _this.getMenuPathString(data.REQUEST_IA_LIST);
					}
					// 종료일 수정을위한 임시 종료일 설정
					_this.endDate = new Date(_this.detailData.end_date).format('yyyy-MM-dd');
					
					// 전체작업완료 버튼 노출 여부
					if(_this.detailData.plan == 'CONFIRM_COMPLETE' && 
					_this.detailData.design == 'CONFIRM_COMPLETE' &&
					_this.detailData.publish == 'CONFIRM_COMPLETE') {
						_this.confirmCompleteAll = true;
					}
					else {
						_this.confirmCompleteAll= false;
					} 
					
					// 상세보기 팝업 컴퍼넌트 키값 증가
					_this.partStateComponentKey += 1;
					// 팝업 보이기
					_this.isShow = true;
				})			
				.always(function () {
					// loading 종료
					_this.loading('stop');
				});
			},
			
			// 검수된 작업 전체 검수취소 취소
			allConfirmCancel: async function () {
						
				var logininfo = this.loginInfo;
				
				if (logininfo.auth != 'MANAGER' && logininfo.auth != 'ADMIN') {
					alert('검수취소 권한이 없습니다.');
					return false;
				}
	
				var sendData = {
					"work_id": this.detailData.work_id
					, "request_id": this.detailData.request_id
					, "part": 'PLAN'
					, "plan": 'WORKING'
					, "design": 'PENDING'
					, "publish": 'PENDING'
				};
				
				uijs.ajaxDef({
					url: '/work/work_list/detail/update_state',
					data: sendData,
					callback: function(data) {
						EventBus.$emit('read__data');
						EventBus.$emit('loadList');
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
			},// end: allConfirmCancel - 검수된 작업 전체 검수취소 취소
			
			// start: 전체작업 완료 설정
			setWorkComplete: function () {
				// 작업이 완료된 요청인 경우 누를수없음
				if (this.workCompleted) return;
				
				var _this = this;
				
				var sendData = {
					"request_id": this.detailData.request_id
					, "request_state": 'COMPLETE'
					, "complete_date": new Date()
				};
				
				uijs.ajaxDef({
					url: '/work/request_list/detail/change_state'
					, data: sendData
					, callback: function () {
						// 작업 리스트 전체 다시 로드
						EventBus.$emit('loadList');
						// 상세보기 팝업 닫기
						_this.$emit('close-detail');
					}
				});
			},
			// end: setWorkComplete - 전체작업 완료 설정
			// 협의에 의한 날짜조정
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
			}, //end : dateEdit
			cancelEditDate: function () {
				this.dateEditMode = false;
				this.endDate = new Date(this.detailData.end_date).format('yyyy-MM-dd');
			}, //end: cancelEditDate
			//종료일 데이터 수정
			edit__date: function () {
				var app = this;
				var sendData = new FormData();
				
				sendData.append('request_id', this.detailData.request_id);
				sendData.append('request_state', this.detailData.request_state);
				sendData.append('end_date', new Date(this.endDate));
				
				uijs.ajaxFormData({
					url: '/work/request_list/detail/change_state',
					data: sendData,
					successCallback: function (data) {
						app.dateEditMode = false;
					},
					errorCallback: function (error) {
						app.dateEditMode = false;
					}
				});
			}, //end: edit__date
		}
	};
}();




