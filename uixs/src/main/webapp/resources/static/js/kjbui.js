var popup = new Popup();

var menuHash = location.hash;
var pathnameArr = location.pathname.split('/');
var filename = pathnameArr[pathnameArr.length -1];

var path = '';
if(filename.indexOf('chan') != -1) {
    path = 'chan';
}
else if(filename.indexOf('list') != -1) {
    path = 'list';
}
else if(filename.indexOf('work') != -1) {
    path = 'work';
}
else if(filename.indexOf('menu') != -1) {
    path = 'menu';
}
else if(filename.indexOf('file') != -1) {
    path = 'file';
}
else if(filename.indexOf('cont') != -1) {
    path = 'cont';
}


/** 메뉴 html */
// <li class="chan"><a href="../chan/chan0100.html#chan">채널관리</a></li>
// <li class="menu"><a href="../menu/menu0100.html#menu">IA생성</a></li>
var mainMenu = $(`
    <ul>
        <li class="work"><a href="../work/work0100.html#work">작업관리</a></li>
        <li class="list"><a href="../list/list0100.html#list">화면목록</a></li>
        <li class="cont"><a href="../cont/cont0100.html">권한관리</a></li>
        <li class="file"><a href="../file/file0100.html">파일관리</a></li>
    </ul>
`);

