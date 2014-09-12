(function($) {
    if ($('.page-edit-file').length) {

        var OPT = {
            timer: '' //用来存放setTimeout
        };

        var editor = ace.edit($('#editor')[0]);
        editor.setTheme("ace/theme/monokai"); //主题
        editor.setFontSize('16px'); //字体大小
        editor.getSession().setUseWrapMode(true); //自动换行
        editor.getSession().setMode("ace/mode/markdown"); //设置语言
        editor.setAnimatedScroll(true);
        editor.setHighlightActiveLine(true);
        editor.renderer.setShowGutter(true);
        editor.setReadOnly(false);
        editor.setBehavioursEnabled(true); //自动补全括号
        editor.setHighlightSelectedWord(true);
        editor.setAnimatedScroll(true);
        editor.setShowInvisibles(false);
        editor.setSelectionStyle("text");
        editor.getSession().setUseWorker(true); //语法检查

        editor.session.setValue($('#editor').data('content'), -1);

        preview();

        /**
         * 绑定保存组合键
         */
        editor.commands.addCommand({
            name: 'saveCommand',
            bindKey: {
                win: 'Ctrl-s',
                mac: 'Command-s'
            },
            exec: function() {
                saveFile();
            },
            readOnly: false
        });

        /**
         * 监听editor的改变，如果内容有变动，则自动更新预览
         */
        editor.getSession().on('change', function(e) {
            var isClean = editor.session.getUndoManager().isClean();
            if (!isClean) {
                preview();
            }
        });

        /**
         * 生成预览
         */
        function preview() {
            var mdContent = marked(editor.session.getValue());
            $('.preview').html(mdContent);

            editor.session.getUndoManager().markClean();
        }

        /**
         * “保存文档”按钮的点击事件
         */
        $('#btnSaveFile').on('click', function() {
            saveFile();
        });

        /**
         * 保存文档
         */
        function saveFile() {
            $.myAjax({
                type: 'put',
                url: '/editfile/' + $('#editor').data('fid'),
                data: {
                    content: editor.session.getValue()
                },
                beforeSend: function() {
                    $('#btnSaveFile').addClass('loading');
                },
                success: function(data) {
                    editorMsg(data.result.msg);
                },
                error: function() {
                    editorMsg('提交失败，请稍后重试');
                },
                complete: function() {
                    $('#btnSaveFile').removeClass('loading');
                }
            });
        }

        /**
         * editor 消息
         */
        function editorMsg(msg) {
            //清空之前的计时
            clearTimeout(OPT.timer);

            $('.editor-msg').text(msg);

            //3s后消失
            OPT.timer = setTimeout(function() {
                $('.editor-msg').transition('flash', function() {
                    $(this).text('');
                });
            }, 3000);

        }


    }
})(window.jQuery);
