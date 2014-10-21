(function($) {

    //团队列表
    if ($('.page-team').length) {
        $('.segment-team').on('click', function() {
            var tid = $(this).data('team');
            $.myAjax({
                url: '/team',
                data: {
                    team_now: tid
                },
                success: function(data) {
                    if (data.status) { //成功
                        window.location.reload();
                    }
                }
            });
        });
    }

    //创建团队
    if ($('.page-team-create').length) {

        /**
         * 验证form
         */
        var validationRules = {
            name: {
                identifier: 'name',
                rules: [{
                    type: 'empty',
                    prompt: '请输入团队名称'
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
