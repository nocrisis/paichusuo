/**
 * Created by andy on 2016/11/16.
 * 原生js扩展
 */

(function (global) {
    var extend = function (a, d, b) {
        a || (a = {});
        if (!d)return a;
        for (var f in d) {
            var c = d[f];
            "undefined" === typeof c || !b && "undefined" !== typeof a[f] || (a[f] = c)
        }
        return a
    };
    //是否是字符串
    String.isString = String.isString || function (a) {
            return "string" === typeof a || "[object String]" === Object.prototype.toString.call(a)
        };
    extend(String.prototype, {
        //包含
        contains: function (a) {
            return -1 < this.indexOf(a)
        },
        //以**开始（区分大小写）
        startsWith: function (a) {
            return 0 === this.lastIndexOf(a, 0)
        },
        //以**结束 （区分大小写）
        endsWith: function (a) {
            var b = this.size() - a.size();
            return 0 <= b && this.indexOf(a, b) === b
        },
        //以**开始（不区分大小写）
        startsWithIgnoreCase: function (a) {
            return a ? this.toLowerCase().startsWith(a.toLowerCase()) : !1
        },
        //以**结束 （不区分大小写）
        endsWithIgnoreCase: function (a) {
            return a ? this.toLowerCase().endsWith(a.toLowerCase()) : !1
        },
        //替换
        replaceAll: function (a, b) {
            return this.replace(RegExp(a, "gm"), b)
        },
        //去空格
        trim: function () {
            return String(this).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        },
        //去特殊字符
        clean: function () {
            return String(this).replace(/\s+/g, " ").trim()
        },
        //转大写
        capitalize: function () {
            return String(this).replace(/\b[a-z]/g,
                function (a) {
                    return a.toUpperCase()
                })
        },
        //转小写
        uncapitalize: function () {
            return String(this).replace(/\b[a-z]/g, function (a) {
                return a.toLowerCase()
            })
        },
        //是否为int
        isInt: function () {
            for (var a = 0, b = this.size(); a < b; a++)if (-1 == "1234567890".indexOf(this.charAt(a)))return !1;
            return !0
        },
        //转int
        toInt: function (a) {
            return parseInt(this, a || 10)
        },
        //转浮点
        toFloat: function () {
            return parseFloat(this)
        },
        // - 转驼峰
        camelCase: function () {
            return String(this).replace(/-\D/g, function (a) {
                return a.charAt(1).toUpperCase()
            })
        },
        // '_' 转驼峰
        _camelCase: function () {
            return String(this).replace(/_\D/g, function (a) {
                return a.charAt(1).toUpperCase()
            })
        },
        //驼峰转 -
        hyphenate: function () {
            return String(this).replace(/[A-Z]/g,
                function (a) {
                    return "-" + a.charAt(0).toLowerCase()
                })
        },
        //文本长度
        size: function () {
            return (String(this)).length
        },
        //中文长度
        sizeOfzh: function () {
            return (String(this)).replace(/[^\x00-\xff]/g, '__').length;
        }
        
    });
    
    //是否是数字
    Number.isNumber = Number.isNumber || function (a) {
            return "number" === typeof a && !isNaN(a)
        };
    var __Number__construct = function (Min, Max) {
        if (Min > Max) {
            throw new Error('最大值不能小于最小值');
        }
        return true
    };
    //随机范围数
    Number.random = function (Min, Max) {
        return arguments.length >= 2 && __Number__construct(Min, Max) ?
            parseInt(Math.random() * (Max - Min + 1) + Min, 10) :
            parseInt(Math.random() * Min + 1, 10);
    };
    extend(Number.prototype, {
        //范围限制
        limit: function (a, b) {
            return Math.min(b, Math.max(a, this))
        },
        //四舍五入
        round: function (a) {
            a = Math.pow(10, a || 0).toFixed(0 > a ? -a : 0);
            return Math.round(this * a) / a
        },
        //根据数字大写循环 a 回调，b 作用域
        times: function (a, b) {
            for (var l = 0; l < this; l++)a.call(b || a, l, this)
        },
        //取绝对值
        abs: function () {
            return Math.abs(this)
        },
        //向上取整
        ceil: function () {
            return Math.ceil(this)
        },
        //向下取整
        floor: function () {
            return Math.floor(this)
        },
        //转浮点
        toFloat: function () {
            return parseFloat(this)
        },
        //转int
        toInt: function (a) {
            return parseInt(this, a || 10)
        }
    });
    
    //是否为 数组
    Array.isArray = Array.isArray || function (a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        };
    //是否为 空数组
    Array.isNotEmpty = function (a) {
        return Array.isArray(a) && !!a.length
    };
    //是否为 纯粹的对象
    Object.isPlainObject = Object.isPlainObject || function (a) {
            if (!a || "object" !== typeof a || a.nodeType || null != a && a == a.window)return !1;
            var b = Object.prototype.hasOwnProperty;
            try {
                if (a.constructor && !b.call(a, "constructor") && !b.call(a.constructor.prototype, "isPrototypeOf"))return !1
            } catch (l) {
                return !1
            }
            for (var c in a);
            return void 0 === c || b.call(a, c)
        };
    // 是否是为 空对象
    Object.isEmptyObject = Object.isEmptyObject || function (a) {
            for (var b in a)return !1;
            return !0
        };
    
    extend(Array.prototype, {
        // 循环
        every: function (a, b) {
            for (var l = 0, c = this.length; l < c; l++)if (!a.call(b || this, this[l], l, this))return !1;
            return !0
        },
        //过滤
        filter: function (a, b) {
            for (var l = [], c = 0, k = this.length; c < k; c++) {
                var e = this[c];
                a.call(b || this, e, c, this) &&
                l.push(e)
            }
            return l
        },
        //遍历
        map: function (a, b) {
            for (var c = this.length, f = Array(c), k = 0; k < c; k++)f[k] = a.call(b || this, this[k], k, this);
            return f
        },
        //循环
        forEach: function (a, b) {
            for (var c = this.length, f = 0; f < c; f++)a.call(b || this, this[f], f, this)
        },
        //查找
        indexOf: function (a, b) {
            for (var c = this.length, f = 0 > b ? Math.max(0, c + b) : b || 0; f < c; f++)if (this[f] === a)return f;
            return -1
        },
        //取值
        some: function (a, b) {
            for (var c = 0, f = this.length; c < f; c++)if (a.call(b || this, this[c], c, this))return !0;
            return !1
        },
        //复制
        clone: function () {
            return this.slice(0)
        },
        //包含
        contains: function (a, b) {
            return -1 !=
                this.indexOf(a, b)
        },
        //清空
        empty: function () {
            this.length = 0;
            return this
        },
        //取第一个
        first: function () {
            return this.length ? this[0] : null
        },
        //去最后一个
        last: function () {
            return this.length ? this[this.length - 1] : null
        },
        //插入
        insert: function () {
            var a, b = -1;
            if (1 == arguments.length) a = arguments[0]; else if (1 < arguments.length) b = arguments[0], a = arguments[1]; else return;
            if (a)return 0 > b ? this.push(a) : this.splice(b, 0, a), a
        },
        //移除指定元素
        removeAt: function (a) {
            return (a = this.splice(a, 1)) && a.length ? a[0] : null
        },
        //移除指定元素
        remove: function (a) {
            a = this.indexOf(a);
            return 0 <= a ? this.removeAt(a) : null
        },
        size: function () {
            return this.length
        },
        unique: function () {
            var res = [];
            var json = {};
            for (var i = 0; i < this.length; i++) {
                if (!json[this[i]]) {
                    res.push(this[i]);
                    json[this[i]] = 1;
                }
            }
            return res;
        }
    });
    
    
    //当前时间
    Date.now = Date.now || function () {
            return (new Date).getTime()
        };
    
    
    extend(Function.prototype, {
        //是否是function
        isFunction: function (a) {
            return "[object Function]" === Object.prototype.toString.call(a)
        },
        //try回调
        tryCallBase: function (a, b, c) {
            if (b = this.prototype[b])return c ? b.apply(a, c) : b.apply(a)
        },
        //回调
        callBase: function (a, b, c) {
            b = this.prototype[b];
            return c ? b.apply(a, c) : b.apply(a)
        },
        // 获取基础类型
        getBaseType: function () {
            return this.__oBaseType
        },
        //延时执行
        delay: function (b, d) {
            for (var c, f = [], k = 0, e = arguments.length; k < e; k++)f.push(arguments[k]);
            Number.isNumber(b) ? c = Array.prototype.slice.call(f,
                    1) : (c = f, d = b, b = 10);
            var g = this;
            return setTimeout(function () {
                g.apply(d || global, 1 < c.length ? Array.prototype.slice.call(c, 1) : [])
            }, b)
        },
        //等待执行
        wait: function (b, d, c, f) {
            var k = this, e = function () {
                b.call(d || global) ? k.call(c || d || global) : global.setTimeout(e, f || 200)
            };
            e()
        },
        //绑定
        bind: function (a) {
            var b = this, c = 1 < arguments.length ? Array.prototype.slice.call(arguments, 1) : null, f = function () {
            }, k = function () {
                var e = a, g = arguments.length;
                this instanceof k && (f.prototype = b.prototype, e = new f);
                g = c || g ? b.apply(e, c && g ? c.concat(Array.prototype.slice.call(arguments)) : c ||
                        arguments) : b.call(e);
                return e == a ? g : e
            };
            return k
        }
    });
})(window);
