/**
 * Created by leohu on 15/12/10.
 */
var WEUI = {};

WEUI.loading = (function($){
    var tpl = [
            '<div class="weui_loading_toast" style="display:none;">',
            '<div class="weui_mask"></div>',
            '<div class="weui_toast">',
            '<div class="weui_loading">',
            '<div class="weui_loading_leaf weui_loading_leaf_0"></div>',
            '<div class="weui_loading_leaf weui_loading_leaf_1"></div>',
            '<div class="weui_loading_leaf weui_loading_leaf_2"></div>',
            '<div class="weui_loading_leaf weui_loading_leaf_3"></div>',
            '<div class="weui_loading_leaf weui_loading_leaf_4"></div>',
            '<div class="weui_loading_leaf weui_loading_leaf_5"></div>',
            '<div class="weui_loading_leaf weui_loading_leaf_6"></div>',
            '<div class="weui_loading_leaf weui_loading_leaf_7"></div>',
            '<div class="weui_loading_leaf weui_loading_leaf_8"></div>',
            '<div class="weui_loading_leaf weui_loading_leaf_9"></div>',
            '<div class="weui_loading_leaf weui_loading_leaf_10"></div>',
            '<div class="weui_loading_leaf weui_loading_leaf_11"></div>',
            '</div>',
            '<p class="weui_toast_content"></p>',
            '</div>',
            '</div>'
        ].join(''),
        instance = null;

    return {
        show: function(content){
            instance = instance || $(tpl).appendTo('body');
            $('.weui_toast_content', instance).text(content || "数据加载中...");
            instance.show();
        },
        hide: function(){
            instance && instance.hide();
        }
    };
})(jQuery);

WEUI.toast = (function($){
    var tpl = [
            '<div id="toast" style="display: none;">',
            '<div class="weui_mask"></div>',
            '<div class="weui_toast">',
            '<i class="weui_icon_toast"></i>',
            '<p class="weui_toast_content">已完成</p>',
            '</div>',
            '</div>'
        ].join(''),
        instance = null;

    return function(content, timeout) {
        if(instance == null) {
            instance = $(tpl).appendTo('body');
        }
        $('.weui_toast_content', instance).text(content);
        instance.show();
        setTimeout(function(){instance.hide()}, timeout || 1130);
    }
})(jQuery);

WEUI.confirm = (function($){
    var tpl = [
            '<div class="weui_dialog_confirm" style="display:none">',
            '<div class="weui_mask"></div>',
            '<div class="weui_dialog">',
            '<div class="weui_dialog_hd"><strong class="weui_dialog_title">标题</strong></div>',
            '<div class="weui_dialog_bd weui_dialog_content">内容</div>',
            '<div class="weui_dialog_ft">',
            '<a class="weui_btn_dialog default weui_dialog_cancel">取消</a>',
            '<a class="weui_btn_dialog primary weui_dialog_confirm">确定</a>',
            '</div>',
            '</div>',
            '</div>'
        ].join(""),
        instance = null;

    return function(title, content, onConfirm, onCancel){
        if(instance == null) {
            instance = $(tpl).appendTo('body');
            instance
                .on('click', ".weui_dialog_cancel", function(){
                    onCancel && onCancel();
                    instance.hide();
                })
                .on('click', ".weui_dialog_confirm", function(){
                    onConfirm && onConfirm();
                    instance.hide();
                });
        }
        $(".weui_dialog_title", instance).text(title);
        $(".weui_dialog_content", instance).text(content);
        instance.show();
    }
})(jQuery);

WEUI.alert = (function($){
    var tpl = [
            '<div class="weui_dialog_alert" style="display:none">',
            '<div class="weui_mask"></div>',
            '<div class="weui_dialog">',
            '<div class="weui_dialog_hd"><strong class="weui_dialog_title">标题</strong></div>',
            '<div class="weui_dialog_bd weui_dialog_content">内容</div>',
            '<div class="weui_dialog_ft">',
            '<a class="weui_btn_dialog primary">确定</a>',
            '</div>',
            '</div>',
            '</div>'
        ].join(""),
        instance = null;

    return function(title, content, onConfirm){
        if(instance == null) {
            instance = $(tpl).appendTo('body');
            instance.on('click', ".weui_btn_dialog.primary", function(){
                onConfirm && onConfirm();
                instance.hide();
            });
        }

        $(".weui_dialog_title", instance).text(title);
        $(".weui_dialog_content", instance).text(content);
        instance.show();
    }
})(jQuery);

WEUI.actionSheet = (function($){
    var tpl = [
            '<div>',
            '<div class="weui_mask_transition"></div>',
            '<div class="weui_actionsheet">',
            '<div class="weui_actionsheet_menu">',
            '</div>',
            '<div class="weui_actionsheet_action">',
            '<div class="weui_actionsheet_cell actionsheet_cancel">取消</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join(""),
        tplCell = '<div class="weui_actionsheet_cell">菜单</div>',
        instance = null,
        menu = null,
        sheet = null,
        mask = null;

    function hide() {
        sheet.removeClass('weui_actionsheet_toggle');
        mask.removeClass('weui_fade_toggle');
        sheet.on('transitionend', function () {
            mask.hide();
        }).on('webkitTransitionEnd', function () {
            mask.hide();
        });
        menu.html('');
    }

    function show() {
        sheet.addClass('weui_actionsheet_toggle');
        mask.show().addClass('weui_fade_toggle');
        sheet.unbind('transitionend').unbind('webkitTransitionEnd');
    }

    return function(options, onClick){
        if(instance == null) {
            instance = $(tpl).appendTo('body');
            menu = $('.weui_actionsheet_menu', instance);
            sheet = $('.weui_actionsheet', instance);
            mask = $('.weui_mask_transition', instance);

            instance.on('click', '.actionsheet_cancel', hide);
            mask.click(hide)
        }

        $(options).each(function(i, e){
            console.log(e);
            menu.append($(tplCell).text(e).click(onClick));
        });

        show();
    }
})(jQuery)