$(document).ready(function () {
    
    mainMenu.find('.'+path).find('a').addClass('on').parent().siblings('li').find('a').removeClass('on');

    $('.header').find('nav').html(mainMenu);

    SelectList('.select_list');

    FileAttach('#file-attach');

    $('.datepick').focus(function () {
        $('.edit_pop').show();
    });

    $('.con_menu_list').on('click', '.btn_minus', function () {
        var child = $(this).attr('aria-controls');

        $('#'+child).hide();

        $(this).addClass('btn_plus').removeClass('btn_minus');
    });

    $('.con_menu_list').on('click', '.btn_plus', function () {
        var child = $(this).attr('aria-controls');

        $('#'+child).show();

        $(this).addClass('btn_minus').removeClass('btn_plus');
    });

    /** 메뉴추가 */
    $('#add-menu, .add-list-menu').click(function () {
        var popupEl = popup.iaMenuAdd();

        popupEl.appendTo('body');

        //function attachEvent(eEl) {
        popupEl.find('.btn_pop_close, .btn_large_type02').click(function () {
            popupEl.remove();
        });
    
        popupEl.find('.btn_large_type01').click(function () {
            popupEl.remove();

            var completePopup = popup.iaMenuAddComplete();

            completePopup.appendTo('body');
     
            completePopup
            .find('.btn_pop_close, .btn_large_type01')
            .click(function () {
                completePopup.remove();
            });
        });
    });

    /** 메뉴 수정 */
    $('.left_con_area .btn_edit_area, .con_area .btn_edit_area').find('.write').click(function (e) {
        e.stopPropagation();

        var popupEl = popup.iaMenuModify();

        popupEl.appendTo('body');

        popupEl.find('.btn_pop_close, .btn_large_type02').click(function () {
            popupEl.remove();
        });

        popupEl.find('.btn_large_type01').click(function () {
            popupEl.remove();

            var completePopup = popup.iaMenuModifyComplete();

            completePopup.appendTo('body');
     
            completePopup
            .find('.btn_pop_close, .btn_large_type01')
            .click(function () {
                completePopup.remove();
            });
        });
    });

    /** 메뉴 삭제 */
    $('.left_con_area .btn_edit_area, .con_area .btn_edit_area').find('.delete').click(function (e) {
        e.stopPropagation();
        
        var popupEl = popup.iaMenuDelete();

        popupEl.appendTo('body');

        popupEl.find('.btn_pop_close, .btn_large_type02').click(function () {
            popupEl.remove();
        });

        popupEl.find('.btn_large_type01').click(function () {
            popupEl.remove();

            var completePopup = popup.iaMenuDeleteComplete();

            completePopup.appendTo('body');
     
            completePopup
            .find('.btn_pop_close, .btn_large_type01')
            .click(function () {
                completePopup.remove();
            });
        });
    });

    /** 할일 팝업 뷰 */
    $('#open-todo-list').click(function () {
        $('#todo-list').show();

        $('#todo-list').find('.modal_layer_right').animate({
            right: 0
        });
    });

    $('#todo-list').find('.btn_pop_close').click(function () {
        $('#todo-list').find('.modal_layer_right').animate({
            right: '-100%'
        }, function () {
            $('#todo-list').hide();
        });
    });

    $('.work_factor').find('a').click(function (e) {
        e.preventDefault();

        if ($(this).closest('.work_factor').hasClass('request')) {
            var popupEl = popup.workRequestList();
            popupEl.appendTo('body');

            popupEl.find('.btn_large_type01').click(function () {
                localStorage.setItem('workAccept', 'ok');

                $('#new-request-panel').hide();
                $('#new-working-panel').show();

                popupEl.remove();
            });
            closePopup(popupEl);
        }
        else if($(this).closest('.work_factor').hasClass('working')) {
            var popupEl = popup.workingList2();
            popupEl.appendTo('body');

            closePopup(popupEl);

            // 검수요청
            popupEl.find('.btn-request-confirm').click(function () {
                if($(this).closest('li').hasClass('ing')) {
                    $(this).addClass('on').parent().siblings('.edit_pop').show();
                    $(this).siblings('.date').show();
                }
            });// end

            // 검수요청 완료상태 에서 수정요청으로 변경
            popupEl.find('.btn-request-edit').click(function () {
                $(this).closest('.edit_pop')
                .siblings('.work_step_check')
                .find('.btn-request-confirm')
                .siblings('input:checkbox')
                .attr('checked', false);

                $(this).closest('.edit_pop')
                .siblings('.work_step_check')
                .find('.btn-request-confirm')
                .siblings('label')
                .text('검수요청');
                // $(this).closest('.action-area').css('display', 'none');
                // $(this).closest('.action-area').siblings('.date').hide();
                $(this).closest('.edit_pop').hide();
            });// end

            // 검수확인
            popupEl.find('.btn-confirm-ok').click(function () {
                $(this).closest('.edit_pop').siblings('.work_step_check').find('.btn-request-confirm').siblings('label').text('검수완료').addClass('on');
                $(this).closest('.edit_pop').siblings('.work_step_check').find('.btn-request-confirm').hide();
                $(this).closest('.edit_pop').siblings('.work_step_check').find('.btn-request-confirm').siblings('input:checkbox').attr('disabled', true);
                $(this).closest('.action-area').siblings('.date').show();

                $(this).closest('.edit_pop').closest('li').removeClass('ing').addClass('end');
                $(this).closest('.edit_pop').closest('li').next('li').addClass('ing');

                $(this).closest('.edit_pop').hide();

                // console.log($(this).closest('li').children('span').text())

                if($(this).closest('li').children('span').text() == '퍼블') {
                    localStorage.setItem('workComplete', 'ok');

                    popupEl.find('.btn-complete-confirm').show();
                }

                popupEl.find('.btn-complete-confirm').click(function () {
                    $('#new-working-panel').hide();
                    $('#new-complete-panel').show();
                    popupEl.remove();
                });

            });// end

            popupEl.find('.btn-all-confirm-cancel').click(function () {
                popupEl.find('.end, .ing')
                    .not(':first')
                    .removeClass('end ing')
                    .find('input:checkbox')
                    .attr({'disabled': false, 'checked': false})
                    .siblings('label')
                    .text('검수요청');

                popupEl.find('.end').next('li').addClass('ing');

                popupEl.find('.btn-request-confirm').css('display', '');
            });

            popupEl.find('.btn-add-and-edit').click(function () {
                var popEl2 = popup.workRequestChange();
                popEl2.appendTo('body');

                popEl2.find('.check-all').change(function () {
                    if($(this).prop('checked')) {
                        $(this).closest('.inner').siblings('ul').find('input:checkbox').prop('checked', true);
                    }
                    else {
                        $(this).closest('.inner').siblings('ul').find('input:checkbox').prop('checked', false);
                    }
                });

                popEl2.find('.selected-complete, .btn_pop_close').click(function () {
                    popEl2.remove();
                });
            });

            popupEl.find('#up-file').on('change', function () {
                $(this).val();

                var addF = `<li>
                                <strong>trns010011.html</strong>
                                <em>2021.05.28</em>
                                <a href="#none" class="btn_text down">다운로드</a>
                            </li>`;

                $(this).parent().next().append(addF);
                
                // $(this).find('input[type="file"]').click();
            });// end


        }
        else if($(this).closest('.work_factor').hasClass('complete')) {
            // var popupEl = popup.workCompleteList();
            // popupEl.appendTo('body');

            // closePopup(popupEl);

            // popupEl.on('click', '.btn_minus', function () {
            //     var child = $(this).attr('aria-controls');
        
            //     $('#'+child).hide();
        
            //     $(this).addClass('btn_plus').removeClass('btn_minus');
            // });
        
            // popupEl.on('click', '.btn_plus', function () {
            //     var child = $(this).attr('aria-controls');
        
            //     $('#'+child).show();
        
            //     $(this).addClass('btn_minus').removeClass('btn_plus');
            // });

            // popupEl.on('click', '#step1-complete', function (e) {
            //     e.preventDefault();

            //     popupEl.find('.work_check').eq(0).hide();
            //     popupEl.find('.work_check').eq(1).show();
            // });

            // popupEl.on('click', '#step2-complete', function (e) {
            //     e.preventDefault();

            //     popupEl.find('.work_check').eq(0).hide();
            //     popupEl.find('.work_check').eq(1).hide();
            //     popupEl.find('.work_result').show();
            // });

            // popupEl.on('click', '.ins-complete', function (e) {
            //     e.preventDefault();

            //     popupEl.find('.complete_area').show();

            //     // popupEl.find('.work_check').eq(0).hide();
            //     // popupEl.find('.work_check').eq(1).hide();
            //     // popupEl.find('.work_result').hide();

            //     popupEl.find('.work_pop_wrap').hide();
            // });

            // popupEl.on('click', '#step-confirm', function () {
            //     popupEl.remove();
            // })
        }
    }); // end

    $('#late_list').find('.list').click(function (e) {
        e.preventDefault();
        // e.stopImmediatePropagation ();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).siblings('.grey_list_type').hide();
        }
        else {
            $(this).addClass('active');
            $(this).siblings('.grey_list_type').show();
        }
    }); // end

    $('#late_list').find('.delete').click(function (e) {
        e.preventDefault();
        // e.stopPropagation();
        e.stopImmediatePropagation ();

        var popupEl = popup.deleteChannel();

        popupEl.appendTo('body');

        popupEl.find('.btn_large_type02, .btn_pop_close').click(function () {
            popupEl.remove();
        });

        popupEl.find('.btn_large_type01').click(function () {
            location.href = 'chan0300.html#chan';
        });
    }); // end

    $('#late_list').find('.write').click(function (e) {
        e.preventDefault();
        // e.stopPropagation();
        e.stopImmediatePropagation ();

        location.href = 'chan0200.html#chan';
    }); // end

    $('#btn-ins-request').click(function () {
        var popupEl = popup.insRequest();

        popupEl.appendTo('body');

        popupEl.find('.ins-complete').click(function () {
            popupEl.find('.work_pop_wrap').hide();
            popupEl.find('.complete_area').show();
        });//end

        popupEl.find('.btn_pop_close').click(function () {
            popupEl.remove();
        }); //end

        popupEl.find('.complete_area').find('.btn_large_type01').click(function () {
            popupEl.remove();
        }); //end

        popupEl.find('.btn-move-confirm').click(function () {
            popupEl.remove();

            var popEl2 = popup.workingList2();

            popEl2.appendTo('body');

            closePopup(popEl2);

            popEl2.find('.ing').find('.action-area').css('display', 'flex');
            popEl2.find('.ing').find('.btn-request-confirm').addClass('on');

            // 검수요청
            popEl2.find('.btn-request-confirm').click(function () {
                if($(this).closest('li').hasClass('ing')) {
                    $(this).addClass('on').siblings('.action-area').css('display', 'flex');
                    $(this).siblings('.date').show();
                }
            });// end

            // 검수요청 완료상태 에서 수정요청으로 변경
            popEl2.find('.btn-request-edit').click(function () {
                $(this).closest('.action-area').siblings('.btn-request-confirm').removeClass('on').text('검수요청');
                $(this).closest('.action-area').css('display', 'none');
                $(this).closest('.action-area').siblings('.date').hide();
            });// end

            // 검수확인
            popEl2.find('.btn-confirm-ok').click(function () {
                $(this).closest('.action-area').siblings('.btn-request-confirm').text('검수완료').addClass('on');
                $(this).closest('.action-area').css('display', 'none');
                $(this).closest('.action-area').siblings('.date').show();

                $(this).closest('li').removeClass('ing').addClass('end');
                $(this).closest('li').next('li').addClass('ing');

                console.log($(this).closest('li').children('span').text())

                if($(this).closest('li').children('span').text() == '퍼블') {
                    localStorage.setItem('workComplete', 'ok');
                }
            });// end

            popEl2.find('#up-file').on('change', function () {
                $(this).val();

                var addF = `<li>
                                <strong>trns010011.html</strong>
                                <em>2021.05.28</em>
                                <a href="#none" class="btn_text down">다운로드</a>
                            </li>`;

                $(this).parent().next().append(addF);
                
                // $(this).find('input[type="file"]').click();
            });// end
        })
    });

    $('.work-inspection').click(function () {
        location.href = 'work0200.html#work';
    }); //end

    $('.check-group-ins').on('change', function () {

        $(this).parent().siblings('.check-group').find('.check-group-ins').prop('checked', false);
     
        var popupEl = popup.workRequestChange();

        popupEl.appendTo('body');

        popupEl.on('click', '.btn_minus', function () {
            var child = $(this).attr('aria-controls');
    
            $('#'+child).hide();
    
            $(this).addClass('btn_plus').removeClass('btn_minus');
        });
    
        popupEl.on('click', '.btn_plus', function () {
            var child = $(this).attr('aria-controls');
    
            $('#'+child).show();
    
            $(this).addClass('btn_minus').removeClass('btn_plus');
        });//end

        popupEl.on('click', '.btn_pop_close', function () {
            popupEl.remove();
        }); //end

        popupEl.on('click', '.selected-complete', function () {
            popupEl.remove();
        });// end

        // 체크
        popupEl.on('click', '.check-all', function () {
            
            if($(this).prop('checked')) {
                $(this).closest('.inner').siblings('ul').find('input:checkbox').prop('checked', true);
            }
            else {
                $(this).closest('.inner').siblings('ul').find('input:checkbox').prop('checked', false);
            }
        });

        $('#select-menu-area').hide();
      
        
    }); //end

    $('.btn-mobile-view').click(function () {
        $('.mobile_view').find('p').hide();

        var url = $(this).attr('data-url');

        $('#html-view-area').attr('src', url);
        setTimeout(function () {
            $('#html-view-area').show();
        }, 50);

    }); //end

    $('.mobile_view').resizable({
        minWidth: 360,
        minHeight: 640,
        start: function(event, ui) {
            $('#html-view-area').css('pointer-events', 'none');
        },
        stop: function (event, ui) {
            $('#html-view-area').css('pointer-events', 'auto');
        }
    });

    // 권한수정
    $('#btn-edit-cont').click(function () {
        var popEl = popup.contManage();

        popEl.appendTo('body');

        popEl.find('.btn_pop_close, .btn_large_type02, .btn_large_type01').click(function () {
            popEl.remove();
        });
    });

    // 수정이력 팝업
    $('.btn_history').on('click', function () {
        var popEl = popup.changeHistory();

        popEl.appendTo('body');

        popEl.find('.btn_pop_close').click(function () {
            popEl.remove();
        });


        popEl.find('.history-detail').click(function () {
            popEl.remove();

            var popEl2 = popup.workingList2();

            popEl2.appendTo('body');

            closePopup(popEl2);

            popEl2.find('.ing').find('.action-area').css('display', 'flex');
            popEl2.find('.ing').find('.btn-request-confirm').addClass('on');

            // 검수요청
            popEl2.find('.btn-request-confirm').click(function () {
                if($(this).closest('li').hasClass('ing')) {
                    console.log('sdss')
                    $(this).addClass('on').parent('.work_step_check').siblings('.edit_pop').show();
                    $(this).siblings('.date').show();
                }
            });// end

            // 검수요청 완료상태 에서 수정요청으로 변경
            popEl2.find('.btn-request-edit').click(function () {
                $(this).closest('.action-area').siblings('.btn-request-confirm').removeClass('on').text('검수요청');
                $(this).closest('.action-area').css('display', 'none');
                $(this).closest('.action-area').siblings('.date').hide();
            });// end

            // 검수확인
            popEl2.find('.btn-confirm-ok').click(function () {
                $(this).closest('.action-area').siblings('.btn-request-confirm').text('검수완료').addClass('on');
                $(this).closest('.action-area').css('display', 'none');
                $(this).closest('.action-area').siblings('.date').show();

                $(this).closest('li').removeClass('ing').addClass('end');
                $(this).closest('li').next('li').addClass('ing');

                console.log($(this).closest('li').children('span').text())

                if($(this).closest('li').children('span').text() == '퍼블') {
                    localStorage.setItem('workComplete', 'ok');
                }
            });// end

            popEl2.find('#up-file').on('change', function () {
                $(this).val();

                var addF = `<li>
                                <strong>trns010011.html</strong>
                                <em>2021.05.28</em>
                                <a href="#none" class="btn_text down">다운로드</a>
                            </li>`;

                $(this).parent().next().append(addF);
                
                // $(this).find('input[type="file"]').click();
            });// end
        });

    });// end



    // 작업완료 더보기
    $('#btn-complete-more').click(function () {
        var popEl = popup.workCompleteMore();

        popEl.appendTo('body');

        popEl.find('.btn_pop_close').click(function () {
            popEl.remove();
        }); //end
    });


    // 미리보기 화면 리사이즈
    $('.resize-viewer').on('change', function () {
        var size = $(this).val();

        $('.mobile_view').width(size);
    });
});

