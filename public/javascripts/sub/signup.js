(function($) {
    if ($('.page-signup').length) {
        /**
         * 验证form
         */
        var validationRules = {
            email: {
                identifier: 'email',
                rules: [{
                    type: 'email',
                    prompt: '请输入正确的邮箱'
                }]
            },
            name: {
                identifier: 'name',
                rules: [{
                    type: 'empty',
                    prompt: '请输入名称'
                }]
            },
            pwd: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: '请输入密码'
                }, {
                    type: 'length[6]',
                    prompt: '密码不能少于6个字符'
                }]
            },
            cpwd: {
                identifier: 'confirmPassword',
                rules: [{
                    type: 'match[password]',
                    prompt: '密码不一致'
                }]
            },
        };

        $('.ui.form').form(validationRules, {
            onSuccess: function() {
                submitForm();
                return false;
            },
            onFailure: function() {
                $('.ui.form').transition('shake');
                return false;
            }
        });

        /**
         * 提交form
         */
        function submitForm() {
            $.myAjax({
                url: '/signup',
                data: $('.ui.form').serialize(),
                beforeSend: function() {
                    $('.button.submit').addClass('loading');
                },
                success: function(data) {
                    if (data.status) { //成功
                        $.tipModal({
                            title: '注册成功!',
                            content: '去<a href="/">登录</a>爽一爽吧～',
                            expire: -1
                        });
                    } else { //失败
                        $('.message.error').html($.errMsg(data.result)).show();
                    }
                },
                error: function() {
                    $('.message.error').text('提交失败，请稍后重试').show();
                },
                complete: function() {
                    $('.button.submit').removeClass('loading');
                }
            });
        }

    }
})(window.jQuery);
