;
(function($) {
    /**
     * myAjax
     * option = {type, url, data, dataType, beforeSend, success, error, complete}
     */
    $.myAjax = function(option) {
        var o = option;
        o.type = o.type ? o.type : 'post'; //type默认为post
        o.data = o.data ? o.data : {}; //data默认为{}
        o.dataType = o.dataType ? o.dataType : 'json'; //dataType默认为json
        o.beforeSend = o.beforeSend ? o.beforeSend : Object;
        o.success = o.success ? o.success : Object;
        o.error = o.error ? o.error : Object;
        o.complete = o.complete ? o.complete : Object;

        $.ajax({
            type: o.type,
            url: o.url,
            data: o.data,
            dataType: o.dataType,
            beforeSend: function() {
                //进度条开始
                NProgress.start();
                o.beforeSend();
            },
            success: function(data) {
                o.success(data);
            },
            error: function() {
                o.error();
            },
            complete: function() {
                //进度条done
                NProgress.done();
                o.complete();
            }
        });
    };

    /**
     * format error message
     * msg: [error messages]
     */
    $.errMsg = function(msg) {
        var html = $('<ul></ul>');
        if (msg.length) {
            $.each(msg, function(index, item) {
                html.append('<li>' + item.msg + '</li>');
            });
        }
        return html;
    };


    /**
     * tip-modal
     * option : String || Object
     * option = 'hide'
     * option = {title: String || Dom, content: String || Dom, expire: 定时关闭，单位为毫秒(为－1时不启动定时), cb: callback(function)}
     */
    $.tipModal = function(option) {
        var o = option;
        if (o === 'hide') {
            $('.tip-modal').modal('hide');
        } else {

            var time = o.expire ? o.expire : 2500, //默认2.5s
                cb = o.cb ? o.cb : Object;
            $('.tip-modal .header').html(o.title);
            $('.tip-modal .content').html(o.content);

            $('.tip-modal')
                .modal('setting', {
                    closable: false
                }).modal('show');

            if (time > 0) {
                setTimeout(function() {
                    $('.tip-modal').modal('hide');
                    cb();
                }, time);
            } else {
                cb();
            }

        }

    }

    /**
     * Initializing dropdown
     */
    $('.ui.dropdown').dropdown();

    /**
     * 关闭sidebar（通用）
     */
    $('.close-sidebar').on('click', function() {
        $('.ui.sidebar').sidebar('hide');
        $('.ui.sidebar form')[0].reset();
    });

    /**
     * 返回上一页（通用）
     */
    $('.btn-back').on('click', function() {
        window.history.go(-1);
    });

})(window.jQuery);
