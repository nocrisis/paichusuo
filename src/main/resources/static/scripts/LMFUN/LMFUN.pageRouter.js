/**
 * Created by andy on 2016/11/25.
 */
;!(function (global, doc) {
    
    var _config = {
        //路由
        path: null,
        //元素
        element: '', //jq选择器
        //页面进入动画类
        enterClass: 'pageBoxIn',
        //页面进入前执行事件
        onEnterBefore: function () {
            
        },
        //页面进入后执行事件
        onEnterAfter: function () {
            
        },
        //页面退出动画类
        leaveClass: 'pageBoxOut',
        //页面退出前执行事件
        onLeaveBefore: function () {
            
        },
        //页面退出后执行事件
        onLeaveAfter: function () {
            
        }
        
    };
    
    var routerQueue = {};
    var isInit = false;
    var _pageIndex = 4000;
    var routerMgr = function () {
        this.lastPage = '';
    };
    var pt = routerMgr.prototype;
    
    
    pt.push = function (routers) {
        if ($.type(routers) === 'object') {
            routers.path && (routerQueue[routers.path] = $.extend({}, _config, routers));
            return this;
        }
        if ($.type(routers) === 'array') {
            routers.forEach(function (router) {
                router.path && (routerQueue[router.path] = $.extend({}, _config, router));
            });
            return this;
        }
        return this
    };
    
    pt.go = function (pageName) {
        $('input').blur();
        if(!!pageName){
            location.hash =pageName;
        }else{
           history.back();
        }
        // location.hash =!pageName?'#': pageName;
        return this;
    };
    pt._go = function (config) {
        var self = this;
        
        if (self.lastPage != '') {
            var lastPageConfig = self._find(self.lastPage);
            self.pageOut(lastPageConfig, function () {
                self.lastPage = config.path;
                self.pageIn(config);
            });
            return self
        }
        self.lastPage = config.path;
        self.pageIn(config);
        return self;
    };
    pt._back = function () {
        var self = this;
        if (self.lastPage == '')return self;
        var config = self._find(self.lastPage);
        if (config) {
            self.pageOut(config);
        }
        self.lastPage = '';
    };
    
    pt.pageIn = function (pageConfig, callback) {
        var $container = $(pageConfig.element);
        
        if ($container.length == 0) {
            $.isFunction(pageConfig.onEnterBefore) && pageConfig.onEnterBefore.call(null);
            $.isFunction(pageConfig.onEnterAfter) && pageConfig.onEnterAfter.call(null);
            return self;
        }
        $.isFunction(pageConfig.onEnterBefore) && pageConfig.onEnterBefore.call(this);
        
        $container
            .addClass(pageConfig.enterClass || "pageBoxIn")
            .css('z-index', _pageIndex++)
            .off('animationend webkitAnimationEnd')
            .one('animationend webkitAnimationEnd', function () {
                $(this).removeClass(pageConfig.enterClass || "pageBoxIn");
                $.isFunction(pageConfig.onEnterAfter) && pageConfig.onEnterAfter.call(this);
                $.isFunction(callback) && callback.call();
            })
            .show();
        
        return self;
    };
    pt.pageOut = function (pageConfig, callback) {
        var $container = $(pageConfig.element);
        if ($container.length == 0) {
            $.isFunction(pageConfig.onLeaveBefore) && pageConfig.onLeaveBefore.call(null);
            $.isFunction(pageConfig.onLeaveAfter) && pageConfig.onLeaveAfter.call(null);
            return this;
        }
        $.isFunction(pageConfig.onLeaveBefore) && pageConfig.onLeaveBefore.call(this);
        
        $container
            .addClass(pageConfig.leaveClass || "pageBoxOut")
            .off('animationend webkitAnimationEnd')
            .one('animationend webkitAnimationEnd', function () {
                $(this).removeClass(pageConfig.leaveClass || "pageBoxOut").hide();
                $.isFunction(pageConfig.onLeaveAfter) && pageConfig.onLeaveAfter.call(this);
                $.isFunction(callback) && callback.call();
            });
        return this;
    };
    
    
    pt._find = function (pathName) {
        if (!pathName || pathName == '')return false;
        var _routerConfig = routerQueue[pathName] || {};
        return $.isEmptyObject(_routerConfig) ? false : _routerConfig;
    };
    pt.init = function () {
        
        var self = this;
        if (isInit) {
            console.warn('已经初始化过了');
            return this;
        }
        isInit = true;
        
        var _index = 0;
        window.addEventListener('hashchange', function () {
            var path = location.hash.indexOf('#') === 0 ? location.hash.replace('#', '') : '';
            var page = self._find(path);
            if (!!page) {
                history.replaceState && history.replaceState({_index: ++_index}, '', location.href);
                self._go(page);
            } else {
                // history.replaceState && history.replaceState({_index: --_index}, '', location.href);
                self._back();
            }
            return false;
        }, false);
        
        // window.addEventListener('touchmove', function (e) {
        //     if (self.lastPage != '') {
                // e.preventDefault();
                // return false;
            // }
        // }, false);
        
        var path = location.hash.indexOf('#') === 0 ? location.hash.replace('#', '') : '';
        var page = self._find(path);
        
        if (!!page) {
            self._go(page);
        } else {
            self._back();
        }
        return this;
    };
    
    
    //路由管理对外接口
    var hasPageRouter;
    var pageRouter = function () {
        return hasPageRouter = hasPageRouter || new routerMgr()
    };
    "function" == typeof define ? define(function () {
        return pageRouter
    }) : "undefined" != typeof exports ? module.exports = pageRouter : (global.LMFUN = global.LMFUN || {}, global.LMFUN['pageRouter'] = pageRouter);
})(window, document);