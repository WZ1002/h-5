define(['jquery'], function() {
    return {
        init: function() {
            //数据渲染
            (function() {
                $.ajax({
                        url: 'http://192.168.13.50/xiaomi/php/index1.php',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        let $str = '';
                        $.each(data, function(index, value) {
                            if (index === 0 && index < 1) {
                                $str = `
                                
                                <a href="">
                                    <li class="left">
                                        <img src="${value.url}" alt="">
                                    </li>
                                </a>
                                <a href="">
                                    <li class="right">
                                        <p class="title">${value.title}</p>
                                        <p class="main">120Hz弹窗全面屏，天玑1000+旗舰处理器，索尼6400万四摄</p>
                                        <p class="bottom"><strong>${value.price}</strong>元起</p>
                                    </li>
                                </a>
                                `;
                            }
                        });
                        $('.list').html($str)
                    })
                    .done(function(data) {
                        let $str1 = '';
                        $.each(data, function(index, value) {
                            $str1 += `
                        
                            <a href="">
                                <li class="mains">
                                    <div class="main-top">
                                        <img src="${value.url}" alt="">
                                    </div>
                                    <div class="main-bottom">
                                        <p class="titles">${value.title}</p>
                                        <p class="main-tow">120Hz弹窗全面屏，天玑1000+旗舰处理器，索尼6400万四摄</p>
                                        <p class="bottoms"><strong>${value.price}</strong>元起</p>
                                    </div>
                                </li>
                            </a>
                    
                 
                            `;

                        });
                        $('.lists').html($str1)
                    })

            })();
        }
    };
});