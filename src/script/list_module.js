define(['pagination', 'jlazyload'], function() {
    return {
        init: function() {
            //1.数据渲染
            //排序的变量
            let array_default = [];
            let array = [];
            let prev = null;
            let next = null;

            $.ajax({
                url: 'http://127.0.0.1/xiaomi/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                console.log(data)
                let $str = '';
                let $str1 = '';
                $.each(data, function(index, value) {
                    $str = `
                    
                    <li class="left">
                    <a  href="detail.html?sid=${value.sid}" target="_blank">
                    <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                    </a>
                </li>
        
                <li class="right">
                <a href="detail.html?sid=${value.sid}" target="_blank">
                        <p class="title">${value.title}</p>
                        <p class="main">120Hz弹窗全面屏，天玑1000+旗舰处理器，索尼6400万四摄</p>
                        <p class="bottom"><strong>${value.price}</strong>元起</p>
                        </a>
                </li>
           
                    `;
                });
                $.each(data, function(index, value) {
                    $str1 += `
                   
                    <li class="mains">
                    <a  class="include" href="detail.html?sid=${value.sid}" target="_blank">
                        <div class="main-top">
                        <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                        </div>
                        <div class="main-bottom">
                            <p class="titles">${value.title}</p>
                            <p class="main-tow">120Hz弹窗全面屏，天玑1000+旗舰处理器，索尼6400万四摄</p>
                            <p class="bottoms"><strong class="price">${value.price}</strong>元起</p>
                        </div>
                    </a>
                </li>
                    `;
                });
                $('.list').html($str);
                $('.lists').html($str1);

                array_default = [];
                array = [];
                prev = null;
                next = null;

                $('.lists li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });

                //懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
            });

            $('.page').pagination({
                pageCount: 3,
                jump: true,
                coping: true,
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function(api) {
                    console.log(api.getCurrent());
                    $.ajax({
                        url: 'http://192.168.13.11/xiaomi/php/listdata.php',
                        data: {
                            page: api.getCurrent()
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        console.log(data)
                        let $str1 = '';
                        $.each(data, function(index, value) {
                            $str1 += `
                            <li class="mains">
                            <a href="" class="include">
                                <div class="main-top">
                                <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                                </div>
                                <div class="main-bottom">
                                    <p class="titles">${value.title}</p>
                                    <p class="main-tow">120Hz弹窗全面屏，天玑1000+旗舰处理器，索尼6400万四摄</p>
                                    <p class="bottoms"><strong class="price">${value.price}</strong>元起</p>
                                </div>
                            </a>
                        </li>
                            `;
                        });

                        $('.lists').html($str1);


                        array_default = [];
                        array = [];
                        prev = null;
                        next = null;

                        $('.lists li').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    });
                }
            });


            //3.排序
            //默认排序
            $('button').eq(0).on('click', function() {

                $.each(array_default, function(index, value) {
                    $('.lists').append(value);
                });
                return;
            });

            //升序
            $('button').eq(1).on('click', function() {
                // console.log(1);
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {

                        prev = parseFloat(array[j].find('.price').html());
                        next = parseFloat(array[j + 1].find('.price').html());

                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function(index, value) {
                    console.log(array[index].find('.price').html())
                    $('.lists').append(value);
                });
            });
            // 降序
            $('button').eq(2).on('click', function() {
                // console.log(1);
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {

                        prev = parseFloat(array[j].find('.price').html());
                        next = parseFloat(array[j + 1].find('.price').html());

                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function(index, value) {
                    console.log(array[index].find('.price').html())
                    $('.lists').append(value);
                });
            });
        }
    }
});