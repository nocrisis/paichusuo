/**
 * Created by andy on 2016/10/13.
 */
(function ($) {

    //全局配置，如果采用默认均不需要改动
    var config = {
        cropper: {
            css: '../../styles/cropper.min.css',
            js: '../cropper.min.js'
        },
        layer: {
            js: '../layer/layer.js'
        },
        path: '', //laydate所在路径
    };
    var MAX_FILE_SIZE = 10 * 1024 * 1024; // -> 最大10M

    var lmfCropper = {}, doc = document, creat = 'createElement', byid = 'getElementById',
    tags = 'getElementsByTagName';
    //获取组件存放路径
    var getPath = (function () {
        var js = document.scripts, jsPath = js[js.length - 1].src;
        return config.path ? config.path : jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
    }());
    var tpl = {
        dialog: function () {
            return ' <div class="dialog-upload">' +
            '  <div class="wrap-img"><img class="hide" data-upload-image /></div> ' +
            '      <div class="operate"> ' +
            '       <div class="btn-group"> ' +
            '   <button type="button" class="btn btn-primary" data-method="zoom" data-option="0.1" title="Zoom In"> ' +
            '   <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.zoom(0.1)"> ' +
            '   <i class="glyphicon glyphicon-zoom-in"></i>' +
            '   </span>  ' +
            '   </button>' +
            '   <button type="button" class="btn btn-primary" data-method="zoom" data-option="-0.1" title="Zoom Out"> ' +
            '   <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.zoom(-0.1)"> ' +
            '   <i class="glyphicon glyphicon-zoom-out"></i>  ' +
            '   </span>    ' +
            '   </button> ' +
            '   </div>  ' +
            '   <div class="btn-group">    ' +
            '   <button type="button" class="btn btn-primary" data-method="rotate" data-option="-90" title="Rotate Left"> ' +
            '   <span class="docs-tooltip">  ' +
            '   <i class="glyphicon glyphicon-share-alt"></i>  ' +
            '   </span>      ' +
            ' </button>      ' +
            ' <button type="button" class="btn btn-primary" data-method="rotate" data-option="90" title="Rotate Right"> ' +
            ' <span class="docs-tooltip">      ' +
            ' <i class="glyphicon glyphicon-share-alt" style="transform: rotateY(180deg);"></i>    ' +
            ' </span>    ' +
            ' </button>  ' +
            '</div>  ' +
            '<button type="button" class="btn btn-primary " data-crop-success>确定</button>' +
            '</div>' +
            '</div>'
        }()
    };


    //加载资源
    lmfCropper.use = function () {
        var use = function (type, filename) {
            var link;
            if (type == 'css') {
                link = doc[creat]('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = getPath + filename;
            } else {
                link = doc[creat]('script');
                link.type = 'text/javascript';
                link.src = getPath + filename;
            }
            doc[tags]('head')[0].appendChild(link);
            link = null;
        };
        return {
            css: function (filename) {
                return use('css', filename)
            },
            js: function (filename) {
                return use('js', filename)
            }
        }
    }();


    //初始化
    lmfCropper.init = function () {
        //cropper依赖
        if (!('cropper' in $.fn)) {
            this.use.css(config.cropper.css);
            this.use.js(config.cropper.js);
        }
        //layer依赖
        if ((typeof  layer) == 'undefined') {
            this.use.js(config.layer.js);
        }
    };


    lmfCropper.init();


    //默认参数
    var defaultOptions = {
        maxSize: MAX_FILE_SIZE,
        aspectRatio: 1,  //切图比例
        maxWidth: 750,   //最大宽度
        maxHeight: 750,  //最大高度,
        fileTypeExts: 'jpg,png',//文件后缀限制  gif,jpg,png,bmp,jpeg
        isCut: true, //是否裁剪
        outType: "base64", //裁剪后返回类型 base64/blob
        success: function (imageBase64) {  //成功回调

        },
        fail: function (msg) {//失败回调

        }

    };
    var isImageFile = function (file) {
        if (file && file.type) {
            return /^image\/(jpg|jpeg|png)$/.test(file.type);
        } else {
            return /\.(jpg|jpeg|png)$/.test(file);
        }
    };

    function suffix(file_name) {
        return file_name.substr(file_name.lastIndexOf(".") + 1).toLowerCase();
    }


    var URL = window.URL || window.webkitURL;

    lmfCropper.lmfCropper = function (file, _scope, options) {
        var scope = null;
        if ($.isPlainObject(_scope) == 'object') {
            options = _scope;
        } else {
            scope = _scope;
        }

        var opts = $.extend({}, defaultOptions, options);
        var blobURL;
        if (!URL) {
            return opts.fail({
                code: 1000,
                msg: '浏览器不支持'
            });
        }

        if (!$.isNumeric(opts.maxSize)) {
            opts.maxSize = MAX_FILE_SIZE;
        } else {
            opts.maxSize *= 1024;
        }

        opts.maxSize = Math.min(opts.maxSize, MAX_FILE_SIZE);

        if (!isImageFile(file)) {
            opts.fail({
                code: 1002,
                msg: '图片格式错误，请重新上传'
            });
            return false;
        }

        if (opts.maxSize < file.size) {
            opts.fail({
                code: 1005,
                msg: '图片大小不能超过' + CaculatorSize(opts.maxSize) + ',当前图片大小是' + CaculatorSize(file.size)
            });
            return false;
        }


        if (!!opts.fileTypeExts) {
            var allowExts = opts.fileTypeExts.split(',');
            allowExts.map(function (ext) {
                return ext.toLowerCase();
            });
            var _suffix = suffix(_scope.value);
            if (allowExts.indexOf(_suffix) == -1) {
                opts.fail({
                    code: 1003,
                    msg: '图片类型错误,只支持' + allowExts.join(',') + '类型'
                });
                return false;
            }
        }
        var imgType = ['image/jpg', 'image/jpeg'].indexOf(file.type) > -1 ? 'image/jpeg' : 'image/png';

        blobURL = URL.createObjectURL(file);

        var _dialogBox = null;
        if (opts.isCut) {
            _dialogBox = layer.open({
                type: 1,
                area: ['800px', '500px'],
                shadeClose: true,
                title: '图片裁剪',
                scrollbar: false,
                content: tpl.dialog,
                shadeClose:false,
                cancel: function () {
                    // opts.fail({
                    //     code: 1004,
                    //     msg: '用户关闭弹窗'
                    // });
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
                if (opts.isCut) {
                    return this._img = this._img || this.getElement().find('.layui-layer-content .dialog-upload .wrap-img [data-upload-image]').cropper({
                        // viewMode: 1,
                        aspectRatio: opts.aspectRatio,
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
                if (opts.isCut) {
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
            if (!opts.isCut) {
                var thisImgData = $image.cropper('getData');
                var cropOpts = {
                    width: Math.min(opts.maxWidth, Math.ceil(thisImgData.width)),
                    height: Math.min(opts.maxHeight, Math.ceil(thisImgData.height))
                };
                if ($.isFunction(opts.success)) {
                    if (opts.outType == 'blob') {
                        $image.cropper('getCroppedCanvas', cropOpts).toBlob(function (blob) {
                            opts.success.call(scope, blob);
                        }, imgType)
                    } else {
                        opts.success.call(scope, $image.cropper('getCroppedCanvas', cropOpts).toDataURL(imgType));
                    }
                }
                _dialog.close();
                return false;
            }
        }).cropper('reset').cropper('replace', blobURL);
        $(scope).val('');

        //直接返回
        if (!opts.isCut) {
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
                width: Math.min(opts.maxWidth, Math.ceil(thisImgData.width)),
                height: Math.min(opts.maxHeight, Math.ceil(thisImgData.height)),
                fillColor: '#fff'
            };
            if ($.isFunction(opts.success)) {
                if (opts.outType == 'blob') {
                    $image.cropper('getCroppedCanvas', cropOpts).toBlob(function (blob) {
                        opts.success.call(scope, blob);
                    }, imgType)
                } else {
                    opts.success.call(scope, $image.cropper('getCroppedCanvas', cropOpts).toDataURL(imgType));
                }
            }


            _dialog.close();
            return false;
        });

    };


    lmfCropper.export = function (options) {
        var opts = $.extend({}, defaultOptions, options);
        var blobURL;
        if (!URL) {
            return opts.fail({
                code: 1000,
                msg: '浏览器不支持'
            });
        }

        if (!$.isNumeric(opts.maxSize)) {
            opts.maxSize = MAX_FILE_SIZE;
        } else {
            opts.maxSize *= 1024;
        }

        opts.maxSize = Math.min(opts.maxSize, MAX_FILE_SIZE);

        $(this).on('change', function (event) {

            var files = this.files;
            if (!(files && files.length)) {
                return opts.fail({
                    code: 1001,
                    msg: '文件为空'
                });
            }

            lmfCropper.lmfCropper(files[0], this, opts);

        });
    };
    $.fn.extend({
        lmfCropper: lmfCropper.export
    });
    $.extend({
        lmfCropper: lmfCropper.lmfCropper,
        CaculatorSize: CaculatorSize
    });

    function CaculatorSize(size) {
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
    }
})
(jQuery);
