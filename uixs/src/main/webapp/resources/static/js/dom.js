function Doms() {
    this.requestForm = function(){
        return (
            $(`<div class="pop_wrap" id="request_form">
                <div class="pop_inner"  style="height: 750px;">
                    <div class="pop_title">
                        <h1>요청사항을 등록해주세요</h1>
                        <a href="#none" title="레이어팝업 닫기" class="pop_close"></a>
                    </div>
                    <div class="pop_content" style="height: 700px;">
                        <div class="input_wrap">
                            <div class="select_type">
                                <label>채널을 선택해주세요</label>
                                <div>
                                    <select name="" id="">
                                        <option>개인</option>
                                        <option>기업</option>
                                        <option>금융상품</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <div class="select_type">
                                <label>메뉴를 선택해주세요</label>
                                <div>
                                    <select name="" id="">
                                        <option>조회</option>
                                        <option>이체</option>
                                        <option>신규/해지</option>
                                        <option>펀드</option>
                                        <option>대출</option>
                                        <option>카드</option>
                                        <option>외환</option>
                                        <option>퇴직연금</option>
                                        <option>ISA</option>
                                        <option>신탁</option>
                                        <option>방카슈랑스</option>
                                        <option>공과금/입장권</option>
                                        <option>부가서비스</option>
                                        <option>마이뱅킹관리</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <div class="select_type">
                                <label>하위메뉴를 선택해주세요</label>
                                <div>
                                    <select name="" id="">
                                        <option>당/타행이체</option>
                                        <option>자동이체</option>
                                        <option>이체관리</option>
                                        <option>지연이체</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <div class="input_type">
                                <label>내용을 입력해주세요</label>
                                <div>
                                    <input type="text" placeholder="내용을 입력해주세요">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btn_footer">
                        <a href="#none" class="gray">취소</a>
                        <a href="#none" class="regist">등록</a>
                    </div>
                </div>
            </div>`)
        );
    };

    this.scheduleForm = function(){
        function getDon() {

        };

        return (
            $(`<div class="pop_wrap" id="schedule_form">
                <div class="pop_inner"  style="height: 450px;">
                    <div class="pop_title">
                        <h1>작업일정을 등록해주세요</h1>
                        <a href="#none" title="레이어팝업 닫기" class="pop_close"></a>
                    </div>
                    <div class="pop_content">
                        <div class="input_wrap">
                            <div class="select_type">
                                <label>그룹선택</label>
                                <div>
                                    <select name="" id="jobGroup">
                                        <option value="1">기획</option>
                                        <option value="2">디자인</option>
                                        <option value="3">퍼블리싱</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <div class="input_type">
                                <label>내용을 입력해주세요</label>
                                <div>
                                    <input type="text" id="jobContent" placeholder="내용을 입력해주세요" value="당/타행이체를 즉시이체로 변경해주세요.">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btn_footer">
                        <a href="#none" class="gray">취소</a>
                        <a href="#none" >등록</a>
                    </div>
                </div>
            </div>`)
        );
    };


    this.noticePopup = function () {
        return (
            $(`<!--알림내역 팝업-->
            <div class="pop_wrap" id="notice_msg">
                <div class="pop_inner">
                    <div class="pop_title">
                        <h1>알림내역입니다.</h1>
                        <a href="#none" title="레이어팝업 닫기" class="pop_close"></a>
                    </div>
                    <div class="pop_content">
                        <ul class="notice_list">
                            <li>[공지] 보안을 위해 사이트 접속 후 반드시 로그아웃을 눌러주세요.</li>
                            <li>요청하신 이체>다계좌이체>1단계....수정이 완료되었습니다.</li>
                            <li>요청하신 이체>다계좌이체>2단계....수정이 완료되었습니다.</li>
                            <li>요청하신 이체>다계좌이체>2단계....수정이 완료되었습니다.</li>
                        </ul>
                    </div>
                    <div class="btn_footer">
                        <a href="#none">확인완료</a>
                    </div>
                </div>
            </div>
            <!--// 알림내역 팝업--> `)
        );
    };

    this.downloadPopup = function () {
        return (
            $(`<!--파일 다운로드 팝업-->
            <div class="pop_wrap" id="file_download" style="display: none;">
                <div class="pop_inner">
                    <div class="pop_title">
                        <h1>파일 다운로드</h1>
                        <a href="#none" title="레이어팝업 닫기" class="pop_close"></a>
                    </div>
                    <div class="pop_content">
                        <div class="pop_state">
                            common.css
                        </div>
                        <div class="loading">
                            <p>다운로드 중입니다.</p>
                            <div>
                                <span></span>
                                <em>100%</em>
                            </div>
                        </div>
                        <!--다운로드 완료 시-->
                        <div class="loading end">
                            <p>다운로드가 완료되었습니다.</p>
                        </div>
                        <!--// 다운로드 완료 시-->
                    </div>
                    <div class="btn_footer">
                        <a href="#none">확인</a>
                    </div>
                </div>
            </div>
            <!--// 파일 다운로드 팝업--`)
        );
    };

    this.editCancelPopup = function () {
        return (
            $(`<div class="pop_wrap" id="edit_cancel_popup">
            <div class="pop_inner">
                <div class="pop_title">
                    <h1>수정불가 사유</h1>
                    <a href="#none" title="레이어팝업 닫기" class="pop_close"></a>
                </div>
                <div class="pop_content">
                    <div class="pop_state">
                        <span>변경</span>
                        당/타행이체를 즉시이체로 변경해주세요. 
                    </div>
                    <div class="input_wrap">
                        <div class="input_type">
                            <label>사유를 입력해주세요</label>
                            <div>
                                <input type="text" placeholder="불가 사유를 입력해주세요">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn_footer">
                    <a href="#none" class="gray">취소</a>
                    <a href="#none">담당자에게 보내기</a>
                </div>
                
            </div>
        </div>`)
        );
    }
  
};