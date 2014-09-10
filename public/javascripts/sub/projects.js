(function($) {
    if ($('.page-projects').length) {

        //“新增项目”按钮的点击事件
        $('#btnAddProject').on('click', function() {

        	$('.sidebar-project .header').text('新增项目');
        	$('#formProject').data('action', 'create');

            $('.sidebar-project')
                .sidebar({
                    overlay: true
                })
                .sidebar('toggle');
        });

        /**
         * 验证form
         */
        var validationRules = {
            name: {
                identifier: 'name',
                rules: [{
                    type: 'empty',
                    prompt: '请输入项目名称'
                }]
            }
        };

        $('#formProject').form(validationRules, {
            onSuccess: function() {
                submitProject();
                return false;
            },
            onFailure: function() {
                return false;
            }
        });

        /**
         * 提交form
         * form action = create || update
         */
        function submitProject() {
        	$.myAjax({
                url: '/projects/'+ $('#formProject').data('groupid') + '/' + $('#formProject').data('action'),
                data: $('#formProject').serialize(),
                beforeSend: function() {
                    $('#btnAddProject').addClass('loading');
                },
                success: function(data) {
                    if (data.status) { //成功
                        window.location.reload();
                    } else { //失败
                        $('.msg-project-form').html($.errMsg(data.result)).show();
                    }
                },
                error: function() {
                    $('.msg-project-form').text('提交失败，请稍后重试').show();
                },
                complete: function() {
                    $('#btnAddProject').removeClass('loading');
                }
            });
        }




    }
})(window.jQuery);