function closePopup(el) {
    el.find('.btn_pop_close').click(function () {
        el.remove();
    });
};

function SelectList (selector) {
    var el = $(selector);
    el
    .find('.active')
    .css({'cursor': 'pointer'})
    .click(function (e) {
        $(this).next('.option-list').show();
    });


    var optionList = el.find('.option-list');

    optionList.find('a')
    .click(function () {
        el.find('.active').html($(this).parent().html());
        optionList.hide();
    });
}

function FileAttach(selector) {
    var el = $(selector);
    
    var addListElement = $(`
        <li>
            <span>2021.04.21</span>
            <strong>IA_구조도_v1.1.xlsx</strong>
            <div class="btn_edit_area">
                <a href="#none"class="btn_small01 download">다운로드</a>
                <a href="#none"class="btn_small01 reload">IA목록으로 적용하기</a>
                <a href="#none"class="btn_small01 delete">삭제</a>
            </div>
        </li>
    `);
    var iaList = $('.ia-list');

    el.click(function () {
        var popupEl = popup.iaFileUpload();
        $('body').append(popupEl);

        attachEvent(popupEl);
        // popupEl.show();
    });

    function attachEvent(eEl) {
        eEl.find('.btn_pop_close, .btn_large_type02').click(function () {
            eEl.remove();
        });
    
        eEl.find('.btn-confirm').click(function (e) {
            e.stopPropagation();

            eEl.find('.complete_area').removeClass('file_up');
            eEl.find('.msg-area').text('파일 업로드가 완료되었습니다.');

            $(this).addClass('btn-complete-upload').removeClass('btn-confirm');
            iaList.append(addListElement);

            $(this).hide();
            eEl.find('#btn-complete-upload').show();
            // eEl.find('.btn_large_type01').off('click');
        });

       eEl.on('click', '#btn-complete-upload', function () {
           console.log('ss')
            eEl.remove();
       });
    }
}