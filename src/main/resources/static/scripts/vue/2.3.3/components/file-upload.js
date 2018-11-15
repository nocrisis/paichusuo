/**
 * Created by Andy on 17/12/21.
 */
(function () {
    var URL = window.URL || window.webkitURL;
    var MAX_FILE_SIZE = 10 * 1024 * 1024; // -> 最大10M
    var isImageFile = function (file) {
        if (file && file.type) {
            return /^image\/(jpg|jpeg|png)$/.test(file.type);
        } else {
            return /\.(jpg|jpeg|png)$/.test(file);
        }
    };
    var suffix = function (file_name) {
        return file_name.substr(file_name.lastIndexOf(".") + 1).toLowerCase();
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
    var DIALOG_TPL = document.getElementById('tpl-file-upload-box').innerHTML;
    Vue.component('file-upload', {
        template: '#tpl-file-upload',
        props: {
            'classes': {
                type: String,
                default: 'addfile',
                required: false
            },
            'outType':{
                type: String,
                default: 'base64',
                required: false
            },
            'isCut': {     //是否裁剪
                type: Boolean,
                default: true,
                required: false
            },
            'maxSize': {
                type: Number,
                default: MAX_FILE_SIZE,
                required: false
            },
            'aspectRatio': {     //切图比例
                type: Number,
                default: 1,
                required: false
            },
            'maxWidth': {        //最大宽度
                type: Number,
                default: 750,
                required: false
            },
            'maxHeight': {       //最大高度
                type: Number,
                default: 750,
                required: false
            },
            'fileTypeExts': {      //文件后缀限制  gif,jpg,png,bmp,jpeg
                type: Array,
                default: function () {
                    return ['jpg', 'jpeg', 'png'];
                },
                required: false
            }
        },
        // data: function () {
        //     return {
        //
        //         allowExts: this.fileTypeExts.map(function (ext) {
        //             return ext.toLowerCase();
        //         })
        //     }
        // },
        computed: {
            _maxSize: function () {
                return Math.min(this.maxSize * 1024, MAX_FILE_SIZE)
            },
            allowExts: function () {
                return this.fileTypeExts.map(function (ext) {
                    return ext.toLowerCase();
                })
            }
        },
        methods: {

            success: function (file) {
                this.value = file;
                this.$emit("input", file);
            },
            fail: function (error_info) {
                this.$emit("fail", error_info);
                if (error_info.code == 1004) {
                    return;
                }
                layer.Notify.error(error_info.msg, {time: 1000})
            },
            handleimagechange: function (event) {
                var _this = this;
                var files = event.target.files;
                var blobURL;


                if (!(files && files.length)) {
                    return false;
                }

                var _suffix = suffix(event.target.value);
                if (!isImageFile(files[0]) || _this.allowExts.indexOf(_suffix) == -1) {
                    _this.fail({
                        code: 1003,
                        msg: '图片类型错误,只支持' + _this.allowExts.join(',') + '类型'
                    });
                    return false;
                }

                if (_this._maxSize < files[0].size) {
                    _this.fail({
                        code: 1005,
                        msg: '图片大小不能超过' + CaculatorSize(_this._maxSize) + ',当前图片大小是' + CaculatorSize(files[0].size)
                    });
                    return false;
                }


                if (!URL) {
                    fileToBase64(files, function (base64) {
                        _this.success(base64);
                    }, 1024);
                    return false;
                }
                var imgType = ['image/jpg', 'image/jpeg'].indexOf(files[0].type) > -1 ? 'image/jpeg' : 'image/png';

                blobURL = URL.createObjectURL(files[0]);

                var _dialogBox = null;
                if (_this.isCut) {
                    _dialogBox = layer.open({
                        type: 1,
                        area: ['800px', '500px'],
                        shadeClose: true,
                        title: '图片裁剪',
                        scrollbar: false,
                        content: DIALOG_TPL,
                        cancel: function () {
                            _this.fail({
                                code: 1004,
                                msg: '用户关闭弹窗'
                            });
                        }
                    });
                }

                var _dialog = {
                    _id: _dialogBox,
                    _img: null,
                    getElement: function () {
                        return this._id ? $('#layui-layer' + this._id) : this._id;
                    },
                    getImage: function () {
                        if (_this.isCut) {
                            return this._img = this._img || this.getElement().find('.layui-layer-content .dialog-upload .wrap-img [data-upload-image]').cropper({
                                // viewMode: 1,
                                aspectRatio: _this.aspectRatio,
                                modal: true,
                                autoCropArea: 1,
                                scalable: true,
                                rotatable: true,
                                zoomable: true,
                                dragMode: "move",
                                guides: false,
                                zoomOnTouch: true,
                                zoomOnWheel: true,
                                cropBoxMovable: false,
                                dragCrop: true,
                                // cropBoxResizable: false,
                                // toggleDragModeOnDblclick: false
                            });
                        }
                        return this._img = this._img || $(new Image()).cropper({
                            viewMode: 1,
                            autoCropArea: 1,
                            restore: false,
                            modal: false,
                            guides: false,
                            highlight: false
                            // cropBoxMovable: false,
                            // cropBoxResizable: false

                        });
                    },
                    close: function () {
                        if (_this.isCut) {
                            layer.close(this._id);
                        }
                        try {
                            this.getImage().remove();
                        } catch (e) {
                        }

                    }
                };

                var $image = _dialog.getImage();
                // Cropper
                $image.one('built.cropper', function () {
                    URL.revokeObjectURL(blobURL);
                    //直接返回
                    if (!_this.isCut) {
                        var thisImgData = $image.cropper('getData');
                        var cropOpts = {
                            width: Math.min(_this.maxWidth, Math.ceil(thisImgData.width)),
                            height: Math.min(_this.maxHeight, Math.ceil(thisImgData.height))
                        };
                        if ($.isFunction(_this.success)) {
                            if (_this.outType == 'blob') {
                                $image.cropper('getCroppedCanvas', cropOpts).toBlob(function (blob) {
                                    _this.success(blob);
                                }, imgType)
                            } else {
                                _this.success($image.cropper('getCroppedCanvas', cropOpts).toDataURL(imgType,1.0));
                            }
                        }
                      // ;  _this.success($image.cropper('getCroppedCanvas', cropOpts).toDataURL(imgType))
                        _dialog.close();
                        return false;
                    }
                }).cropper('reset').cropper('replace', blobURL);
                $(event.target).val('');

                //直接返回
                if (!_this.isCut) {
                    return false;
                }
                //裁剪
                !!_dialog.getElement() && _dialog.getElement().find('[data-method]').on('click', function () {
                    var method = $(this).data('method');
                    var operate = $(this).data('option');
                    $image.cropper(method, operate);
                    return false;
                });
                !!_dialog.getElement() && _dialog.getElement().find('[data-crop-success]').on('click', function () {
                    var thisImgData = $image.cropper('getData');
                    var cropOpts = {
                        width: Math.min(_this.maxWidth, Math.ceil(thisImgData.width)),
                        height: Math.min(_this.maxHeight, Math.ceil(thisImgData.height)),
                        fillColor: '#fff'
                    };
                    if ($.isFunction(_this.success)) {
                        if (_this.outType == 'blob') {
                            $image.cropper('getCroppedCanvas', cropOpts).toBlob(function (blob) {
                                _this.success(blob);
                            }, imgType)
                        } else {
                            _this.success($image.cropper('getCroppedCanvas', cropOpts).toDataURL(imgType,1.0));
                        }
                    }

                    _dialog.close();
                    return false;
                });

            }
        }
    });
})();
