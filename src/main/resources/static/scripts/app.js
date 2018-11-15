/**
 Core script to handle the entire layout and base functions
 **/
;
//通用价格 格式化 方法
!(function (global) {
    global.formatMoney = function (money) {
        if (isNaN(money)) {
            return 0.00;
        }
        var n = 2;
        money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    };

    global.formatMoney_2 = function (price) {

        var getFloatStr = function (num) {
            num += '';
            num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符
            if (/^0+/) //清除字符串开头的0
                num = num.replace(/^0+/, '');
            if (!/\./.test(num)) //为整数字符串在末尾添加.00
                num += '.00';
            if (/^\./.test(num)) //字符以.开头时,在开头添加0
                num = '0' + num;
            num += '00';        //在字符串末尾补零
            num = num.match(/\d+\.\d{2}/)[0];
            return num;
        };

        //整数的时候为整数;
        if (parseInt(price) == price) {
            return parseInt(price);
        }

        return getFloatStr(Math.round(price * 100) / 100)
    };

    /**
     * 数字格式
     * @param value
     * @param front_num
     * @param after_num
     * @returns {*|boolean}
     */
    global.isPricestyle = function (value, front_num, after_num) {

        var arr = (value + '').split('.');

        if (arr.length >= after_num) return value && arr[0].length <= front_num && arr[1].length <= after_num;

        return value && arr[0].length <= front_num

    };

    //只能输入数字
    $('body')
        .on('keyup input propertychange', 'input[type="text"].onlyDigit', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        //只能输入数字
        .on('keyup input propertychange', 'input[type="text"].onlyDecimal', function () {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        })
        //只能输入电话
        .on('keyup input propertychange', 'input[type="text"].onlyTel', function () {
            this.value = this.value.replace(/[^0-9\-]/g, '');
        });


    /**
     * 文本换行处理
     * @param value  源数据
     * @param type   处理类型 1 代表将换行字符装换成|@|@| 2 代表代表将|@|@|装换成换行字符
     * @returns {String} 处理过换行的数据
     */
    global.getTextArea = function (value, type) {
        return String.prototype.replace.apply(value, (type == 1) ? [/\n/g, "|@|@|"] : [/\|\@\|\@\|/g, "\n"]);
    };
    global.eventBeforeunload = function (url) {
        $(window).bind('beforeunload', function () {
            return '活动尚未保存成功，确定离开？';
        });
        $(".cancel").on('click', function () {
            $(window).unbind('beforeunload');
            if (url) {
                window.location.href = url;
            }
        });
    };


    global.isEmpty = function (string) {
        return string == undefined || string == null || string.length == 0 || string == ''
    };


})(this);

// 设置链接 格式
!(function (global) {

    global.formatUrl = function (url) {
        if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) {
            return url;
        }
        return url && 'http://' + url || ""
    };

})(this);


//  fileToBase64 图片文件转base64
!(function (global) {
    var isImageFile = function (file) {
        if (file && file.type) {
            return /^image\/(jpg|jpeg|png)$/.test(file.type);
        } else {
            return /\.(jpg|jpeg|png)$/.test(file);
        }
    };
    var CaculatorSize = function (size) {
        if (size < 1024) {
            return size + "B";
        }
        if (size / 1024 < 1024) {
            return Math.floor(size * 100 / 1024) / 100 + "KB";
        }
        if (size / 1024 / 1024 < 1024) {
            return Math.floor(size * 100 / 1024 / 1024) / 100 + "M";
        }
        if (size / 1024 / 1024 / 1024 < 1024) {
            return Math.floor(size * 100 / 1024 / 1024 / 1024) / 100 + "G";
        }
        else {
            return size;
        }
    };
    global.fileToBase64 = function (files, success, maxSize) {

        if (files.length == 0 || !files && !files[0]) {
            return;
        }
        var __maxSize = maxSize || 1024 * 10;
        var file = files[0];
        if (!isImageFile(file)) {
            layer.alert('图片类型错误');
            return;
        }

        if (__maxSize * 1024 < file.size) {
            layer.msg('图片大小不能超过' + CaculatorSize(__maxSize * 1024) + ',当前图片大小是' + CaculatorSize(file.size));
            return false;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            success(e.target.result);
        };

    };
})(this);


