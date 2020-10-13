$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    //获取layui中的form元素
    var form = layui.form;
    var layer = layui.layer;
    //使用 form.verify（）自定义校验规则
    form.verify({
        //定义了一个pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //验证两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '密码不一致'
            }
        }
    });
    //监听注册表单的提交事件
    $('#form_id').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        };
        $.post('/api/reguser', data,
            function (reg) {
                if (reg.status !== 0) {

                    return layer.msg(reg.message);
                }
                layer.msg('注册成功');
                $('#link_login').click()


            })

    });
    //监听登陆表单
    $('#login-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功');
               localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })

})