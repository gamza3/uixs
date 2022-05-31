/** 메뉴 설정 */
(function (factory) {
    //this.factory = factory;
    //console.log(Array.prototype.join(arguments));
    this.kjbui = factory(jQuery);
}(function ($) {
    // console.log('menu')

    var nav_html = $(`
        <ul>
            <li class="work"><a href="../work/work0100.html#work">작업관리</a></li>
            <li class="list"><a href="../list/list0100.html#list">화면목록</a></li>
            <li class="cont"><a href="../cont/cont0100.html">권한관리</a></li>
            <li class="file"><a href="../file/file0100.html">파일관리</a></li>
        </ul>
    `);

    function fn_gnb(t) {
        var $this = t;
        // console.log(t)
        setTimeout(function () {
            $($this.selector).html(nav_html);
        });

        // function waitDom() {
        //     return new Promise(function(resolve, reject) {
        //         setTimeout(function () {
        //             resolve($this);
        //         });
        //     });
        // }

        // (async function() {
        //     var that = await waitDom();
        //     console.log('ds')
        //     $($this.selector).html(nav_html);
        // }());
    }
    
    $.fn.kjbGnb = function () {
        // console.log(arguments)
        var $this = $(this);

        fn_gnb($this);
    };

    return {
        gnb: function() {
            
        }
    }
}));



$(document).ready(function () {
    $('.header').find('nav').kjbGnb();

    // $.getJSON(
    //     '../../js/root.json',
    //     function (data) {
    //         $('#ia-list').tree({
    //             data: data,
    //             dragAndDrop: true
    //         });
    //     }
    // );
});
