define(['jquery', 'jlazyload'], function() {
    return {
        init: function() {
            //数据渲染
            (function() {
                const $div = $('.phone-kind');
                const $ul = $('.homeappliances');
                const $phone = $('.phone-span img');
                const $oUl = $('.qie-tow');
                $.ajax({
                        url: 'http://192.168.13.11/xiaomi/php/index1.php',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        let $str = '';
                        $.each(data, function(index, value) {
                            if (index === 1 || index < 8) {
                                $str += `
                                <li>
                                <a href="">
                                    <div class="tupian">
                                    <img class="lazy" data-original="${value.url}"width="200" height="200">
                                    </div>
                                    <p>${value.title}</p>
                                    <p>双模5G，骁龙865，弹出全面屏</p>
                                    <p>${value.price}元</p>
                                </a>
                            </li>
                            `;
                            }
                            if (index === 0) {
                                $phone.attr('src', value.url);
                            }
                        });
                        $div.html($str)
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });
                    })
                    .done(function(data) {
                        let $str1 = '';

                        $.each(data, function(index, value) {
                            if (index > 8 && index <= 16) {
                                $str1 += `
                                <li>
                                <a href="">
                                    <div class="tupian">
                                    <img class="lazy" data-original="${value.url}"width="200" height="200">
                                    </div>
                                    <p>${value.title}</p>
                                    <p>大屏更享受</p>
                                    <p>${value.price}元</p>
                                </a>
                            </li>
                            `;
                            }
                        });
                        $ul.html($str1)
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });
                    })
                    .done(function(data) {
                        let $str2 = '';

                        $.each(data, function(index, value) {
                            if (index > 10 && index <= 18) {
                                $str2 += `
                                <li>
                                <a href="">
                                    <div class="tupian">
                                    <img class="lazy" data-original="${value.url}"width="200" height="200">
                                    </div>
                                    <p>${value.title}</p>
                                    <p>大屏更享受</p>
                                    <p>${value.price}元</p>
                                </a>
                            </li>
                            `;
                            }
                        });
                        $oUl.html($str2)
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });
                    });
            })();
            // 二级菜单
            (function() {
                const $menuli = $('.nav-tow a');
                const $menus = $('.nav-menus');
                const $menu = $('.nav-menu');

                $menuli.on('mouseover', function() {
                    $(this).addClass('active').siblings('.nav-tow li').removeClass('active');
                    $menus.eq($(this).index()).show().siblings('.nav-menus').hide(); //当前和li匹配的item显示，其他的隐藏
                    $menu.show();

                    $(this).css({ background: "#e53935" })
                });
                $menuli.on('mouseout', function() {
                    $(this).css({ background: "none" })
                    $menu.hide();
                });
                $menu.hover(() => {
                    $menu.show();
                    $(this).css({ background: "red" })
                }, () => {
                    $menu.hide();
                    $(this).css({ background: "none" })
                })

            })();
            // tab切换
            (function() {

                const $btns = $('.swiper-home li');
                const $divs = $('.homeappliances');

                $btns.on('mouseover', function() {

                    $(this).addClass('qiehuan').siblings('.qie').removeClass('qiehuan');
                    $divs.eq($(this).index()).show().siblings('.homeappliances').hide();
                    console.log(1);
                    $(this).css({
                        color: '#e53935'
                    })
                });
                $btns.on('mouseout', function() {
                    $(this).css({
                        color: '#000',
                    })
                })
            })();
            // 右回顶部
            (function() {
                const $nav = $('.lump-last');

                $(window).on('scroll', function() {
                    let $top = $(window).scrollTop();
                    if ($top >= 924) {
                        $nav.show();
                    } else {
                        $nav.hide();
                    }
                });
                $nav.on('click', function() {
                    $(window).scrollTop(0);
                })
            })();

            // 轮播图
            (function() {
                const $slideshow = $('.slideshow');
                const $pic = $('.banner li');
                const $btn = $('.btns li');
                const $clickLeft = $('.click-left');
                const $clickRight = $('.click-right');
                let index = 0;
                let $timer = null;
                // 移入改变样式
                $clickLeft.hover(function() {
                    $clickLeft.css({
                        background: '#757575',
                        color: '#fff'
                    })
                }, function() {
                    $clickLeft.css({
                        background: '',
                        color: ''
                    })
                });
                $clickRight.hover(function() {
                    $clickRight.css({
                        background: '#757575',
                        color: '#fff'
                    })
                }, function() {
                    $clickRight.css({
                        background: '',
                        color: ''
                    })
                });
                $btn.hover(function() {
                    $(this).css({
                        background: '#ccc',
                    })
                }, function() {
                    $(this).css({
                        background: '#757575',
                    })
                });
                // 六个小圆圈
                $btn.on('click', function() {
                        index = $(this).index()

                        $(this).addClass('actives').siblings('ol>li').removeClass('actives')
                        $pic.eq($(this).index()).stop(true).animate({
                            opacity: 1
                        }).siblings('.banner li').stop(true).animate({
                            opacity: 0
                        })

                    })
                    // 箭头切换

                $clickRight.on('click', function() {
                    index++
                    if (index > $btn.length - 1) {
                        index = 0
                    }
                    $btn.eq(index).addClass('actives').siblings('ol li').removeClass('actives')
                    $pic.eq(index).stop(true).animate({
                        opacity: 1
                    }).siblings('.banner li').stop(true).animate({
                        opacity: 0
                    })
                })
                $clickLeft.on('click', function() {
                        index--
                        if (index < 0) {
                            index = $btn.length - 1
                        }
                        $btn.eq(index).addClass('actives').siblings(' ol li').removeClass('actives')
                        $pic.eq(index).stop(true).animate({
                            opacity: 1
                        }).siblings('.banner li').stop(true).animate({
                            opacity: 0
                        })
                    })
                    // 自动播放
                $slideshow.hover(() => {
                    clearInterval(timer)
                }, () => {
                    timer = setInterval(() => {
                        $clickRight.trigger('click')

                    }, 5000)
                })
                timer = setInterval(() => {
                    $clickLeft.trigger('click')
                }, 5000)
            })();


            //倒计时
            function djs() {
                let futuretime = new Date('2020-10-10 14:00:00'); //未来时间
                let currenttime = new Date(); //当前时间。
                let time = parseInt((futuretime - currenttime) / 1000); //秒

                // console.log(time);//3459705
                let days = parseInt(time / 86400); //天
                let hours = parseInt(time % 86400 / 3600); //小时
                let mins = parseInt(time % 3600 / 60); //分
                let secs = time % 60;
                return '' + '' + hours + ':' + mins + ':' + secs;
            }

            $('.jishiqi').html(djs());
            //2020-10-1 12:23:45
            setInterval(function() {
                $('.jishiqi').html(djs());
            }, 1000);
        }
    };
});