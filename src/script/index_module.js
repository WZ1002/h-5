define(['jquery'], function() {
    return {
        init: function() {
            //数据渲染
            (function() {
                const $div = $('.phone-kind');
                const $ul = $('.home-appliances');
                const $phone = $('.phone-span img');
                const $oUl = $('.qie-tow');
                $.ajax({
                        url: 'http://192.168.13.50/xiaomi/php/index1.php',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        let $str = '';
                        $.each(data, function(index, value) {
                            if (index === 1 || index < 8) {
                                $str += `
                                <li>
                                <a href="">
                                    <div class="tupian"><img src="${value.url}" alt=""></div>
                                    <p>${value.title}</p>
                                    <p>双模5G，骁龙865，弹出全面屏</p>
                                    <p>${value.price}元</p>
                                </a>
                            </li>`
                            }
                            if (index === 0) {
                                $phone.attr('src', value.url);
                            }
                        });
                        $div.html($str)
                    })
                    .done(function(data) {
                        let $str1 = '';

                        $.each(data, function(index, value) {
                            if (index > 8 && index <= 16) {
                                $str1 += `
                                <li>
                                <a href="">
                                    <div class="tupian"><img src="${value.url}" alt=""></div>
                                    <p>${value.title}</p>
                                    <p>大屏更享受</p>
                                    <p>${value.price}元</p>
                                </a>
                            </li>
                            `;
                            }
                        });
                        $ul.html($str1)

                    })
                    .done(function(data) {
                        let $str2 = '';

                        $.each(data, function(index, value) {
                            if (index > 10 && index <= 18) {
                                $str2 += `
                                <li>
                                <a href="">
                                    <div class="tupian"><img src="${value.url}" alt=""></div>
                                    <p>${value.title}</p>
                                    <p>大屏更享受</p>
                                    <p>${value.price}元</p>
                                </a>
                            </li>
                            `;
                            }
                        });
                        $oUl.html($str2)
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
                const $btns = $('.swiper-home .qie');
                const $divs = $('.home-appliances');


                $btns.on('mousemove', function() {
                    $(this).addClass('qiehuan').siblings('.qie').removeClass('qiehuan');
                    $divs.eq($(this).index()).show().siblings('.home-appliances').hide();
                    console.log($(this))
                    $(this).css({
                        color: 'red'
                    })
                });
            })();
        }
    };
});