//   Promise 封装
!(function (global) {
    global.P = function (fn) {
        var dfd = $.Deferred();
        fn = $.isFunction(fn) ? fn : $.noop;
        try {
            fn(dfd.resolve, dfd.reject);
        } catch (e) {
            dfd.reject(e);
        }
        return dfd.promise();

    };
})(this);

//全局app
var App = function () {
    // IE mode
    var isRTL = false;
    var isIE8 = false;
    var isIE9 = false;
    var isIE10 = false;

    var sidebarWidth = 225;
    var sidebarCollapsedWidth = 35;

    var responsiveHandlers = [];


    //$('body').on('click', '.thumbnail img', function () {
    //    layer.photos({
    //        photos: {
    //            "title": "", //相册标题
    //            "id": "", //相册id
    //            "start": 0, //初始显示的图片序号，默认0
    //            "data": [   //相册包含的图片，数组格式
    //                {
    //                    alt: 'asd',
    //                    id: '',
    //                    src: $(this).attr('src'),
    //                    thumb: $(this).attr('src')
    //                }
    //            ]
    //        },
    //        shift: 5 //0-6的选择，指定弹出图片动画类型，默认随机
    //    }, true);
    //});

    //复制链接
    var copyHandle = function () {

        $('body').on('click', '[data-clipboard-text]', function () {
            var $self = $(this);
            if ($self.data('clipboard')) {
                return;
            }
            var clipboard = new Clipboard($(this).get(0));
            clipboard.on('success', function (e) {
                try {
                    layer.closeAll();
                    layer.msg('复制成功');
                } catch (e) {

                }
                e.clearSelection();
            });
            clipboard.on('error', function (e) {
                try {
                    layer.msg('复制失败，请重新复制');
                } catch (e) {

                }
            });
            $self.data('clipboard', true);
            $self.trigger('click');
        });
    };
    //ajax返回登录失效直接跳转
    var ajaxErrorHandle = function () {
        $(document).ajaxComplete(function (evt, req, settings) {
            //console.log(evt, req);
            if (req && req.responseJSON) {
                var json = req.responseJSON;
                if (json.code === 18001) {
                    window.top.location.href = '/login';
                }
                //if(layer)layer.msg('登录失效,请重新登录');


            }
        }).ajaxError(function (evt, xhr, info) {
            if (xhr.status == 18001) {
                window.top.location.href = '/login';
            }
            //console.log(xhr);
        });


    };

    var handleDesktopTabletContents = function () {
        // loops all page elements with "responsive" class and applies classes for tablet mode
        // For metornic  1280px or less set as tablet mode to display the content properly
        if ($(window).width() <= 1280 || $('body').hasClass('page-boxed')) {
            $(".responsive").each(function () {
                var forTablet = $(this).attr('data-tablet');
                var forDesktop = $(this).attr('data-desktop');
                if (forTablet) {
                    $(this).removeClass(forDesktop);
                    $(this).addClass(forTablet);
                }
            });
        }

        // loops all page elements with "responsive" class and applied classes for desktop mode
        // For metornic  higher 1280px set as desktop mode to display the content properly
        if ($(window).width() > 1280 && $('body').hasClass('page-boxed') === false) {
            $(".responsive").each(function () {
                var forTablet = $(this).attr('data-tablet');
                var forDesktop = $(this).attr('data-desktop');
                if (forTablet) {
                    $(this).removeClass(forTablet);
                    $(this).addClass(forDesktop);
                }
            });
        }
    };


    var runResponsiveHandlers = function () {
        // reinitialize other subscribed elements

        $.each(responsiveHandlers, function (i, responsiveHandler) {
            responsiveHandler.call();
        });

    };

    var handleResponsive = function () {
        handleTooltips();

        handleDesktopTabletContents();
        handleSidebarAndContentHeight();

        handleFixedSidebar();
        runResponsiveHandlers();
    };

    var handleResponsiveOnInit = function () {

        handleDesktopTabletContents();
        handleSidebarAndContentHeight();
    };

    var handleResponsiveOnResize = function () {
        var resize;
        if (isIE8) {
            var currheight;
            $(window).resize(function () {
                if (currheight == document.documentElement.clientHeight) {
                    return; //quite event since only body resized not window.
                }
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function () {
                    handleResponsive();
                }, 50); // wait 50ms until window resize finishes.
                currheight = document.documentElement.clientHeight; // store last body client height
            });
        } else {
            $(window).resize(function () {
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function () {
                    handleResponsive();
                }, 50); // wait 50ms until window resize finishes.
            });
        }
    };
    //链接效果展示
    var handleClickShowSelected = function () {
        //获取当前页面的href 即<a>链接
        var href = window.location.pathname;

        //获取侧边栏所有<a>
        var alabs = jQuery('.page-sidebar-menu a');

        $.each(alabs, function (index, data) {

            if ($(data).attr('href') && $(data).attr('href').indexOf(href) != -1) {

                var ui = $(data).parent().parent();

                if ($(ui).parent().get(0).tagName === "LI") {
                    $(data).parent().addClass('active');
                    $(ui).parent().addClass('active');
                } else {
                    $(data).parent().addClass('active');
                }
            }
        });
    };

    //* BEGIN:CORE HANDLERS *//
    // this function handles responsive layout on screen size resize or mobile device rotate.

    var handleSidebarAndContentHeight = function () {
        var content = $('.page-content');
        var sidebar = $('.page-sidebar');
        var body = $('body');
        var height;

        if (body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
            var available_height = $(window).height() - $('.footer').height();
            if (content.height() < available_height) {
                content.attr('style', 'min-height:' + available_height + 'px !important');
            }
        } else {
            if (body.hasClass('page-sidebar-fixed')) {
                height = _calculateFixedSidebarViewportHeight();
            } else {
                height = sidebar.height() + 20;
            }
            if (height >= content.height()) {
                content.attr('style', 'min-height:' + height + 'px !important');
            }
        }
    };

    var handleSidebarMenu = function () {
        jQuery('.page-sidebar').on('click', 'li > a', function (e) {
            if ($(this).next().hasClass('sub-menu') == false) {
                if ($('.btn-navbar').hasClass('collapsed') == false) {
                    $('.btn-navbar').click();
                }
                return;
            }

            var parent = $(this).parent().parent();

            parent.children('li.open').children('a').children('.arrow').removeClass('open');
            parent.children('li.open').children('.sub-menu').slideUp(200);
            parent.children('li.open').removeClass('open');

            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(200, function () {
                    handleSidebarAndContentHeight();
                });
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200, function () {
                    handleSidebarAndContentHeight();
                });
            }

            e.preventDefault();
        });

    };

    var _calculateFixedSidebarViewportHeight = function () {
        var sidebarHeight = $(window).height() - $('.header').height() + 1;
        if ($('body').hasClass("page-footer-fixed")) {
            sidebarHeight = sidebarHeight - $('.footer').height();
        }

        return sidebarHeight;
    };

    var handleFixedSidebar = function () {
        var menu = $('.page-sidebar-menu');

        if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
            menu.slimScroll({
                destroy: true
            });
            menu.removeAttr('style');
            $('.page-sidebar').removeAttr('style');
        }

        if ($('.page-sidebar-fixed').size() === 0) {
            handleSidebarAndContentHeight();
            return;
        }

        if ($(window).width() >= 980) {
            var sidebarHeight = _calculateFixedSidebarViewportHeight();

            menu.slimScroll({
                size: '7px',
                color: '#a1b2bd',
                opacity: .3,
                position: isRTL ? 'left' : ($('.page-sidebar-on-right').size() === 1 ? 'left' : 'right'),
                height: sidebarHeight,
                allowPageScroll: false,
                disableFadeOut: false
            });
            handleSidebarAndContentHeight();
        }
    };

    var handleFixedSidebarHoverable = function () {
        if ($('body').hasClass('page-sidebar-fixed') === false) {
            return;
        }

        $('.page-sidebar')
            .off('mouseenter').on('mouseenter', function () {
            var body = $('body');

            if ((body.hasClass('page-sidebar-closed') === false || body.hasClass('page-sidebar-fixed') === false) || $(this).hasClass('page-sidebar-hovering')) {
                return;
            }

            body.removeClass('page-sidebar-closed').addClass('page-sidebar-hover-on');
            $(this).addClass('page-sidebar-hovering');
            $(this).animate({
                width: sidebarWidth
            }, 400, '', function () {
                $(this).removeClass('page-sidebar-hovering');
            });
        })
            .off('mouseleave').on('mouseleave', function () {
            var body = $('body');

            if ((body.hasClass('page-sidebar-hover-on') === false || body.hasClass('page-sidebar-fixed') === false) || $(this).hasClass('page-sidebar-hovering')) {
                return;
            }

            $(this).addClass('page-sidebar-hovering');
            $(this).animate({
                width: sidebarCollapsedWidth
            }, 400, '', function () {
                $('body').addClass('page-sidebar-closed').removeClass('page-sidebar-hover-on');
                $(this).removeClass('page-sidebar-hovering');
            });
        });
    };


    var handleGoTop = function () {
        /* set variables locally for increased performance */
        jQuery('.footer').on('click', '.go-top', function (e) {
            App.scrollTo();
            e.preventDefault();
        });
    };

    var handlePortletTools = function () {
        $('body').on('click', '.portlet .tools a.remove', function (e) {
            e.preventDefault();
            var removable = jQuery(this).parents(".portlet");
            if (removable.next().hasClass('portlet') || removable.prev().hasClass('portlet')) {
                jQuery(this).parents(".portlet").remove();
            } else {
                jQuery(this).parents(".portlet").parent().remove();
            }
        });

        $('body').on('click', '.portlet .tools a.reload', function (e) {
            e.preventDefault();
            var el = jQuery(this).parents(".portlet");
            App.blockUI(el);
            window.setTimeout(function () {
                App.unblockUI(el);
            }, 1000);
        });

        $('body').on('click', '.portlet .tools .collapse, .portlet .tools .expand', function (e) {
            e.preventDefault();
            var el = jQuery(this).closest(".portlet").children(".portlet-body");
            if (jQuery(this).hasClass("collapse")) {
                jQuery(this).removeClass("collapse").addClass("expand");
                el.slideUp(200);
            } else {
                jQuery(this).removeClass("expand").addClass("collapse");
                el.slideDown(200);
            }
        });
    };

    var handleUniform = function () {
        if (!jQuery().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)");
        if (test.size() > 0) {
            test.each(function () {
                if ($(this).parents(".checker").size() == 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
    };


    var handleTabs = function () {

        // function to fix left/right tab contents
        var fixTabHeight = function (tab) {
            $(tab).each(function () {
                var content = $($($(this).attr("href")));
                var tab = $(this).parent().parent();
                if (tab.height() > content.height()) {
                    content.css('min-height', tab.height());
                }
            });
        };

        // fix tab content on tab shown
        $('body').on('shown', '.nav.nav-tabs.tabs-left a[data-toggle="tab"], .nav.nav-tabs.tabs-right a[data-toggle="tab"]', function () {
            fixTabHeight($(this));
        });

        $('body').on('shown', '.nav.nav-tabs', function () {
            handleSidebarAndContentHeight();
        });

        //fix tab contents for left/right tabs
        fixTabHeight('.nav.nav-tabs.tabs-left > li.active > a[data-toggle="tab"], .nav.nav-tabs.tabs-right > li.active > a[data-toggle="tab"]');

        //activate tab if tab id provided in the URL
        if (location.hash) {
            var tabid = location.hash.substr(1);
            $('a[href="#' + tabid + '"]').click();
        }
    };

    var handleTooltips = function () {
        if (!jQuery.fn.tooltip) {
            return false;
        }
        if (App.isTouchDevice()) { // if touch device, some tooltips can be skipped in order to not conflict with click events
            jQuery('.tooltips:not(.no-tooltip-on-touch-device)').tooltip();
        } else {
            jQuery('.tooltips').tooltip();
        }
    };

    var handleDropdowns = function () {
        $('body').on('click', '.dropdown-menu.hold-on-click', function (e) {
            e.stopPropagation();
        })
    };

    var handlePopovers = function () {
        if (!jQuery.fn.popover) {
            return false;
        }
        jQuery('.popovers').popover();
    };


    var handleFixInputPlaceholderForIE = function () {
        //fix html5 placeholder attribute for ie7 & ie8
        if (isIE8 || isIE9) { // ie7&ie8
            // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
            jQuery('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {

                var input = jQuery(this);

                if (input.val() == '' && input.attr("placeholder") != '') {
                    input.addClass("placeholder").val(input.attr('placeholder'));
                }

                input.focus(function () {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });

                input.blur(function () {
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });
        }
    };
    var isInputSupport = function (type) {
        if (!type) return false;
        var i = document.createElement('input');
        i.setAttribute('type', type);
        return i.type == type;
    };


    var handleSidebarForD = function () {
        $('.page-sidebar-menu,.page-sidebar-menu-sub').on('mousewheel DOMMouseScroll', function (e) {
            var y = e.originalEvent.wheelDelta || e.originalEvent.detail;
            var screenHeight = this.scrollHeight;//总长
            var curHeight = this.clientHeight;//可见的长度
            var preTop = $(this).position().top;
            var curTop;

//        console.log(y, screenHeight, curHeight, preTop);

            if (curHeight < screenHeight && y < 0) {
                curTop = preTop - 10 + 'px';
//            console.log("可向上滚动", preTop);
                $(this).css({
                    "top": curTop
                });
            }
            else if (y > 0 && preTop <= -10) {
                curTop = preTop + 10 + 'px';
//            console.log("可向下滚动", preTop);
                $(this).css({
                    "top": curTop
                });
            }
        });

        $('ul.page-sidebar-menu > li > a').on('click', function (e) {
            var $this = $(this);
            var isActive = $this.parent().hasClass('active');
            var menuId = $this.data('menu');
            //console.log('isActive', isActive);
            //if (isActive) {
            //    return false;
            //}
            var nextLink = $this;
            //console.log('this', nextLink.attr('href'), nextLink.text());

            if (nextLink.attr('href') && nextLink.attr('href') != "#") {
                return true;
            }
            nextLink = $('.page-sidebar > ul[data-menu="' + menuId + '"]');
            if (nextLink.children('li.active').size() == 1) {
                nextLink = nextLink.children('li.active').children('a').first()
            } else {
                nextLink = nextLink.children('li').eq(1).children('a').first()
            }
            //console.log('next', nextLink.attr('href'), nextLink.text());

            if (nextLink.next().is('ul')) {
                nextLink = nextLink.next().children('a').first();
            }
            //console.log('next next', nextLink.attr('href'), nextLink.text());
            $this.attr('href', nextLink.attr('href'));
            return (!!nextLink.attr('href')) && nextLink.attr('href') != "#";
        })
        //    .hover(function () {
        //    var img = $(this).children('img');
        //    var checkedSrc = img.data('src-checked');
        //    img.data('src', img.attr('src'));
        //    if (!!checkedSrc) {
        //        img.attr('src', checkedSrc);
        //    }
        //}, function () {
        //    var img = $(this).children('img');
        //    if ($(this).parent('li').hasClass('active')) {
        //        return;
        //    }
        //    img.attr('src', img.data('src'));
        //})
            .each(function () {
                var img = $(this).children('img');
                if ($(this).parent('li').hasClass('active')) {
                    if (!!img.data('src-checked')) img.attr('src', img.data('src-checked'));

                }
            });
        $('.page-sidebar-menu-sub li  > a').on('click', function (e) {
            var $this = $(this);
            var isActive = $this.parent().hasClass('active');
            var nextLink = $this;
            var selfPath = window.location.pathname;
            if (isActive && nextLink.attr('href') == selfPath) {
                return false;
            }

            if ((!nextLink.attr('href') || nextLink.attr('href') == "#") && nextLink.next().is('ul')) {
                nextLink = nextLink.next().children('a').first();
            }
            $this.attr('href', nextLink.attr('href'));
            return (!!nextLink.attr('href')) && nextLink.attr('href') != selfPath && nextLink.attr('href') != "#";
        })
    };


    //顶部商场选择
    var mallSelectHandle = function () {
        if (typeof user_mall_list_data == 'undefined') {
            return;
        }
        var loopTpl = $('[data-tpl="tpl.mall.loop"]').html();
        var mallData = {
            mallList: user_mall_list_data,
            currMallInfo: {
                mallUid: $('.current_user_selected_mall').attr('data-malluid'),
                mallName: $('.current_user_selected_mall').attr('data-mallname')
            }
        };

        var currPage = 1;
        var pageSize = 9;
        var pageTotal = mallData.mallList.length;
        var pageNavTpl = $('[data-tpl="tpl.mall.pageNav"]').html();
        var _keyword = '';
        var randerHtml = function () {
            var randerData = {
                pageSize: pageSize = 9,
                currPage: Math.max(currPage, 1),
                total: pageTotal,
                mallList: [],
                currMallInfo: mallData.currMallInfo
            };
            var keyword = $('.mallListForSelect form[name="mallSearch"] input[name="mallName"]').val() || "";

            if (!!keyword) {
                $.each(mallData.mallList, function (i, mallInfo) {

                    if (mallInfo.mallName.indexOf(keyword) != -1) {
                        randerData.mallList.push(mallInfo);
                    }
                });
                //关键词改变后,默认分页跳转到第一页

                // if (_keyword != keyword) {
                randerData.currPage = 1;
                _keyword = keyword;
                // }
            } else {
                randerData.mallList = $.extend([], mallData.mallList)

            }
            randerData.total = randerData.mallList.length;


            console.log(randerData.currPage);
            laytpl && laytpl(loopTpl).render(randerData, function (html) {
                $('.mallListForSelect ul.list').html(html);
            });
            laytpl && laytpl(pageNavTpl).render(randerData, function (html) {
                $('.mallListForSelect .pageNav').html(html);
            });


        };

        //分页
        $('body').on('click', '.mallListForSelect .pagination li  a', function () {
            var parent = $(this).parent();
            var thisPage = parseInt($(this).text());
            if (parent.hasClass('active') || parent.hasClass('disabled')) {
                return false;
            }
            switch (true) {
                case parent.hasClass('page-next'):
                    if (currPage == Math.ceil(pageTotal / pageSize)) {
                        return false;
                    }
                    currPage++;
                    break;
                case parent.hasClass('page-pre'):
                    if (currPage == 1) {
                        return false;
                    }
                    currPage--;
                    break;
                case parent.hasClass('page-first'):
                    currPage = thisPage;
                    break;
                case parent.hasClass('page-last'):
                    currPage = thisPage;
                    break;
                case parent.hasClass('page-number'):
                    currPage = thisPage;
                    break;
                default:
                    return false;
            }
            randerHtml();
        });

        var mallListForSelectBox = null;
        $('.top-menu-box .current_user_selected_mall .btn-choosemall').on('click', function () {

            mallListForSelectBox = layer.open({
                type: 1,
                area: ['800px', '460px'],
                title: '切换商场',
                scrollbar: false,
                content: $('[data-tpl="tpl.mall.main"]').html(),
                success: function (thisobj) {
                    randerHtml();
                    $('.mallListForSelect form[name="mallSearch"] input[name="mallName"]').on('blur', function () {
                        randerHtml();
                    });
                }
            })
        });

        $('body').on('click', '.mallListForSelect ul.list .mallInfo', function () {
            var isUpdateing = $(this).data('isUpdateing');
            if (!!isUpdateing) {
                return;
            }
            isUpdateing = true;

            var isSelected = $(this).hasClass('selected');
            if (isSelected)return layer.close(mallListForSelectBox);


            $(this).addClass('selected').siblings().removeClass('selected');
            //console.log(layero);
            var obj = $('.mallListForSelect ul.list .mallInfo.selected');
            //if (obj.size() == 0) {
            //    layer.msg('请选择商场');
            //    return false
            //}

            $.ajax({
                url: "/session/changeMall",
                method: 'post',
                data: JSON.stringify({
                    mallUid: obj.attr('data-malluid'),
                    mallName: obj.attr('data-mallname')
                }),
                dataType: 'json',
                contentType: "application/json",
            })
                .then(function (res) {
                    if (res.code != 200) {
                        layer.msg(res.errorMsg);
                        return;
                    }
                    mallData.currMallInfo = {
                        mallUid: obj.attr('data-malluid'),
                        mallName: obj.attr('data-mallname')
                    };
                    var changeMallRedirectUrl = $('meta[name="changeMallRedirectUrl"]').attr('content');
                    if (!!changeMallRedirectUrl) {
                        location.href = changeMallRedirectUrl;
                        return false;
                    }
                    location.reload();
                })
                .fail(function () {
                    layer.msg('服务器繁忙')
                });

        });
        $('body').on('submit', '.mallListForSelect form[name="mallSearch"]', function () {
            randerHtml();
            return false;
        });


    };


    var layerLoadRewrite = function () {
        if (!window.layer) {
            return false
        }
        layer.load = function (icon, options) {
            options = options || {};
            options.content = '<div class="loading" >' +
                '<div class="loading-logo">' +
                '<img src="/images/loading201808131549.gif"/>'+
                // '  <img src="data:image/png;base64,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" >' +
                ' </div>' +
                '</div>';

            return layer.open($.extend({
                type: 3,
                icon: icon || 0,
                resize: false,
                shade: 0.01
            }, options));
        }
    };


    var onlyNumber = function () {
        //只能输入数字 并默认为1
        $('body')
            .on('keyup input propertychange', 'input[type="text"].onlyNumber', function () {
                this.value = this.value.replace(/[^0-9]/g, '');
            })
            .on('blur', 'input[type="text"].onlyNumber', function () {
                if (this.value == "") {
                    this.value = 1;
                }
            });
    };
    var phoneNumber = function () {
        //只能输入数字
        $('body')
            .on('keyup input propertychange', 'input[type="text"].phoneNumber', function () {
                this.value = this.value.replace(/[^0-9]/g, '');
            });
    };
    //* END:CORE HANDLERS *//

    return {

        //main function to initiate template pages
        init: function () {
            onlyNumber();
            phoneNumber();
            layerLoadRewrite();
            //IMPORTANT!!!: Do not modify the core handlers call order.
            mallSelectHandle();
            //core handlers
            ajaxErrorHandle();
            handleResponsiveOnResize(); // set and handle responsive
            handleUniform();
            handleResponsiveOnInit(); // handler responsive elements on page load

            //自定义模块
            //handlerAddNewSideBarMenu();
            //layout handlers
            handleFixedSidebar(); // handles fixed sidebar menu
            handleFixedSidebarHoverable(); // handles fixed sidebar on hover effect
            handleSidebarMenu(); // handles main menu
            handleFixInputPlaceholderForIE(); // fixes/enables html5 placeholder attribute for IE9, IE8
            handleGoTop(); //handles scroll to top functionality in the footer
            handleClickShowSelected();
            //ui component handlers
            handlePortletTools(); // handles portlet action bar functionality(refresh, configure, toggle, remove)
            handleDropdowns(); // handle dropdowns
            handleTabs(); // handle tabs
            handleTooltips(); // handle bootstrap tooltips
            handlePopovers(); // handles bootstrap popovers
            handleSidebarForD();

            copyHandle();
        },
        // wrapper function to scroll to an element
        scrollTo: function (el, offeset) {
            pos = el ? el.offset().top : 0;
            jQuery('html,body').animate({
                scrollTop: pos + (offeset ? offeset : 0)
            }, 'slow');
        },

        scrollTop: function () {
            App.scrollTo();
        },

        // wrapper function to  block element(indicate loading)
        blockUI: function (el, centerY) {
            var el = jQuery(el);
            el.block({
                message: '<img src="./assets/img/ajax-loading.gif" align="">',
                centerY: centerY != undefined ? centerY : true,
                css: {
                    top: '10%',
                    border: 'none',
                    padding: '2px',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity: 0.05,
                    cursor: 'wait'
                }
            });
        },

        // wrapper function to  un-block element(finish loading)
        unblockUI: function (el) {
            jQuery(el).unblock({
                onUnblock: function () {
                    jQuery(el).removeAttr("style");
                }
            });
        },

        // check for device touch support
        isTouchDevice: function () {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },
        isInputSupport: isInputSupport

    };

}();

!(function () {
    jQuery.fn.extend({
        //表单扩展
        serializeObject: function () {
            var _array = this.serializeArray();
            // console.log(_array);
            var _obj = {};
            $.each(_array, function (i, val) {
                _obj[val.name] = $.type(val.value) == 'string' && $.trim(val.value) || val.value;
            });
            return _obj;
        },
        // 子元素滚动父元素不滚动
        scrollUnique: function () {
            return $(this).each(function () {
                var eventType = 'mousewheel';
                if (document.mozHidden !== undefined) {
                    eventType = 'DOMMouseScroll';
                }
                $(this).on(eventType, function (event) {
                    // 一些数据
                    var scrollTop = this.scrollTop,
                        scrollHeight = this.scrollHeight,
                        height = this.clientHeight;

                    var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);

                    if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                        // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                        this.scrollTop = delta > 0 ? 0 : scrollHeight;
                        // 向上滚 || 向下滚
                        event.preventDefault();
                    }
                });
            });
        }
    });
    jQuery.extend({
        /**
         * 对象扩展
         * @param target  默认数据
         * @param source  数据源
         * @returns {}
         */
        copyObject: function (target, source) {
            target = target || {};
            var result = {};
            for (var p in target) {
                if (source.hasOwnProperty(p)) {
                    result[p] = source[p];
                } else {
                    result[p] = target[p];
                }
            }
            return result;
        },
        /**
         * 简易模板替换
         * @param tpl  需要替换的模板
         * @param data  模板数据
         * @param callback 回调 可选
         * @returns string
         */
        easyTpl: function (tpl, data, callback) {
            var reg = new RegExp("\\{\\{([^\\{\\}]*?)\\}\\}", 'igm');
            var _html = tpl.replace(reg, function (node, key) {
                return data[key];
            });
            if ($.isFunction(callback)) {
                callback(_html);
            } else {
                return _html;
            }
        },

        /**
         * 去除对象里面的空字段，支持多层嵌套
         * @param value object  需求去除的数据
         * @returns  object
         */
        clearEmptyValue: (function () {

            var clear = function (value) {
                var _value = {};
                $.each(value, function (K, V) {
                    console.log(arguments);
                    if (V !== "") {
                        if ($.type(V) == "object") {
                            _value[K] = clear(V);
                        }
                        else {
                            _value[K] = V;
                        }
                    }
                });
                return _value;
            };

            return function (value) {
                if ($.type(value) !== "object") {
                    return value;
                }
                return clear(value);
            };
        })()
    });
})();


$(function () {
    App.init();
});
