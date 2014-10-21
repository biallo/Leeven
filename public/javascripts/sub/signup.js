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
                $('.ui.form')[0].submit();
                return false;
            },
            onFailure: function() {
                $('.ui.form').transition('shake');
                return false;
            }
        });

    }
})(window.jQuery);
