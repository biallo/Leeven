(function($) {

    //成员列表
    if ($('.page-members').length) {

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
            }
        };

        $('.form-add').form(validationRules, {
            onSuccess: function() {
                submitForm();
                return false;
            },
            onFailure: function() {
                $('.form-add').transition('shake');
                return false;
            }
        });

        function submitForm() {
            $.myAjax({
                url: '/members/add',
                data: {
                    email: $('.form-add').find('input[name="email"]').val()
                },
                beforeSend: function() {
                    $('.form-add .submit').addClass('loading');
                },
                success: function(data) {
                    if (data.status) { //成功
                        window.location.reload();
                    } else {
                        $('.form-add .message').html($.errMsg(data.result)).show();
                    }
                },
                complete: function() {
                    $('.form-add .submit').removeClass('loading');
                }
            });
        }

    }

})(window.jQuery);
