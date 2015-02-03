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

        //修改密码
        var validate2 = {

            pwdnow: {
                identifier: 'pwdnow',
                rules: [{
                    type: 'empty',
                    prompt: '请输入当前密码'
                }]
            },
            pwd: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: '请输入新密码'
                }, {
                    type: 'length[6]',
                    prompt: '密码不能少于6个字符'
                }]
            },
            cfpwd: {
                identifier: 'confirmPassword',
                rules: [{
                    type: 'match[password]',
                    prompt: '密码不一致'
                }]
            },
        };

        $('#basicForm').form(validate1, {
            onSuccess: function() {
                $('#basicForm')[0].submit();
                return false;
            },
            onFailure: function() {
                return false;
            }
        });

        if ($('#avatarForm').length) {
            Dropzone.options.avatarForm = {
                maxFilesize: 5,
                uploadMultiple: false,
                acceptedFiles: 'image/*',
                dictDefaultMessage: '拖拽图片到此 或 点击此处',
                maxFiles: 1,
                dictMaxFilesExceeded: '每次只能上传一张图片',
                dictInvalidFileType: '只能上传图片',
                success: function(file, data) {
                    if (!data.status) {
                        $('#avatarForm').before('<div class="ui error message avatar-msg">' + data.result[0].msg + '</div>');
                    }
                }
            };
        }


        $('#pwdForm').form(validate2, {
            onSuccess: function() {
                $('#pwdForm')[0].submit();
                return false;
            },
            onFailure: function() {
                return false;
            }
        });
    }
})(window.jQuery);
