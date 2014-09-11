(function($) {
	if($('.page-files').length) {

		/**
         * “新增项目”按钮的点击事件
         */
        $('#btnAddFile').on('click', function() {
        	//配置form
            $('.sidebar-file .header').text('新增文档');
            $('#formFile').data('method', 'post');

            //隐藏删除按钮
            $('.del-file').css('display', 'none');

            $('.sidebar-file')
                .sidebar({
                    overlay: true
                })
                .sidebar('show');
        });

        /**
         * “编辑文档”按钮的点击事件
         */
        $('.setting-file').on('click', function() {
        	var _this = $(this);

        	//配置form
        	$('.sidebar-file .header').text('编辑文档');
        	$('#formFile').data('method', 'put');
        	$('#formFile input[name="name"]').val(_this.parent().prev().find('.title').text());
        	$('#formFile').data('fid', _this.data('fid'));

        	//显示删除按钮
        	$('.del-file').css('display', 'block');

        	$('.sidebar-file')
                .sidebar({
                    overlay: true
                })
                .sidebar('show');

        });


        /**
         * “删除文档”按钮的点击事件
         */
        $('.del-file').on('click', function() {
        	if (confirm('确定要删除该文档？')) {
        		//配置form
        		$('#formFile').data('method', 'delete');

        		submitFile();
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
                    prompt: '请输入文档名称'
                }]
            }
        };

        $('#formFile').form(validationRules, {
            onSuccess: function() {
                submitFile();
                return false;
            },
            onFailure: function() {
                return false;
            }
        });

        /**
         * 提交form
         * method: post || put || delete
         * url: /project/ + (projectID || fileID)
         */
        function submitFile() {
        	var method = $('#formFile').data('method'),
        		id = $('#formFile').data('pid');
        	if(method !== 'post') {
        		id = $('#formFile').data('fid');
        	}

            $.myAjax({
            	type: method,
                url: '/files/' + id,
                data: $('#formFile').serialize(),
                beforeSend: function() {
                    $('#btnAddFile').addClass('loading');
                },
                success: function(data) {
                    if (data.status) { //成功
                        window.location.reload();
                    } else { //失败
                        $('.msg-file-form').html($.errMsg(data.result)).show();
                    }
                },
                error: function() {
                    $('.msg-file-form').text('提交失败，请稍后重试').show();
                },
                complete: function() {
                    $('#btnAddFile').removeClass('loading');
                }
            });
        }

	}
})(window.jQuery);