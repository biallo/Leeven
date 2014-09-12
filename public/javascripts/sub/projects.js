(function($) {
    if ($('.page-projects').length) {

        /**
         * “新增项目”按钮的点击事件
         */
        $('#btnAddProject').on('click', function() {
        	//配置form
            $('.sidebar-project .header').text('新增项目');
            $('#formProject').data('method', 'post');

            //隐藏删除按钮
            $('.del-project').css('display', 'none');

            $('.sidebar-project')
                .sidebar({
                    overlay: true
                })
                .sidebar('show');
        });

        /**
         * “编辑项目”按钮的点击事件
         */
        $('.setting-project').on('click', function() {
        	var _this = $(this);

        	//配置form
        	$('.sidebar-project .header').text('编辑项目');
        	$('#formProject').data('method', 'put');
        	$('#formProject input[name="name"]').val(_this.prev().find('.title').text());
        	$('#formProject textarea[name="description"]').val(_this.prev().find('.description').text());
        	$('#formProject').data('pid', _this.data('pid'));

        	//显示删除按钮
        	$('.del-project').css('display', 'block');

        	$('.sidebar-project')
                .sidebar({
                    overlay: true
                })
                .sidebar('show');

        });


        /**
         * “删除项目”按钮的点击事件
         */
        $('.del-project').on('click', function() {
        	if (confirm('本操作将删除该项目及以下的所有文档，确认删除？')) {
        		//配置form
        		$('#formProject').data('method', 'delete');

        		submitProject();
        	}
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
         * method: post || put || delete
         * url: /project/ + (teaamID || projectID)
         */
        function submitProject() {
        	var method = $('#formProject').data('method'),
        		id = $('#formProject').data('teamid');
        	if(method !== 'post') {
        		id = $('#formProject').data('pid');
        	}

            $.myAjax({
            	type: method,
                url: '/projects/' + id,
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
