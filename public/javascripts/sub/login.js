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
