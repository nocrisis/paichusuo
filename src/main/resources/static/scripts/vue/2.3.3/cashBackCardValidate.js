(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.cashBackCardValidate = factory());
}(this, (function () {
    'use strict';

    var defaultOptions = {
        msg: {},
        methods: {}
    };


    //返回方法
    var respose = function (options) {
        var realRespose = function (isPass, message) {
            this.isPass = !!isPass;
            this.message = message || ''
        };

        var opts = $.extend({}, respose.defaultOpts, options);

        if (!opts.isPass) {
            this.selected.index = opts.selected.index;
            this.selected.data = opts.selected.data;
        }

        return new realRespose(opts.isPass, opts.message)

    };
    respose.defaultOpts = {
        selected: {
            data: {
                type: 'title'
            },
            index: -1
        },
        message: '',
        isPass: false
    };


    //扩展方法
    var helper = {};
    helper.isEmpty = function (string) {
        return string == undefined || string == null || string.length == 0 || string == ''
    };


    function validateCallBack() {
        var _this = this;
        console.log('$$validate  callback =>');

        var submit = _this.submit || {};
        var selected = _this.selected || {};

        //标题
        if (helper.isEmpty(submit.rebate_name)) {
            return respose.call(_this, {
                message: '标题名称不能为空'
            });
        }

        if (submit.rebate_name.length > 15) {
            return respose.call(_this, {
                message: '最多可输入15个中文字'
            });
        }

        var rebateProportionRegl = /^(?:[1-9][0-9]?(\.\d{1})?|100)$/;

        if (helper.isEmpty(submit.blocks[1].rebate_proportion) || !rebateProportionRegl.test(submit.blocks[1].rebate_proportion)) {
            return respose.call(_this, {
                isPass: false,
                message: '返现比例不能为空',
                selected: {
                    data: $.extend({}, submit.blocks[1]),
                    index: 1
                }
            });
        }

        if (helper.isEmpty(submit.blocks[1].group_purchase_threshold)) {
            return respose.call(_this, {
                isPass: false,
                message: '成团人数不能为空',
                selected: {
                    data: $.extend({}, submit.blocks[1]),
                    index: 1
                }
            });
        }

        var salePriceRegl = /^\d{1,3}(\.\d{1,2})?$/;
        if (!salePriceRegl.test(submit.blocks[1].sale_price)) {
            return respose.call(_this, {
                isPass: false,
                message: '拼团价格输入错误',
                selected: {
                    data: $.extend({}, submit.blocks[1]),
                    index: 1
                }
            });
        }


        if (helper.isEmpty(submit.blocks[1].shops)) {
            return respose.call(_this, {
                isPass: false,
                message: '门店不能为空',
                selected: {
                    data: $.extend({}, submit.blocks[1]),
                    index: 1
                }
            });
        }

        if (helper.isEmpty(submit.blocks[1].rebate_limit)) {
            return respose.call(_this, {
                isPass: false,
                message: '返现金额不能为空',
                selected: {
                    data: $.extend({}, submit.blocks[1]),
                    index: 1
                }
            });
        }


        if (helper.isEmpty(submit.blocks[1].rebate_card_desc)) {
            return respose.call(_this, {
                isPass: false,
                message: '使用说明不能为空',
                selected: {
                    data: $.extend({}, submit.blocks[1]),
                    index: 1
                }
            });
        }


        // bannerList 列表
        var isMainUrlNull = !submit.blocks[0].images.every(function (image) {
            return !helper.isEmpty(image.img_url);
        });


        if (isMainUrlNull) {
            return respose.call(_this, {
                isPass: false,
                message: '请上传banner图片',
                selected: {
                    data: $.extend({}, submit.blocks[0]),
                    index: 0
                }
            })
        }

        // var isAllImagesUrlIsNotNull = !submit.blocks[2].images.every(function (image) {
        //     return !helper.isEmpty(image.img_url);
        // });


        // if (isAllImagesUrlIsNotNull) {
        //     return respose.call(_this, {
        //         isPass: false,
        //         message: '请上传banner图片',
        //         selected: {
        //             data: $.extend({}, submit.blocks[2]),
        //             index: 2
        //         }
        //     })
        // }



        return respose.call(_this, {
                isPass: true,
                message: ''
            }
        )

    }

    var install = function (Vue) {

        Vue.mixin({
            methods: {
                $$validate: function () {
                    console.log("$$validate");
                    var _this = this;
                    if (!_this.submit) return new respose(true);
                    //验证

                    return validateCallBack.call(_this)
                }
            },
            data: function () {
                return {
                    $$validateErrors: null
                }
            }
        });
    };

    return {
        install: install, //初始化插件
        defaultOptions: defaultOptions, //默认参数
        version: '0.0.10'              //版本号
    }
})))
;
