define(['jcookie'], function() {
    return {
        init: function() {
            // 数据渲染
            let $sid = location.search.substring(1).split('=')[1];
            if (!$sid) {
                $sid = 1;
            }
            $.ajax({
                    url: 'http://192.168.13.11/xiaomi/php/getsid.php',
                    data: {
                        sid: $sid
                    },
                    dataType: 'json'
                })
                .done(function(data) {
                    let $objdata = data
                    let picarr = $objdata.piclisturl.split(',');
                    let $str1 = '';
                    let $str2 = '';
                    let num = 1
                    $.each(picarr, function(index, value) {
                        num--
                        $str1 += `
                        <li style="z-index:${num} ;" class="lunbo_pic">
                            <img  class="smallpic" src="${value}"  alt="">
                        </li>
                        `;
                        // $str2 += `
                        // <li class="index">${value}</li>
                        // `;
                    });
                    $('h2').attr('sid', data.sid)
                    $('.smallpic_box').html($str1);
                    $('h2').html($objdata.title);
                    $('.mi_price').html($objdata.price);

                });

            // 轮播图
            (function() {

                let index = 0;
                let $timer = null;
                // 移入改变样式
                $('.mi_left').hover(function() {
                    $('.mi_left').css({
                        background: '#757575',
                        color: '#fff'
                    })
                }, function() {
                    $('.mi_left').css({
                        background: '',
                        color: ''
                    })
                });
                $('.mi_right').hover(function() {
                    $('.mi_right').css({
                        background: '#757575',
                        color: '#fff'
                    })
                }, function() {
                    $('.mi_right').css({
                        background: '',
                        color: ''
                    })
                });
                $('.index').hover(function() {
                    $(this).css({

                        background: '#757575',
                    })
                }, function() {
                    $(this).css({
                        background: '#ccc',
                    })
                });
                // 六个小杠杠
                $('.index').on('click', function() {
                        console.log(1);
                        index = $(this).index();
                        $(this).addClass('actives').siblings('.index').removeClass('actives')
                        $('.lunbo_pic').eq($(this).index()).stop(true).animate({
                            opacity: 1
                        }).siblings('.lunbo_pic').stop(true).animate({
                            opacity: 0
                        })

                    })
                    //     // 箭头切换

                $('.mi_left').on('click', function() {
                    index++
                    if (index > $('.index').length - 1) {
                        index = 0
                    }
                    $('.index').eq(index).addClass('actives').siblings('.index').removeClass('actives')
                    $('.lunbo_pic').eq(index).stop(true).animate({
                        opacity: 1
                    }).siblings('.lunbo_pic').stop(true).animate({
                        opacity: 0
                    })
                })
                $('.mi_right').on('click', function() {
                        index--
                        if (index < 0) {
                            index = $('.index').length - 1
                        }
                        $('index').addClass('actives').siblings('.index').removeClass('actives')
                        $('.lunbo_pic').eq(index).stop(true).animate({
                            opacity: 1
                        }).siblings('.lunbo_pic').stop(true).animate({
                            opacity: 0
                        })
                    })
                    // 自动播放
                $('.xiangqing_pic').hover(() => {
                    clearInterval($timer)
                }, () => {
                    $timer = setInterval(() => {
                        $('.mi_left').trigger('click')
                    }, 5000)
                })
                $timer = setInterval(() => {
                    $('.mi_right').trigger('click')
                }, 5000)
            })();


            (function() {
                let arrsid = []
                let arrnum = []

                function cookie() {
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        arrsid = $.cookie('cookiesid').split(',')
                        arrnum = $.cookie('cookienum').split(',')
                    } else {
                        arrsid = []
                        arrnum = []
                    }
                }

                $('.add a').on('click', function() {
                    let $sid = $(this).parents('.xiangqing_box').find('h2').attr('sid');


                    cookie();
                    if ($.inArray($sid, arrsid) != -1) {
                        let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + 1;
                        arrnum[$.inArray($sid, arrsid)] = $num;
                        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                    } else {

                        arrsid.push($sid);
                        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                        arrnum.push(1);
                        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                    }
                });
            })()



        }
    }
});