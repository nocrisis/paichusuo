/**
 * Created by wangzhaodan on 17/12/15.
 */
(function ($) {

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
    var uploadBox = function ($wrapUploadContent) {
        var _this = this;
        _this.$wrapUploadContent = $wrapUploadContent;


        // if (!$.isArray(blobUrlArr)) {
        //     blobUrlArr = [];
        // }
        // _this.init(blobUrlArr.length < max);
        //
        // blobUrlArr.forEach(function (blobUrl) {
        //     _this.add(blobUrl);
        // });
        //

    };
    uploadBox.prototype = {

        init: function (isShow) {
            var addTpl = '<div class="inline-block wrap-upload-content">' +
                '<div class="upload-content add-upload-content contain-pic-video ' + (isShow ? "" : "hide") + '">' +
                '<div class="img-upload-warp"><b>＋</b><p>添加图片</p></div>' +
                '<div class="upload-mark">' +
                '<input class="store-input text-left" type="file" accept="image/x-png,image/jpeg">' +
                '</div>' +
                '</div>' +
                '</div>';
            this.$wrapUploadContent.html(addTpl);
        },
        add: function (imgSrc) {
            var contentHtml = '<div class="upload-content need-upload photos videos"><img class="thumbnail-pic new " src="' + imgSrc + '"/>' +
                '<div class="upload-mark"><span class="delete">删除</span></div></div>';
            this.$wrapUploadContent.find('.add-upload-content').before(contentHtml);
        },
        remove: function (index) {
            this.$wrapUploadContent.find('.need-upload').eq(index).remove();
        },
        show: function () {
            this.$wrapUploadContent.find('.add-upload-content').removeClass('hide');
        },
        hide: function () {
            this.$wrapUploadContent.find('.add-upload-content').addClass('hide');
        },
        set: function (type) {
            if (type === 'addPic') {
                this.$wrapUploadContent.find('.add-upload-content .img-upload p').text('添加图片');
                this.$wrapUploadContent.find('.add-upload-content input[type="file"]').attr('accept', 'image/x-png,image/png,image/jpeg');
            }
            else if(type === 'onlyVideo') {
                this.$wrapUploadContent.find('.add-upload-content .img-upload p').text('添加视频');
                this.$wrapUploadContent.find('.add-upload-content input[type="file"]').attr('accept', 'video/mp4');
            }else {
                this.$wrapUploadContent.find('.add-upload-content .img-upload p').text('添加视频、图片');
                this.$wrapUploadContent.find('.add-upload-content input[type="file"]').attr('accept', 'image/x-png,image/png,image/jpeg,video/mp4');
            }

        }
    };


    var imgOpreate = function ($wrapUploadContent, config) {

        this.$wrapUploadContent = $wrapUploadContent;
        this.config = $.extend(true, {}, imgOpreate.config, config);
        this.config.videoMaxSize *= 1024;
        this.config.picMaxSize *= 1024;

        if (config.blobUrlArr && config.blobUrlArr.length != 0) {
            this.blobUrlArr = config.blobUrlArr.slice(0);
        } else {
            this.blobUrlArr = [];
        }
        this.uploadBox = new uploadBox($wrapUploadContent, this.blobUrlArr, this.config.max);

        this.init();
    };
    imgOpreate.config = {
        max: 5,
        videoMaxSize: 0,    // kb
        picMaxSize: 3 * 1024,  // kb
        type: 'addVideo', // addPic or addVideo onlyVideo
        copperCut: {
            aspectRatio: 1,
            maxSize: 1 * 1024, // kb
            maxWidth: 750,
            maxHeight: 750,
            fileTypeExts: 'jpg,jpeg,png',
            outType: 'blob',
        },
        onChoose: function (blobUrlArr) {

        },
        onDeleteBefore: function (obj, index) {

        },
        onDelete: function (index) {

        }
    };

    imgOpreate.prototype = {


        /** params
         * imgsec 图片地址
         * positionImage 图片插入位置
         * */
        add: function (file, type) {
            var imgSrc;
            if (type === 'addVideo') {
                imgSrc = '/images/baymax/video-preview.png?201712251319';
            } else {
                imgSrc = URL.createObjectURL(file);
            }

            this.uploadBox.add(imgSrc);


            this.blobUrlArr.push(file);
            if (this.config.onChoose && this.config.onChoose) {
                this.config.onChoose.call(this, this.blobUrlArr);
            }
            this.$wrapUploadContent.find('.promotion-content').val('100').blur();
            if (type === 'addVideo' || this.blobUrlArr.length === this.config.max && type === 'addPic') {
                this.uploadBox.hide();
                return false;
            }

            this.uploadBox.set('addPic');
            this.config.type = 'addPic';
            this.uploadBox.show();
        },
        remove: function (index) {
            this.uploadBox.remove(index);
            this.blobUrlArr.splice(index, 1);
            this.uploadBox.show();
            if (this.blobUrlArr.length === 0) {
                this.uploadBox.set(this.config.type);
                this.config.type = this.config.type;
                this.$wrapUploadContent.find('.add-upload-content input[type="file"]').val('');
                this.$wrapUploadContent.find('.promotion-content').val('').blur();
            }
        },
        validateSize: function (files) {
            var allowExts='image/jpg image/jpeg image/png'.split(' ');
            if(this.config.videoMaxSize>0&&allowExts.indexOf('video/mp4')==-1){
                allowExts.push('video/mp4')
            }
            if (allowExts.indexOf(files[0].type) == -1) {
                layer.Notify.notice('文件格式错误，请重新上传');
                return false;
            }

            var noticeMsg;
            if (files[0].type === 'video/mp4' && (files[0].size > this.config.videoMaxSize)) {
                noticeMsg = '视频不能超过' + (CaculatorSize(this.config.videoMaxSize)) + ',当前视频' + CaculatorSize(files[0].size);
            }
            if (files[0].type !== 'video/mp4' && (files[0].size > this.config.picMaxSize)) {
                noticeMsg = '图片不能超过' + (CaculatorSize(this.config.picMaxSize)) + '，当前图片' + CaculatorSize(files[0].size);
            }
            if (noticeMsg) {
                layer.Notify.notice(noticeMsg);
                return false;
            }

            return true;
        },
        bindEvents: function () {
            var _this = this;
            this.$wrapUploadContent.find('.add-upload-content input[type="file"]').on('change', function () {

                var files = this.files;
                if (files.length <= 0) {
                    return false;
                }

                if(_this.config.type==='onlyVideo'){
                    if(files[0].type !== 'video/mp4'){
                        layer.Notify.notice('视频类型错误,只支持mp4类型');
                        $(this).val('');
                        return false;
                    }
                }

                if (files[0].type === 'video/mp4' && _this.blobUrlArr.length > 0) {
                    layer.Notify.notice('上传格式错误，请选择图片重新上传');
                    $(this).val('');
                    return false;
                }
                if (!_this.validateSize(files)) {
                    $(this).val('');
                    return false;
                }
                if (files[0].type === 'video/mp4') {
                    _this.add(files[0], 'addVideo');
                    return false;
                }

                if (!$.isFunction($.lmfCropper)) {
                    _this.add(files[0], 'addPic');
                    return false;
                }


                $.lmfCropper(files[0], this, $.extend({}, _this.config.copperCut, {
                    success: function (imgsrc) {
                        _this.add(imgsrc, 'addPic');
                    },
                    fail: function (res) {
                        layer.Notify.notice(res.msg);
                    }
                }));

                $(this).val('');


            });


            _this.$wrapUploadContent.on('click', '.delete', function () {
                var index = $(this).parents('.upload-content').index();
                if (_this.config.onDeleteBefore) {
                    var deleteBeforeBack = _this.config.onDeleteBefore.call(_this, this, index);

                    //callback
                    if (deleteBeforeBack === false) {
                        return false;
                    }
                    //Promise
                    if (deleteBeforeBack && deleteBeforeBack.then) {
                        deleteBeforeBack.then(function (isCanDelete) {
                            if (isCanDelete === false) {
                                return false;
                            }
                            _this.remove(index);
                        });
                        return false;
                    }
                }

                _this.remove(index);
            });
        },

        getData: function () {
            return this.blobUrlArr;
        },
        init: function () {
            this.bindEvents();
        }
    };


    $.fn.chooseMedia = function (method) {
        var _imgOpreate = $(this).data('imgOpreate');
        if (!_imgOpreate) {
            _imgOpreate = new imgOpreate($(this), method);
            $(this).data('imgOpreate', _imgOpreate);
        } else {
            if (_imgOpreate[method]) {
                return _imgOpreate[method].apply(_imgOpreate, Array.prototype.slice.call(arguments, 1));
            }
        }
        return this;
    };


})(jQuery);
