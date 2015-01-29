(function($) {
    if ($('.page-setting').length) {

        /**
         * 验证form
         */
        //基本信息
        var validate1 = {
            name: {
                identifier: 'name',
                rules: [{
                    type: 'empty',
                    prompt: '请输入名称'
                }]
            }
        };

        $('.ui.form').form(validate1, {
            onSuccess: function() {
                $('#basicForm')[0].submit();
                return false;
            },
            onFailure: function() {
                return false;
            }
        });

    }
})(window.jQuery);
