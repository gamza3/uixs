<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../include/html_head.jsp" %>

</head>
<body>
	<div class="wrapper" id="v-app" v-cloak>
		<%@ include file="../include/header.jsp" %>
		<!--container-->
		<div class="container">
			<form name="work_request_form" id="work_request_form" method="post" enctype="multipart/form-data" onsubmit="return false;">
			<div class="content">
				<div class="content_inner">
					
					<div class="input_section right_type mb40" style="border-bottom:0;">
                        <ul class="input_wrap">
                            <li class="input_area search_case" style="float: left">
                            	<label for="">정렬</label>
                                <select class="selectbox" name="orderkey">
                                    <option value="regdate" selected>요청일기준</option>
                                    <option value="completedate">완료일기준</option>
                                </select>
                            </li>
                            <li style="float: left">
                            	<input type="radio" name="listsort" id="listsort_desc" style="height: 36px; margin-left: 20px" value="d" checked/>
                            	<label for="listsort_desc">최근순</label>
                                <input type="radio" name="listsort" id="listsort_asc" style="height: 36px; margin-left: 10px" value="a"/>
                            	<label for="listsort_asc">오래된순</label>
                            </li>
                        </ul>
                    </div>
                   	<div id="complete-more-popup-list-area">
                   	
                   		<div class="work_factor" style="position: relative;" v-for="(item, index) in list">
                        	<dl>
                             	<dt>
                                 	<div>ID {{item.request_id}}</div>
                                 	<ul class="work_label">
										<li><a href="#none" class="work_label04">작업완료</a></li>
									</ul>
                                 	<a href="#" class="history-detail" :id="item.request_id">{{item.request_title}}</a>
                             	</dt>
                             	<dd>
                                 	<div class="work_area">
                                     {{item.request_content}}
                                 	</div>
                                 	<p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; left: 100px; top: 10px;">
                                 	{{(new Date(item.regdate)).format('yyyy.MM.dd')}}
                                 	</p>
                             	</dd>
                         	</dl>
                     	</div>
                        
                    </div>
                    <div class="btn_more_area">
                    	<a href="#none" class="btn-more-view" @click="getListMore">더보기</a>
					</div>
					
				</div>
			</div>
			</form>
		</div>
		<!--// container-->
	</div>
	

	
	<script type="text/javascript">
    var vapp = null;
    new Vue({
    	el: '#v-app',
    	mixins: [channelMixin],
    	data: {
    		list: [],
    		page: 1, 
    		start: 1, 
    		limit: 10
    	},
    	created: function (){
    		vapp = this;
    		
    		this.getCompleteList();
    	},
    	watch: {
    		page: function () {
    			this.getCompleteList();
    		}
    	},
    	methods: {
    		getCompleteList: function () {
    			uijs.ajaxDef({
    				url: '/work/complete_list'
    				, data: {
    					site_code: this.getChannelCode()
    					, start: this.start
    					, limit: this.limit
    					, orderkey: 'regdate'
    					, listsort: 'd'
    				}
    				, method: 'GET'
    				, dataType: 'json'
    				, callback: function (data) {
    					if (!data.length) {
//     						vapp.page -= 1;
    						alert('더이상 없습니다.');
    					}
    					else {
	    					vapp.list.push(...data);
    					}
    				}
    			})
    		},
    		getListMore: function () {
    			this.page += 1;
    			this.start = ((this.page-1) * this.limit) + 1;
    		}
    	}
    })
    </script>

</body>

</html>
