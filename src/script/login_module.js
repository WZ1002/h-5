define(['jcookie', 'sha1'], function(jcookie, sha1) {
    return {
        init: function() {

            $('.btn-block').on('click', function() {
                $.ajax({
                        type: 'post',
                        url: 'http://192.168.13.11/xiaomi/php/login.php',
                        data: {
                            user: $('#username').val(),
                            pass: hex_sha1($('#password').val())
                        }
                    })
                    .done((data) => {
                        if (!data) {
                            alert('用户名或者密码错误');
                            $('#username').val('');
                            $('#password').val('');
                        } else {
                            location.href = 'index1.html';
                            $.cookie('username', $('#username').val(), 7);
                        }
                    })
            })
        }
    }

});