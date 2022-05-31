

var domJs = new Doms();

console.log(domJs)

function News() {
    this.ts = function() {
        console.log('ss');
    }

}

var ns = new News();
ns.ts();

function UI() {

    function headerNav() {
        $('.header nav li a').on('click',  function (e) {
            $(this)
                .addClass('on')
                .parent()
                .siblings('li')
                .find('a')
                .removeClass('on');
        });
    };

    function subMenuTab() {
        $('.sub_menu .tab_wrap').find('a').on('click', function () {
            $(this)
                .addClass('on')
                .parent()
                .siblings('li')
                .find('a')
                .removeClass('on');
        });
    };

    function search() {

        $('.btn_search').on('click', function () {
            $(this).next('.search_area').show();
        });

        $('.btn_search_close').on('click', function () {
            $('.search_area').hide();
        });
    };

    function editMessage() {
        var opener = null;

        $('#edit_msg').hide();

        $('#edit_msg .pop_inner').css({
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        });

        $('.btn_msg').click(function () {
            $('#edit_msg').show();
            opener = $(this);
        });

        $('#edit_msg').find('.pop_close').on('click', function () {
            $('#edit_msg').hide();
            opener = null;
        });

        var historyList = [
            {idx: 1, userType: '담당자', content: '당/타행이체를 즉시이체로 변경해 주세요.', date: '2021.03.20'}
        ];

        function setHistoryList() {
            $('#edit_msg').find('.history_list').html(function () {
                var html = '';
    
                historyList.map(function (history) {
                    html += '<li><span>['+history.userType+']</span>'+history.content+'<strong>'+history.date+'</strong></li>';
                });
    
                return html;
            }).css({overflowY: 'auto', height: '80px'});
        };

        setHistoryList();

        $('#edit_msg').find('.write_type button').on('click', function () {
            var date = new Date();

            if ($(this).closest('.write_type').find('input').val() != '') {

                historyList.push({
                    idx: historyList.length + 1,
                    userType: $(this).closest('.write_type').find('select option:selected').text(),
                    content: $(this).closest('.write_type').find('input').val(),
                    date: date.getFullYear() +'.'+ date.getMonth()+1 + '.' + date.getDate()
                });

                setHistoryList();
    
                opener.addClass('on');
                $(this).closest('.write_type').find('input').val('');
            }
        });
    };

    function noticeMsg() {
        var dom = domJs.noticePopup();
        $('body').append(dom);

        $('#notice_msg').hide().find('.pop_inner').css({
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }).find('.notice_list').css({
            overflowY: 'auto',
            height: 230
        });

        $('.info_area .notice').on('click', function () {
            $('#notice_msg').show();
        });

        $('#notice_msg').find('.btn_footer a, .pop_close').on('click', function () {
            $('#notice_msg').hide();
        });
    };

    function fileDownload() {
        $('#file_download').hide();

        function downloadTip() {
            var dom =   '<div class="file_result"><ul>'+
                        '      <li><a href="#none">파일 다운로드</a></li>'+
                        '     <li><a href="#none">이전 파일보기</a></li>'+
                        '</ul></div>';

            return function() {
                return dom;
            };
        };

        $('.file_list a:not(.icon)').click(function () {
            $('#file_download').remove();
            
            var fileName = $(this).text();

            var dom = domJs.downloadPopup();

            dom.find('.pop_inner').css({
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            });

            dom.find('.pop_state').text(fileName);

            dom.find('.loading.end').hide();

            dom.find('.loading div > span').width('0%').stop().animate({
                width: '100%'
            }, 1000, function () {
                dom.find('.loading').hide();
                dom.find('.loading.end').show();
            })

            dom.show();

            dom.find('.btn_footer a, .pop_close').click(function () {
                dom.remove();
            });

            $('body').append(dom);
        });
    };

    function acodion() {

        $('.work_list_view .acodion').each(function () {
            $(this).parent().next('dd').hide();
        });

        $('.work_list_view .acodion').click(function () {
            if($(this).hasClass('on')) {

                $(this).removeClass('on').parent().next('dd').slideUp(50);
            }
            else {
                $(this).addClass('on').parent().next('dd').slideDown(100);
            }
        });
    };

    function workRequest() {
        var dom = domJs.requestForm();

        var loginUser = null;

        if(sessionStorage.getItem('loginUser')) {
            loginUser = sessionStorage.getItem('loginUser')
            // console.log(sessionStorage.getItem('loginUser'))
            if(sessionStorage.getItem('loginUser') != 'admin') {
                $('#edit_disabled').show();
            }
            else {
                $('#edit_disabled').hide();
            };
        };

        $('body').append(dom);

        $('#request_form').hide();
        $('#request_form').find('.pop_inner').css({
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        });

        $('.btn_work').click(function () {
            if(loginUser != 'admin') {
                alert('관리자 로그인후 이용하세요.'); 
                return false;
            }

            if($(this).text() == '추가') {
                $('#request_form').show();
            }
        });

        $('#request_form').find('.btn_footer a:not(.regist), .pop_close').click(function () {
            $('#request_form').hide();
            
        });

        $('#request_form').find('.btn_footer a.regist').click(function () {
            $('#request_form').hide();
            $('#addWork').show();

            sessionStorage.setItem('addRequest', true);
        });

        $('#confirmWork').click(function () {
            $(this).addClass('on');

            $(this).parent().siblings('.process_ing').removeClass('cancel');
            $(this).parent().siblings('.process_ing').find('li:first').removeClass('ing').addClass('clear').siblings('li').addClass('ing');

            $('#viewCalendar, .viewCalendar').show();
        });

        $('#viewCalendar, .viewCalendar').click(function () {
            location.href = './schedule_write.html';
        })
    }


    function subMenu() {
        $('.sub_menu').find('.tab_content button').each(function () {
            if ($(this).text() == '이체') {
                $(this).click(function () {
                    location.href = './view_list.html';
                });

                return false;
            }
            else {
                return;
            }
        })
    };

    function logout() {
        $('.btn_logout').click(function () {
            sessionStorage.removeItem('loginUser');
            location.href = './login.html';
        });
    };

    function newWork() {
        if(sessionStorage.getItem('loginUser')) {
            // console.log(sessionStorage.getItem('loginUser'))
            if(sessionStorage.getItem('loginUser') != 'admin') {
                $('.new_work').show();
            }
            else {
                $('.new_work').hide();
            };
        };

        $('.new_work').click(function () {

            location.href = './work_list.html';
        });
    }


    function init() {
        editMessage();

        headerNav();

        subMenuTab();

        search();

        noticeMsg();

        fileDownload();

        acodion();

        workRequest();

        subMenu();

        logout();

        newWork();

        $('.header').find('h1').click(function () {
            location.href = './login_view.html';
        });
    }

    init();
};

$(function () {
    
    UI();
    
});

