(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.marketIntroValidate = factory());
}(this, (function () {
    'use strict';

    var defaultOptions = {
        msg: {},
        methods: {},
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
                block_type: 'page_config'
            },
            index: -1,
        },
        message: '',
        isPass: false
    };


    //扩展方法
    var helper = {};
    helper.isEmpty = function (string) {
        return string == undefined || string == null || string.length == 0 || string == ''
    };

    var validateCallBackServiceIntro = function (service_intro, type) {
        var _this = this;
        _this.curr_block_type = type;
        var msgType = (type == 'mall_services') ? '商场服务' : '商场简介';
        var serviceIntros = service_intro;
        var message = '';

        $.each(serviceIntros, function (i, serviceIntro) {

            if (!helper.isEmpty(serviceIntro.description)
                || !!serviceIntro.image_content && !helper.isEmpty(serviceIntro.image_content.img_url)
                || !helper.isEmpty(serviceIntro.text_content)) {


                //description
                if (helper.isEmpty(serviceIntro.description)) {
                    message = '请输入' + msgType + '标题';
                    return false;
                }

                if (serviceIntro.description.length > 10) {
                    message = msgType + '标题最多可输入10个中文字';

                    return false;

                }

                //image_content.img_url
                if (helper.isEmpty(serviceIntro.image_content.img_url)) {
                    console.log(serviceIntro, _this.curr_block_type);
                    message = '请选择' + msgType + '图片';
                    return false;

                }

                //text_content
                if (helper.isEmpty(serviceIntro.text_content)) {
                    message = '请输入' + msgType + '内容';
                    return false;
                }

                if (serviceIntro.text_content.length > 100) {
                    message = msgType + '内容最多可输入100个中文字';
                    return false;

                }
            }

        });

        console.log('_this', _this);

        return {
            isPass: message == '' ? true : false,
            resData: (function () {
                return {
                    message: message,
                    selected: {
                        data: _this,
                        index: 3
                    }
                }
            })()


        }
    };

    function validateCallBack() {
        var _this = this;
        console.log('$$validate  callback =>');

        var submit = _this.submit || {};
        var selected = _this.selected || {};


        //标题
        if (helper.isEmpty(submit.page_name)) {
            return respose.call(_this, {
                message: '标题名称不能为空',
            });
        }

        if (submit.page_name.length > 15) {
            return respose.call(_this, {
                message: '最多可输入15个中文字',
            });
        }

        //分享文案+图片
        if (!helper.isEmpty(submit.share.friend_title) || !!submit.share.image && !helper.isEmpty(submit.share.image.img_url) || !helper.isEmpty(submit.share.friend_content)) {

            //分享标题
            if (helper.isEmpty(submit.share.friend_title)) {
                return respose.call(_this, {
                    message: '请输入分享标题',
                });
            }

            if (submit.share.friend_title.length > 28) {
                return respose.call(_this, {
                    message: '分享标题最多可输入28个中文字',
                });
            }

            //分享图片
            if (!!submit.share.image && helper.isEmpty(submit.share.image.img_url)) {
                return respose.call(_this, {
                    message: '请上传分享图片',
                });
            }

            //分享内容
            if (helper.isEmpty(submit.share.friend_content)) {
                return respose.call(_this, {
                    message: '请输入分享内容',
                });
            }

            if (submit.share.friend_content.length > 28) {
                return respose.call(_this, {
                    message: '分享内容最多可输入28个中文字',
                });
            }

        }

        //block1  banner 区块
        if (submit.blocks[0].banner_imgs.length == 0 || (submit.blocks[0].banner_imgs.length == 1 && !submit.blocks[0].banner_imgs[0].img_url)) {
            return respose.call(_this, {
                isPass: false,
                message: '请至少上传一张banner图',
                selected: {
                    data: submit.blocks[0],
                    index: 0,
                }
            })
        }

        //block2  description 区块
        if (helper.isEmpty(submit.blocks[1].description)) {
            return respose.call(_this, {
                isPass: false,
                message: '请输入商场和场馆名称',
                selected: {
                    data: submit.blocks[1],
                    index: 1,
                }
            })
        }

        if (submit.blocks[1].description.length > 12) {
            return respose.call(_this, {
                isPass: false,
                message: '最多可输入12个中文字',
                selected: {
                    data: submit.blocks[1],
                    index: 1,
                }
            })
        }


        //block2 banner_imgs
        if (helper.isEmpty(submit.blocks[1].image_content.img_url)) {
            return respose.call(_this, {
                isPass: false,
                message: '请添加商场和场馆的图片',
                selected: {
                    data: submit.blocks[1],
                    index: 1,
                }
            })
        }


        //block4   mall_services index==3
        var serviceV = validateCallBackServiceIntro.call(submit.blocks[3], submit.blocks[3].mall_services, 'mall_services');
        if (!serviceV.isPass) {
            return respose.call(_this, serviceV.resData);
        }

        //block4   mall_intros index==3
        var introV = validateCallBackServiceIntro.call(submit.blocks[3], submit.blocks[3].mall_intros, 'mall_intros');
        if (!introV.isPass) {
            return respose.call(_this, introV.resData);
        }


        return respose.call(_this, {
                isPass: true,
                message: '',
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
                    $$validateErrors: null,
                }
            }
        });
    };

    return {
        install: install, //初始化插件
        defaultOptions: defaultOptions, //默认参数
        version: '0.0.10',              //版本号
    }
})))
;
