define([], function() {
    return {
        init: function() {

            let userflag = true;


            // submit.disabled = false;
            $('.form-control').on('blur', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://192.168.13.11/xiaomi/php/yanzheng.php',
                    data: {
                        user: $('#username').val(),
                    },

                }).done(function(data) {

                    if (!data) {
                        $('.username').html('√');
                        $('.username').css({
                            color: 'green'
                        })
                        userflag = true;
                        $('.btn-block').disabled = false;
                    } else {
                        $('.username').html('用户已存在');
                        $('.username').css({
                            color: 'red'
                        })
                        userflag = false;
                        $('.btn-block').disabled = false;
                    }
                })

                pd()
            })
            $('#password').on('input', function() {
                pd()
            })
            $('#email').on('input', function() {
                pd()
            })
            $('.btn-block').on('click', function() {

                $.ajax({
                    type: 'post',
                    url: 'http://192.168.13.11/xiaomi/php/registry.php',
                    data: {
                        user: $('#username').val(),
                        pass: $('#password').val(),
                        email: $('#email').val()
                    }
                })
                location.href = 'login.html';
            })

            function pd() {
                if ($('#username').val() === '' || $('#password').val() === '' || $('#email').val() === '') {
                    $('.btn-block').attr("disabled", true)
                } else {
                    $('.btn-block').attr("disabled", false)
                }
            }



        }
    }

});