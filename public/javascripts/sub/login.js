(function($) {
    if ($('.page-login').length) {

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
            pwd: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: '请输入密码'
                }]
            }
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
                url: '/login',
                data: $('.ui.form').serialize(),
                beforeSend: function() {
                    $('.button.submit').addClass('loading');
                },
                success: function(data) {
                    if (data.status) { //成功
                        location.href = '/projects/' + data.result.group_id;
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
