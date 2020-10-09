define(['jlazyload', 'jcookie'], function() {
    return {
        init: function() {

            function showlist(sid, num) { //sid：编号  num：数量
                $.ajax({
                    url: 'http://192.168.13.11/xiaomi/php/alldata.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (sid == value.sid) {
                            // console.log(value)
                            let $clonebox = $('.list_item:hidden').clone(true, true); //克隆隐藏元素
                            $clonebox.find('.item_img>img').attr('src', value.url);
                            $clonebox.find('.item_img>img').attr('sid', value.sid);
                            $clonebox.find('.cart_name').html(value.title);
                            $clonebox.find('.cart_price').html(value.price);
                            $clonebox.find('.count').val(num);
                            // //计算单个商品的价格
                            $clonebox.find('.item_total').html((value.price * num).toFixed(2));

                            $clonebox.css('display', 'block');
                            $('.cart_list').append($clonebox);
                            calcprice(); //计算总价
                        }
                    });

                });
            }

            //2.获取cookie渲染数据
            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                let s = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组[1,2]
                let n = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组[10,20]
                $.each(s, function(index, value) {
                    showlist(s[index], n[index]);
                });
            }

            //计算价格
            function calcprice() {
                let $sum = 0; //商品的件数
                let $count = 0; //商品的总价
                $('.list_item:visible').each(function(index, ele) {
                    if ($(ele).find('.cart_check>input').prop('checked')) { //复选框勾选
                        $sum += parseInt($(ele).find('.count').val());
                        $count += parseFloat($(ele).find('.item_total').html());
                    }
                });
                $('.pay').find('#productNum').html($sum);
                $('.payTotal1').html($count.toFixed(2));
            }

            //4.全选
            $('.allsel').on('change', function() {
                $('.list_item:visible').find('.cart_check>input:checkbox').prop('checked', $(this).prop('checked'));
                $('.allsel').prop('checked', $(this).prop('checked'));
                console.log($('.list_item:visible').find(':checkbox'))
                calcprice(); //计算总价
            });
            let $inputs = $('.list_item:visible').find(':checkbox');
            $('.list_item').on('change', $inputs, function() {
                //$(this):被委托的元素，checkbox
                console.log($('.list_item:visible').find(':checkbox').length)
                console.log($('.list_item:visible').find('input:checked').size())
                if ($('.list_item:visible').find(':checkbox').length === $('.list_item:visible').find('input:checked').size()) {
                    $('.allsel').prop('checked', true);
                } else {
                    $('.allsel').prop('checked', false);
                }
                calcprice(); //计算总价
            });

            //5.数量的改变
            $('.add').on('click', function() {
                let $num = $(this).parents('.list_item').find('.count').val();
                $num++;
                $(this).parents('.list_item').find('.count').val($num);

                $(this).parents('.list_item').find('.item_total').html(calcsingleprice($(this)));
                calcprice(); //计算总价
                setcookie($(this));
            });


            $('.les').on('click', function() {
                let $num = $(this).parents('.list_item').find('.count').val();
                $num--;
                if ($num < 1) {
                    $num = 1;
                }
                $(this).parents('.list_item').find('.count').val($num);
                $(this).parents('.list_item').find('.item_total').html(calcsingleprice($(this)));
                calcprice(); //计算总价
                setcookie($(this));
            });

            $('.count').on('input', function() {
                let $reg = /^\d+$/g; //只能输入数字
                let $value = $(this).val();
                if (!$reg.test($value)) { //不是数字
                    $(this).val(1);
                }
                $(this).parents('.list_item').find('.item_total').html(calcsingleprice($(this)));
                calcprice(); //计算总价
                setcookie($(this));
            });

            function calcsingleprice(obj) { //obj元素对象
                let $dj = parseFloat(obj.parents('.list_item').find('.cart_price').html());
                let $num = parseInt(obj.parents('.list_item').find('.count').val());
                return ($dj * $num).toFixed(2)
            }

            //将改变后的数量存放到cookie中
            let arrsid = []; //存储商品的编号。
            let arrnum = []; //存储商品的数量。
            function cookietoarray() {
                if ($.cookie('cookiesid')) {
                    arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
                    arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
                } else {
                    arrsid = [];
                    arrnum = [];
                }
            }

            function setcookie(obj) {
                cookietoarray();
                let $sid = obj.parents('.list_item').find('img').attr('sid');
                arrnum[$.inArray($sid, arrsid)] = obj.parents('.list_item').find('.count').val();
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
            }


            //删除
            function delcookie(sid, arrsid) { //sid:当前删除的sid  arrsid:存放sid的数组[3,5,6,7]
                let $index = -1; //删除的索引位置
                $.each(arrsid, function(index, value) {
                    if (sid === value) {
                        $index = index;
                    }
                });
                arrsid.splice($index, 1);
                arrnum.splice($index, 1);

                $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
            }
            $('.del_action').on('click', function() {
                cookietoarray();
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.list_item').remove();
                    delcookie($(this).parents('.list_item').find('img').attr('sid'), arrsid);
                    calcprice(); //计算总价
                }
            });


        }
    }

});