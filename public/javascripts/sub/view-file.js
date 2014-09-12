(function($) {
    if($('.page-view-file').length) {
        var mdContent = marked($('.file-content').data('md'));
        $('.file-content').html(mdContent);
    }
})(window.jQuery);