function Popup() {
    this.iaFileUpload = function(){
        return (
            $(`
            <div class="modal_layer_pop">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <h1>IA파일 업로드</h1>
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <div class="complete_area file_up">
                            <dl>
                                <dt class="msg-area">파일을 업로드 하시겠습니까?</dt>
                                <dd>
                                    <div class="grey_list_type">
                                        <ul class="list_type01">
                                            <li>
                                                <dl>
                                                    <dt>파일명</dt>
                                                    <dd>IA_구조도_v1.1.xlsx</dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                        <div class="pop_btn_area">
                            <a href="#none" class="btn_large_type02">취소하기</a>
                            <a href="#none" class="btn_large_type01 btn-confirm">확인하기</a>
                            <a href="#none" class="btn_large_type01" id="btn-complete-upload" style="display:none">확인하기</a>
                        </div>
                    </div>
                </div>
            </div>`
            )
        );
    };

    this.iaMenuAdd = function () {
        return (
            $(`
            <div class="modal_layer_pop">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <h1>IA 메뉴수정</h1>
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <div class="pop_txt_area">
                            <p>선택하신 메뉴의 하위 메뉴 또는 내역을 추가하실 수 있습니다.</p>
                        </div>
                        <div class="input_section btn_type">
                            <ul class="input_wrap">
                                <li class="input_area ">
                                    <label for="">하위메뉴 or 항목추가</label>
                                    <input type="text" placeholder="하위메뉴 or 하위항목을 입력해주세요">
                                </li>
                            </ul>
                            <div>
                                <button type="button" class="btn_file_plus">추가하기</button>
                            </div>
                        </div>
                        
                        <div class="pop_btn_area">
                            <a href="#none" class="btn_large_type02">취소하기</a>
                            <a href="#none" class="btn_large_type01">확인하기</a>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    }

    this.iaMenuAddComplete = function () {
        return (
            $(`
            <div class="modal_layer_pop">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <h1>IA 메뉴추가</h1>
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <div class="complete_area">
                            <dl>
                                <dt>메뉴추가가 완료되었습니다.</dt>
                                <dd>
                                    <div class="grey_list_type">
                                        <ul class="list_type01">
                                            <li>
                                                <dl>
                                                    <dt>추가메뉴</dt>
                                                    <dd>이체&gt;다계좌이체&gt;3단계 - 사용자인증확인
                                                        <strong>화면ID <em>trns010100</em></strong>
                                                    </dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                        <div class="pop_btn_area">
                            <a href="#none" class="btn_large_type01">확인하기</a>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    }

    this.iaMenuModify = function(){
        function getDon() {

        };

        return (
            $(`
            <div class="modal_layer_pop">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <h1>IA 메뉴수정</h1>
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <div class="pop_txt_area">
                            <p>원하시는 메뉴명으로 수정하실 수 있습니다.</p>
                        </div>
                        <div class="input_section">
                            <ul class="input_wrap">
                                <li class="input_area ">
                                    <label for="">메뉴 수정</label>
                                    <input type="text" placeholder="수정하실 메뉴명을 입력해주세요">
                                </li>
                            </ul>
                        </div>
                        
                        <div class="pop_btn_area">
                            <a href="#none" class="btn_large_type02">취소하기</a>
                            <a href="#none" class="btn_large_type01">수정하기</a>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    };


    this.iaMenuModifyComplete = function () {
        return (
            $(`
            <div class="modal_layer_pop">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <h1>IA 메뉴수정</h1>
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <div class="complete_area">
                            <dl>
                                <dt>메뉴 수정이 완료되었습니다.</dt>
                                <dd>
                                    <div class="grey_list_type">
                                        <ul class="list_type01">
                                            <li>
                                                <dl>
                                                    <dt>수정한 메뉴</dt>
                                                    <dd>이체&gt;다계좌이체 &gt;3단계 - 사용자인증확인
                                                        <strong>화면ID <em>trns010100</em></strong>
                                                    </dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                        <div class="pop_btn_area">
                            <a href="#none" class="btn_large_type01">확인하기</a>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    };

    this.iaMenuDelete = function () {
        return (
            $(`
            <div class="modal_layer_pop">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <h1>IA 메뉴삭제</h1>
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <div class="complete_area none">
                            <dl>
                                <dt>선택하신 메뉴를 삭제하시겠습니까?</dt>
                                <dd>
                                    <div class="grey_list_type">
                                        <ul class="list_type01">
                                            <li>
                                                <dl>
                                                    <dt>파일명</dt>
                                                    <dd>이체&gt;다계좌이체 &gt;3단계 - 사용자인증확인
                                                        <strong>화면ID <em>trns010100</em></strong>
                                                    </dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                        <div class="pop_btn_area">
                            <a href="#none" class="btn_large_type02">취소하기</a>
                            <a href="#none" class="btn_large_type01">확인하기</a>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    };

    this.iaMenuDeleteComplete = function () {
        return (
            $(`
            <div class="modal_layer_pop">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <h1>IA 메뉴삭제</h1>
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <div class="complete_area">
                            <dl>
                                <dt>메뉴삭제가 완료되었습니다.</dt>
                                <dd>
                                    <div class="grey_list_type">
                                        <ul class="list_type01">
                                            <li>
                                                <dl>
                                                    <dt>파일명</dt>
                                                    <dd>이체&gt;다계좌이체 &gt;3단계 - 사용자인증확인
                                                        <strong>화면ID <em>trns010100</em></strong>
                                                    </dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                        <div class="pop_btn_area">
                            <a href="#none" class="btn_large_type01">확인하기</a>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    };
    /** 작업요청내역 팝업 */
    this.workRequestList = function () {
        return (
            $(`
            <div class="modal_layer_pop work_type">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <ul class="work_temp">
                            <li class="cont">
                                <div class="work_factor">
                                    <dl>
                                        <dt>
                                            <div>ID A007</div>
                                            <a href="#none"><span class="bul_small_type01">신규</span>빠른이체를 추가해주세요</a>
                                        </dt>
                                        <dd>
                                            <div class="work_area">
                                                이체안에 빠른이체를 추가해주세요.
                                            </div>
                                            <div class="work_section">
                                                <div class="sec_01">
                                                    <p>화면경로</p>
                                                    <ul class="polder">
                                                        <li>이체&nbsp;&nbsp; ></li>
                                                        <li>빠른이체</li>
                                                    </ul>
                                                </div>
                                                <div class="sec_02">
                                                    <p>작업일정</p>
                                                    <div class="work_day">
                                                        <span>2021.05.20 ~ 2021.06.10</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="work_file">
                                                <p>첨부파일</p>
                                                
                                                <ul class="mt20">
                                                    <li>
                                                        <strong>빠른이체.hwp</strong>
                                                        <em>2021.05.20</em>
                                                        <a href="#none" class="btn_text down">다운로드</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="mt20" style="margin:20px 20px 0 20px">
                                                <ul class="box_type_check">
                                                    <li>
                                                        <input type="checkbox" id="team01" checked="checked">
                                                        <label for="team01">수용</label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="team02">
                                                        <label for="team02">미수용</label>
                                                    </li>
                                                    
                                                </ul>
                                                <div class="input_section">
                                                    <ul class="input_wrap" style="max-width:100%">
                                                        <li class="input_area">
                                                            <input type="text" placeholder="미수용 사유 입력">
                                                        </li>
                                                    </ul>
                                                </div>
                                                
                                                <div class="pop_btn_area">
                                                    <a href="#none" class="btn_large_type02">취소하기</a>
                                                    <a href="#none" class="btn_large_type01">확인하기</a>
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
            `)
        );
    };
    /** 작업진행내역 팝업 */
    this.workingList = function () {
        return (
            $(`
            <div class="modal_layer_pop work_type">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <ul class="work_temp">
                            <li class="cont">
                                <div class="work_factor">
                                    <dl>
                                        <dt>
                                            <div>ID A007</div>
                                            <a href="#none"><span class="bul_small_type02">변경</span>빠른이체를 추가해주세요</a>
                                        </dt>
                                        <dd>
                                            <div class="work_area">
                                                이체안에 빠른이체를 추가해주세요.
                                            </div>
                                            <div class="work_section">
                                          
                                                <div class="work_menu_list">
                                                    <p>화면목록</p>
                                                    <ul>
                                                        <li><span>[변경]</span>이체 > 빠른이체 > trns010010</li>
                                                        <li><span>[변경]</span>이체 > 빠른이체 > trns010011</li>
                                                    </ul>
                                                </div>
                                                <div class="sec_02">
                                                    <p>작업일정</p>
                                                    <div class="work_day">
                                                        <span>2021.05.20 ~ 2021.06.10</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="work_file">
                                                <p>다운로드</p>
                                                
                                                <a href="#none" class="btn_small01 btn-file-upload" >파일업로드
                                                    <input type="file" 
                                                        style="width: 100%;
                                                        height: 100%;
                                                        opacity: 0;
                                                        background: transparent;
                                                        position: absolute;
                                                        left: 0;
                                                        top: 0;"
                                                        id="up-file">
                                                </a>
                                                <ul>
                                                    <li>
                                                        <strong>빠른이체.hwp(김광주)</strong>
                                                        <em>2021.05.20</em>
                                                        <a href="#none" class="btn_text down">다운로드</a>
                                                    </li>
                                                    <li>
                                                        <strong>빠른이체 설계서(김기획)</strong>
                                                        <em>2021.05.28</em>
                                                        <a href="#none" class="btn_text down">다운로드</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="work_part">
                                                <p>작업현황</p>
                                                <ul>
                                                    <li class="end">
                                                        <span>확인</span>
                                                        <div class="mt10">
                                                            <button type="button" class="btn_small01 active on">수용완료</button>
                                                        </div>
                                                        <em>2021.05.20</em>
                                                    </li>
                                                    <li class="ing">
                                                        <span>기획</span>
                                                        <div class="mt10">
                                                            <button type="button" class="btn_small01 active btn-request-confirm">검수요청</button>
                                                            <em class="date">2021.05.28</em>
                                                            <div class="action-area" style="margin:10px 0 0 0; position:relative; padding-bottom:20px; display:none" >
                                                                <p style="display:flex; width:50%"><button type="button" class="btn_small01 admin_check on btn-confirm-ok">검수확인</button></p>
                                                                <p style="display:flex; width:50%"><button type="button" class="btn_small01 admin_check btn-request-edit">수정요청</button></p>
                                                                <em style="position:absolute; bottom:0; left:0" class="date-confirm-ok">2021.06.01</em>
                                                            </div>
                                                        </div>
                                                        
                                                    </li>
                                                    <li class="">
                                                        <span>디자인</span>
                                                        <div class="mt10">
                                                            <button type="button" class="btn_small01 active btn-request-confirm">검수요청</button>
                                                            <em style="display:none" class="date">2021.06.02</em>
                                                            <div class="action-area" style=" margin:10px 0 0 0; position:relative; padding-bottom:20px; display:none" >
                                                                <p style="display:flex; width:50%"><button type="button" class="btn_small01 admin_check on btn-confirm-ok">검수확인</button></p>
                                                                <p style="display:flex; width:50%"><button type="button" class="btn_small01 admin_check btn-request-edit">수정요청</button></p>
                                                                <em style="position:absolute; bottom:0; left:0" class="date-confirm-ok">2021.06.01</em>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <span>퍼블</span>
                                                        <div class="mt10">
                                                            <button type="button" class="btn_small01 active btn-request-confirm">검수요청</button>
                                                            <em style="display:none" class="date">2021.06.02</em>
                                                            <div class="action-area" style=" margin:10px 0 0 0; position:relative; padding-bottom:20px; display:none" >
                                                                <p style="display:flex; width:50%"><button type="button" class="btn_small01 admin_check on btn-confirm-ok">검수확인</button></p>
                                                                <p style="display:flex; width:50%"><button type="button" class="btn_small01 admin_check btn-request-edit">수정요청</button></p>
                                                                <em style="position:absolute; bottom:0; left:0" class="date-confirm-ok">2021.06.01</em>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <span>작업완료</span>
                                                        <div class="mt10">
                                                            <button type="button" class="btn_small01 active btn-complete-confirm" style="display:none">완료확인</button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            <div class="work_message">
                                                <p>작업내역</p>
                                                <ul>
                                                    <li class="write">
                                                        <div class="work_form">
                                                            <select class="selectbox">
                                                                <option>관리자</option>
                                                                <option>기획</option>
                                                                <option>디자인</option>
                                                                <option>퍼블</option>
                                                            </select>
                                                            <div class="coment_box">
                                                                <textarea placeholder="내용을 입력해주세요"></textarea>
                                                                <div class="btn_coment">
                                                                    <a href="#none" class="btn_small02">등록</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="list">
                                                        <div class="work_member">
                                                            <a href="#none">퍼블</a>
                                                        </div>
                                                        <div class="work_text">
                                                            <p>퍼블</p>
                                                            <em>2021.06.09 11:23 AM</em>
                                                            <div class="data">
                                                                최종파일 검수 부탁드려요.
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="list">
                                                        <div class="work_member">
                                                            <a href="#none">디자인</a>
                                                        </div>
                                                        <div class="work_text">
                                                            <p>디자인</p>
                                                            <em>2021.06.02 09:08 AM</em>
                                                            <div class="data">
                                                                디자인파일 스케치에 업로드 하였습니다.
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="list">
                                                        <div class="work_member">
                                                            <a href="#none">기획</a>
                                                        </div>
                                                        <div class="work_text">
                                                            <p>기획</p>
                                                            <em>2021.05.28 05:10 PM</em>
                                                            <div class="data">
                                                                화면설계서 업로드 완료 했고, IA추가 생성 하였습니다.
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="list">
                                                        <div class="work_member">
                                                            <a href="#none">관리자</a>
                                                        </div>
                                                        <div class="work_text">
                                                            <p>관리자</p>
                                                            <em>2021.05.20 10:25 AM</em>
                                                            <div class="data">
                                                                이체에 빠른이체를 추가해주세요.
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>

                                            </div>
                                            
                                        </dd>
                                    </dl>
                                </div>

                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            `)
        );
    };
    /** 작업진행내역 팝업 */
    this.workingList2 = function () {
        return (
            $(`
            <div class="modal_layer_pop work_type">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <ul class="work_temp">
                            <li class="cont">
                                <div class="work_factor">
                                    <dl>
                                        <dt>
                                            <div>ID A007</div>
                                            <a href="#none"><span class="bul_small_type02">변경</span>빠른이체를 추가해주세요</a>
                                        </dt>
                                        <dd>
                                            <div class="work_area">
                                                이체안에 빠른이체를 추가해주세요.
                                            </div>
                                            <div class="work_section">
                                        
                                                <div class="work_menu_list">
                                                    <p>화면목록</p>
                                                    <ul>
                                                        <li>이체 > 빠른이체 > trns010010</li>
                                                        <li>이체 > 빠른이체 > trns010011</li>
                                                    </ul>
                                                    <a href="#none" class="btn_small01 write btn-add-and-edit">추가 및 수정</a>
                                                </div>
                                                <div class="sec_02">
                                                    <p>작업일정</p>
                                                    <div class="work_day">
                                                        <span>2021.05.20 <em>9:00 AM</em> ~ 2021.06.10 <em>11:00 AM</em></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="work_step_area">
                                    <div class="work_part">
                                        <div class="btn_area">
                                            <a href="#none" class="btn_small01 btn-all-confirm-cancel">전체검수취소</a>
                                        </div>
                                        <ul>
                                            <li class="end">
                                                <span>확인</span>
                                                <div class="work_step_check">
                                                    <input type="checkbox" id="step01" disabled checked>
                                                    <label for="step01">수용완료</label>
                                                    <em>2021.05.20</em>
                                                </div>
                                                
                                            </li>
                                            <li class="ing">
                                                <span>기획</span>
                                                <div class="work_step_check">
                                                    <input type="checkbox" id="step02" >
                                                    <label for="step02">검수요청</label>
                                                    <em class="date">2021.05.28</em>
                                                    <button type="button" class="btn_confirm btn-request-confirm"></button>
                                                </div>
                                                <div class="edit_pop" style=" top: 125px; display: none;">
                                                    <div class="edit_tit">
                                                        검수확인
                                                        <a href="#none" class="btn_edit_close" title="레이어팝업 닫기"></a>
                                                    </div>
                                                    <div class="edit_data">
                                                        <ul class="box_type_check">
                                                            <li>
                                                                <input type="radio" id="state01" name="state">
                                                                <label for="state01" class="btn-confirm-ok">검수확인</label>
                                                            </li>
                                                            <li>
                                                                <input type="radio" id="state02" name="state">
                                                                <label for="state02" class="btn-request-edit">수정요청</label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="">
                                                <span>디자인</span>
                                                <div class="work_step_check">
                                                    <input type="checkbox" id="step03" >
                                                    <label for="step03">검수요청</label>
                                                    <em class="date">2021.06.02</em>
                                                    <button type="button" class="btn_confirm btn-request-confirm"></button>
                                                </div>
                                                <div class="edit_pop" style=" top: 125px; display: none;">
                                                    <div class="edit_tit">
                                                        검수확인
                                                        <a href="#none" class="btn_edit_close" title="레이어팝업 닫기"></a>
                                                    </div>
                                                    <div class="edit_data">
                                                        <ul class="box_type_check">
                                                            <li>
                                                                <input type="checkbox" id="state01">
                                                                <label for="state01" class="btn-confirm-ok">검수확인</label>
                                                            </li>
                                                            <li>
                                                                <input type="checkbox" id="state02">
                                                                <label for="state02" class="btn-request-edit">수정요청</label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <span>퍼블</span>
                                                <div class="work_step_check">
                                                    <input type="checkbox" id="step04" >
                                                    <label for="step04">검수요청</label>
                                                    <em class="date">2021.06.02</em>
                                                    <button type="button" class="btn_confirm btn-request-confirm"></button>
                                                </div>
                                                <div class="edit_pop" style=" top: 125px; display: none;">
                                                    <div class="edit_tit">
                                                        검수확인
                                                        <a href="#none" class="btn_edit_close" title="레이어팝업 닫기"></a>
                                                    </div>
                                                    <div class="edit_data">
                                                        <ul class="box_type_check">
                                                            <li>
                                                                <input type="checkbox" id="state01">
                                                                <label for="state01" class="btn-confirm-ok">검수확인</label>
                                                            </li>
                                                            <li>
                                                                <input type="checkbox" id="state02">
                                                                <label for="state02" class="btn-request-edit">수정요청</label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <span style="margin-top: 50%;
                                                transform: translateY(-50%);">작업완료</span>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                </div>
                                
                                <div class="active_txt">
                                    <div class="work_message">
                                        <ul>
                                            <li class="write">
                                                <div class="work_form">
                                                    <select class="selectbox">
                                                        <option>관리자</option>
                                                        <option>기획</option>
                                                        <option>디자인</option>
                                                        <option>퍼블</option>
                                                    </select>
                                                    <div class="coment_box">
                                                        <textarea placeholder="내용을 입력해주세요"></textarea>
                                                        <div class="btn_coment">
                                                            <a href="#none" class="btn_small01">파일업로드</a>
                                                            <a href="#none" class="btn_small02">등록</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list">
                                                <div class="work_member">
                                                    <span class="mem">퍼블</span>
                                                </div>
                                                <div class="work_text">
                                                    <p>퍼블</p>
                                                    <em>2021.06.09 11:23 AM</em>
                                                    <div class="data">
                                                        최종파일 검수 부탁드려요.
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list">
                                                <div class="work_member">
                                                    <span class="mem">디자인</span>
                                                </div>
                                                <div class="work_text">
                                                    <p>디자인</p>
                                                    <em>2021.06.02 09:08 AM</em>
                                                    <div class="data">
                                                        디자인파일 스케치에 업로드 하였습니다.
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list">
                                                <div class="work_member">
                                                    <span class="mem">기획</span>
                                                </div>
                                                <div class="work_text">
                                                    <p>기획</p>
                                                    <em>2021.05.28 05:10 PM</em>
                                                    <div class="data">
                                                        화면설계서 업로드 완료 했고, IA추가 생성 하였습니다.
                                                    </div>
                                                    <div class="plus_file">
                                                        <a href="#none" class="btn_text down">빠른이체_화면설계서_v1.0.ppt</a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list">
                                                <div class="work_member">
                                                    <span class="mem">관리자</span>
                                                </div>
                                                <div class="work_text">
                                                    <p>관리자</p>
                                                    <em>2021.05.20 10:25 AM</em>
                                                    <div class="data">
                                                        이체에 빠른이체를 추가해주세요.
                                                    </div>
                                                    <div class="plus_file">
                                                        <a href="#none" class="btn_text down">빠른이체.hwp</a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
        
                                    </div>
                                </div>
                        
        
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            `)
        );
    };
  
    /** 작업완료 리스트 */
    this.workCompleteList = function () {
        return (
            $(`
            <div class="modal_layer_pop work_type">
                <div class="modal_layer_inner" style="background:#fff">
                    <div class="pop_tit">
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content" style="overflow-y: scroll; height: 750px;">
                        <div class="work_pop_wrap">
                            <div class="work_factor">
                                <div class="work_tit">
                                    <h1>작업완료</h1>
                                </div>
                                <dl>
                                    <dt>
                                        <div>ID A007</div>
                                        <a href="#none"><span class="bul_small_type01">신규</span>빠른이체를 추가해주세요</a>
                                    </dt>
                                    <dd>
                                        <div class="work_area">
                                            이체안에 빠른이체를 추가해주세요.
                                        </div>
                                        <div class="work_section">
                                            <div class="sec_01">
                                                <p>화면경로</p>
                                                <ul class="polder">
                                                    <li>이체&nbsp;&nbsp; ></li>
                                                    <li>빠른이체</li>
                                                </ul>
                                            </div>
                                            <div class="sec_02">
                                                <p>작업일정</p>
                                                <div class="work_day">
                                                    <span>2021.05.20 ~ 2021.06.10</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt10">                                        
                                            <a href="../list/list0100.html" class="btn_mid_type02">화면목록 바로가기</a>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                            <div class="pop_btn_area">
                                <a href="#none" class="btn_large_type02 ins-cancel">취소하기</a>
                                <a href="#none" class="btn_large_type01 ins-complete">검수요청하기</a>
                            </div>
                        </div>
                        <div class="complete_area" style="padding-bottom: 60px;display:none;">
                            <dl>
                                <dt>검수요청이 완료되었습니다.</dt>
                                <dd>
                                    <div class="work_factor">
                                        <dl>
                                            <dt>
                                                <div>ID A007</div>
                                                <a href="#none"><span class="bul_small_type01">신규</span>빠른이체를 추가해주세요</a>
                                            </dt>
                                            <dd>
                                                <div class="work_area">
                                                    이체안에 빠른이체를 추가해주세요.
                                                </div>
                                                <div class="work_section">
                                                    <div class="sec_01">
                                                        <p>화면경로</p>
                                                        <ul class="polder">
                                                            <li>이체&nbsp;&nbsp; ></li>
                                                            <li>빠른이체</li>
                                                        </ul>
                                                    </div>
                                                    <div class="sec_02">
                                                        <p>작업일정</p>
                                                        <div class="work_day">
                                                            <span>2021.05.20 ~ 2021.06.10</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </dd>
                            </dl>
                            <div class="pop_btn_area">
                                <a href="#none" class="btn_large_type01" id="step-confirm">확인하기</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    }; //end

    this.deleteChannel = function () {
        return (
            $(`
            <div class="modal_layer_pop">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <h1>채널 삭제</h1>
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <div class="complete_area none">
                            <dl>
                                <dt>선택하신 채널을 삭제하시겠습니까?</dt>
                                <dd>
                                    <div class="grey_list_type">
                                        <ul class="list_type01">
                                            <li>
                                                <dl>
                                                    <dt>채널명</dt>
                                                    <dd>인터넷뱅킹</dd>
                                                </dl>
                                            </li>
                                            <li>
                                                <dl>
                                                    <dt>하위단계</dt>
                                                    <dd>개인</dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                        <div class="pop_btn_area">
                            <a href="#none" class="btn_large_type02">취소하기</a>
                            <a href="#none" class="btn_large_type01">삭제하기</a>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    }; //end

    this.insRequest = function(){
        return(
            $(`
            <div class="modal_layer_pop work_type">
                <div class="modal_layer_inner" style="background:#fff">
                    <div class="pop_tit">
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content" style=" height: 750px;">
                        <div class="work_pop_wrap">
                            <div class="work_factor">
                                <div class="work_tit">
                                    <h1>검수요청중 </h1>
                                </div>
                                <div class="work_factor" style="position: relative;">
                                    <dl>
                                        <dt>
                                            <div>ID A005</div>
                                            <a href="#" class="btn-move-confirm"><span class="bul_small_type02">변경</span>빠른이체를 추가해주세요</a>
                                        </dt>
                                        <dd>
                                            <div class="work_area">
                                                이체안에 빠른이체를 추가해주세요.
                                            </div>
                                            <p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; right: 35px; top: 20px;">기획 검수요청</p>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="work_factor" style="position: relative;">
                                    <dl>
                                        <dt>
                                            <div>ID A007</div>
                                            <a href="../work/work0100.html"><span class="bul_small_type02">변경</span>띄워쓰기 수정사항입니다.</a>
                                        </dt>
                                        <dd>
                                            <div class="work_area">
                                                이체 뒤에 나오는 텍스트는 모두 띄워쓰기 적용 부탁드립니다
                                            </div>
                                            <p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; right: 35px; top: 20px;">디자인 검수요청</p>
                                        </dd>
                                    </dl>
                                </div>
                                
                                
                                <div class="btn_more_area">
                                    <a href="#none">더보기</a>
                                </div>
                        
                            </div>
                            
                        </div>
                        <div class="complete_area" style="padding-bottom: 60px; display: none;">
                            <dl>
                                <dt>검수가 완료되었습니다.</dt>
                                <dd>
                                    
                                </dd>
                            </dl>
                            <div class="pop_btn_area">
                                <a href="#none" class="btn_large_type01">확인하기</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    };// end

    this.workRequestChange = function () {
        return (
            $(`
            <div class="modal_layer_pop work_type">
                <div class="modal_layer_inner" style="background:#fff">
                    <div class="pop_tit">
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content" style=" height: 750px;">
                        <div class="work_pop_wrap">
                            <div class="work_factor" style="padding-bottom: 0;">
                                <div class="work_tit">
                                    <h1>메뉴선택</h1>
                                </div>
                                
                            </div>
                            <div class="work_check">
                                
                                <div class="grey_list_type white">
                                    <div class="left_con_area">
                                        <ul class="menu_list">
                                            <li>
                                                <a href="#none">조회</a>
                                            </li>
                                            <li>
                                                <a href="#none" class="active">이체</a>
                                            </li>
                                            <li>
                                                <a href="#none">펀드</a>
                                            </li>
                                            <li>
                                                <a href="#none">대출</a>
                                            </li>
                                            <li>
                                                <a href="#none">외환</a>
                                            </li>
                                            <li>
                                                <a href="#none">마이뱅킹관리</a>
                                            </li>
                                            <li>
                                                <a href="#none">공과금</a>
                                            </li>
                                            <li>
                                                <a href="#none">퇴직연금</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="con_area">
                                        <div class="con_menu_list">
                                            <ul>
                                                <li>
                                                    <div class="inner">
                                                        <button type="button" class="btn_minus" aria-controls="child-list1">하위메뉴 접기</button>
                                                        <span>즉시이체</span>
                                                        <div class="input_wrap">
                                                            <div class="input_area cal_check">
                                                                <div class="check">
                                                                    <input type="checkbox" class="check-all" id="menu-check-all1">
                                                                    <label for="menu-check-all1"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ul id="child-list1">
                                                        <li>
                                                            <div class="inner">
                                                                <button type="button" class="btn_minus" aria-controls="child-list2">하위메뉴 접기</button>
                                                                <span>당타행이체</span>
                                                                <div class="input_wrap">
                                                                    <div class="input_area cal_check">
                                                                        <div class="check">
                                                                            <input type="checkbox" class="check-all" id="menu-check-all2">
                                                                            <label for="menu-check-all2"></label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <ul id="child-list2">
                                                                <li>
                                                                    <div class="inner">
                                                                        <span>1단계 - 출금계좌정보 입력</span>
                                                                        <strong>화면ID <em>trns010100</em></strong>
                                                                        <div class="input_wrap">
                                                                            <div class="input_area cal_check">
                                                                                <div class="check">
                                                                                    <input type="checkbox" id="menucheck01">
                                                                                    <label for="menucheck01"></label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div class="inner">
                                                                        <span>1단계 - 출금계좌정보 입력</span>
                                                                        <strong>화면ID <em>trns010100</em></strong>
                                                                        <div class="input_wrap">
                                                                            <div class="input_area cal_check">
                                                                                <div class="check">
                                                                                    <input type="checkbox" id="menucheck02">
                                                                                    <label for="menucheck02"></label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div class="inner">
                                                                        <span>2단계 - 입금계좌정보 입력</span>
                                                                        <strong>화면ID <em>trns010200</em></strong>
                                                                        <div class="input_wrap">
                                                                            <div class="input_area cal_check">
                                                                                <div class="check">
                                                                                    <input type="checkbox" id="menucheck03">
                                                                                    <label for="menucheck03"></label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div class="inner">
                                                                        <span>3단계 - 이체정보확인 및 추가인증</span>
                                                                        <strong>화면ID <em>trns010300</em></strong>
                                                                        <div class="input_wrap">
                                                                            <div class="input_area cal_check">
                                                                                <div class="check">
                                                                                    <input type="checkbox" id="menucheck04">
                                                                                    <label for="menucheck04"></label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div class="inner">
                                                                        <span>4단계 - 이체완료</span>
                                                                        <strong>화면ID <em>trns010400</em></strong>
                                                                        <div class="input_wrap">
                                                                            <div class="input_area cal_check">
                                                                                <div class="check">
                                                                                    <input type="checkbox" id="menucheck05">
                                                                                    <label for="menucheck05"></label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <div class="inner">
                                                                <button type="button" class="btn_plus">하위메뉴 더보기</button>
                                                                <span>다계좌이체</span>
                                                                <div class="input_wrap">
                                                                    <div class="input_area cal_check">
                                                                        <div class="check">
                                                                            <input type="checkbox" id="menucheck06">
                                                                            <label for="menucheck06"></label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="inner">
                                                                <button type="button" class="btn_plus">하위메뉴 더보기</button>
                                                                <span>이체 결과조회</span>
                                                                <div class="input_wrap">
                                                                    <div class="input_area cal_check">
                                                                        <div class="check">
                                                                            <input type="checkbox" id="menucheck07">
                                                                            <label for="menucheck07"></label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="pop_btn_area">
                                            <a href="#none" class="btn_mid_type01">다시선택하기</a>
                                            <a href="#none" class="btn_mid_type02 selected-complete">선택완료</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            `)
        );
    }; //end

    // 권한수정
    this.contManage = function () {
        return (
            $(`
            <div class="modal_layer_pop">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <h1>권한수정</h1>
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <div class="pop_txt_area">
                            <p>선택하신 담당자의 권한을 수정하실 수 있습니다.</p>
                        </div>
                        <div class="grey_list_type white mt20" style="padding: 20px; border-top: 1px solid #ddd;">
                            <ul class="list_type01">
                                <li>
                                    <dl>
                                        <dt>담당자</dt>
                                        <dd>박기획</dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                        <div class="input_section" style="margin-top: 40px; border-bottom: 0;">
                            <ul class="box_type_check">
                                <li>
                                    <input type="checkbox" id="menucheck01">
                                    <label for="menucheck01">현업</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="menucheck02">
                                    <label for="menucheck02">작업자</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="menucheck03">
                                    <label for="menucheck03">일반사용자</label>
                                </li>
                            </ul>
                            
                        </div>
                        
                        <div class="pop_btn_area">
                            <a href="#none"class="btn_large_type02">취소하기</a>
                            <a href="#none" class="btn_large_type01">권한수정</a>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    };//end

    this.changeHistory = function () {
        return (
            $(`
            <div class="modal_layer_pop">
                <div class="modal_layer_inner">
                    <div class="pop_tit">
                        <h1>화면수정이력</h1>
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    <div class="pop_content">
                        <div class="work_factor" style="position: relative;">
                            <dl>
                                <dt>
                                    <div>ID A005</div>
                                    <a href="#" class="history-detail" id=""><span class="bul_small_type01">변경</span>빠른이체를 추가해주세요</a>
                                </dt>
                                <dd>
                                    <div class="work_area">
                                        이체안에 빠른이체를 추가해주세요.
                                    </div>
                                    <p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; right: 15px; top: 10px;">2021.05.15</p>
                                </dd>
                            </dl>
                        </div>
                        <div class="work_factor" style="position: relative;">
                            <dl>
                                <dt>
                                    <div>ID A007</div>
                                    <a href="#"><span class="bul_small_type02">변경</span>띄워쓰기 수정사항입니다.</a>
                                </dt>
                                <dd>
                                    <div class="work_area">
                                        이체 뒤에 나오는 텍스트는 모두 띄워쓰기 적용 부탁드립니다
                                    </div>
                                    <p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; right: 15px; top: 10px;">2021.06.04</p>
                                </dd>
                            </dl>
                        </div>
                        
                       
                        <div class="btn_more_area">
                            <a href="#none">더보기</a>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    }; //end

    // 작업완료 더보기
    this.workCompleteMore = function () {
        return (
            $(`
            <div class="modal_layer_pop">
                <div class="modal_layer_inner" style="overflow-y: auto">
                    <div class="pop_tit">
                        <h1>작업완료 더보기</h1>
                       
                        <a href="#none" class="btn_pop_close" title="레이어팝업 닫기"></a>
                    </div>
                    
                    <div class="pop_content">
                    <div class="input_section right_type mb40" style="border-bottom:0;">
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
                        <script>
                            $(document).ready(function () {
                                $('#search_list').change(function () {
                                    if ($(this).val() == 3) {
                                        $('.search-string').hide();
                                        $('.datepicker').show();
                                    }
                                    else {
                                        $('.search-string').show();
                                        $('.datepicker').hide();
                                    }
                                })
                            });
                        </script>
                    </div>
                        <div class="work_factor" style="position: relative;">
                            <dl>
                                <dt>
                                    <div>ID A005</div>
                                    <ul class="work_label">
										<li><a href="#none" class="work_label04">작업완료</a></li>
									</ul>
                                    <a href="#" class="history-detail" id=""><span class="bul_small_type01">변경</span>빠른이체를 추가해주세요</a>
                                </dt>
                                <dd>
                                    <div class="work_area">
                                        이체안에 빠른이체를 추가해주세요.
                                    </div>
                                    <p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; left: 100px; top: 10px;">2021.05.15</p>
                                </dd>
                            </dl>
                        </div>
                        <div class="work_factor" style="position: relative;">
                            <dl>
                                <dt>
                                    <div>ID A007</div>
                                    <ul class="work_label">
										<li><a href="#none" class="work_label04">작업완료</a></li>
									</ul>
                                    <a href="#"><span class="bul_small_type02">변경</span>띄워쓰기 수정사항입니다.</a>
                                </dt>
                                <dd>
                                    <div class="work_area">
                                        이체 뒤에 나오는 텍스트는 모두 띄워쓰기 적용 부탁드립니다
                                    </div>
                                    <p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; left: 100px; top: 10px;">2021.06.04</p>
                                </dd>
                            </dl>
                        </div>
                        <div class="work_factor" style="position: relative;">
                            <dl>
                                <dt>
                                    <div>ID A007</div>
                                    <ul class="work_label">
										<li><a href="#none" class="work_label04">작업완료</a></li>
									</ul>
                                    <a href="#"><span class="bul_small_type02">변경</span>띄워쓰기 수정사항입니다.</a>
                                </dt>
                                <dd>
                                    <div class="work_area">
                                        이체 뒤에 나오는 텍스트는 모두 띄워쓰기 적용 부탁드립니다
                                    </div>
                                    <p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; left: 100px; top: 10px;">2021.06.04</p>
                                </dd>
                            </dl>
                        </div>
                        <div class="work_factor" style="position: relative;">
                            <dl>
                                <dt>
                                    <div>ID A007</div>
                                    <ul class="work_label">
										<li><a href="#none" class="work_label04">작업완료</a></li>
									</ul>
                                    <a href="#"><span class="bul_small_type02">변경</span>띄워쓰기 수정사항입니다.</a>
                                </dt>
                                <dd>
                                    <div class="work_area">
                                        이체 뒤에 나오는 텍스트는 모두 띄워쓰기 적용 부탁드립니다
                                    </div>
                                    <p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; left: 100px; top: 10px;">2021.06.04</p>
                                </dd>
                            </dl>
                        </div>
                        <div class="work_factor" style="position: relative;">
                            <dl>
                                <dt>
                                    <div>ID A007</div>
                                    <ul class="work_label">
										<li><a href="#none" class="work_label04">작업완료</a></li>
									</ul>
                                    <a href="#"><span class="bul_small_type02">변경</span>띄워쓰기 수정사항입니다.</a>
                                </dt>
                                <dd>
                                    <div class="work_area">
                                        이체 뒤에 나오는 텍스트는 모두 띄워쓰기 적용 부탁드립니다
                                    </div>
                                    <p style="font-size:13px; color: #666; margin-top: 10px; position: absolute; left: 100px; top: 10px;">2021.06.04</p>
                                </dd>
                            </dl>
                        </div>
                        
                       
                        <div class="btn_more_area">
                            <a href="#none">더보기</a>
                        </div>
                    </div>
                </div>
            </div>
            `)
        );
    }; //end
};