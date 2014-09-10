(function($) {
    if ($('.page-projects').length) {

        //“新增项目”按钮的点击事件
        $('#btnAddProject').on('click', function() {

        	$('.sidebar-project .header').text('新增项目');
        	$('#formProject').data('action', 'add');

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
        function submitProject() {
        	
        }




    }
})(window.jQuery);
