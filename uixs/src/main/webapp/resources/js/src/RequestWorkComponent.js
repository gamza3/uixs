/**
 * 작업요청 관련 컨퍼넌트
 */
function RequestWorkDetail() {
	return {
		template: `
		<div class="modal_layer_pop work_type" id="vue-popup" @click="closeWithDim" v-if="active">
			<div class="modal_layer_inner" style="background:#fff">
				<div class="pop_tit"><a href="#none" class="btn_pop_close" title="레이어팝업 닫기" @click="popupClose"></a></div>
					<div class="pop_content" style="height: 750px;">
						<ul class="work_temp">
							<li class="cont">
								<div class="work_factor">
									<dl>
										<dt>
											<div>{{requestId}}</div>
											<a href="#none">{{compuUsernameContent}}</a>
										</dt>
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
                    		</li>
                    	</ul>
					</div>
				</div>
			</div>
		</div>
		`,
		mixins: [channelMixin],
		props: ['requestId'],
		data: function (){
			return {
				dateEditMode: false,
				workRequestData: {},
				requestIaList: null,
				requestIaPath: [],
				files: [],
				endDate: '',
				requestState: 'WORKING',
				cancelContent: '',
				active: false,
			}
		},
		created: function () {
			this.loading('start');
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
			},
		},
		mounted: function () {
			var app = this;
			
			this.getData().then(function (data) {
				app.workRequestData = data.REQUEST_WORK;
				app.files = data.FILES;
				
				if (data.REQUEST_IA_LIST) {
					app.requestIaPath = app.getMenuPathString(data.REQUEST_IA_LIST);
				}
				
				app.endDate = new Date(app.workRequestData.end_date).format('yyyy-MM-dd');
				//app.requestState = app.workRequestData.request_state;
				
				app.loading('stop');
				
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
				var url = '/work/request_list/detail?ref_table=REQUEST_LIST&ref_id='+this.requestId;
				
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
				this.$emit('close');
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
				
				if (this.loginInfo.auth !== 'WORKER' && this.loginInfo.auth != 'ADMIN' ) {
					alert('작업자 또는 관리자 권한이 아닙니다.');
					return false;
				}
				
				var request_state = this.requestState;
				var cancel_content = this.cancelContent;
				
				var sendData = {
					"request_id": this.requestId,
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
						EventBus.$emit('loadList', ['request', 'process']);
						
						app.popupClose();
					}
				});
			}
		}//end component
	}//end return
};