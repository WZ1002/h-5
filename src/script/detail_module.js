define(['jcookie'], function() {
    return {
        init: function() {
            // 数据渲染
            let $sid = location.search.substring(1).split('=')[1];
            if (!$sid) {
                $sid = 1;
            }
            $.ajax({
                    url: 'http://127.0.0.1/xiaomi/php/getsid.php',
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
                        console.log(value)
                        num--
                        console.log(num)
                        $str1 += `
                        <li style="z-index:${num} ;" class="lunbo_pic">
                            <img  class="smallpic" src="${value}" alt="">
                        </li>
                        `;
                        // $str2 += `
                        // <li class="index">${value}</li>
                        // `;
                    });

                    $('.smallpic_box').html($str1);
                    // $('.cut').html($str2);
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
                        console.log(1);
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

            // 点击加入购物车
            (function() {
                let arrsid = []; //存储商品的编号。
                // let arrnum = []; //存储商品的数量。
                //3.点击加入购物车按钮(确定是第一次点击还是多次点击)
                //第一次点击：在购物车列表页面创建商品列表
                //多次点击：之前创建过商品列表，只需要数量增加。

                //取出cookie,才能判断是第一次还是多次点击
                function cookietoarray() {
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]

                    } else {
                        arrsid = [];

                    }
                }



                $('.add a').on('click', function() {
                    //获取当前商品对应的sid
                    let $sid = $(this).parents('.lunbo_pic').find('.smallpic').attr('sid');

                    cookietoarray();
                    if ($.inArray($sid, arrsid) != -1) { //$sid存在，商品列表存在，数量累加

                        let $num = parseInt(arrnum[$.inArray($sid, arrsid)]); //取值
                        arrnum[$.inArray($sid, arrsid)] = $num; //赋值
                        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                    } else {
                        //第一次点击加入购物车按钮,将商品的sid和商品的数量放到提前准备的数组里面，然后将数组传入cookie.
                        arrsid.push($sid); //将编号$sid push到arrsid数组中
                        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });

                    }
                    alert('按钮触发了');
                });
            })();
        }
    }
});