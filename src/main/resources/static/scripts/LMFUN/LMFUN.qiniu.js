/**
 * Created by hejun on 16/10/13.
 * 使用方法的
 *
 * 设置七牛绑定域名      LMFUN.qiniu.setDomain(domain)  domain 默认值为 http://dkongjian.lmfun.cn/
 * 设置七牛token获取url  LMFUN.qiniu.setTokenUrl(tokenUrl)  tokenUrl 默认值为 /upload/genUpToken （post方式获取）
 * 设置七牛bucketType    LMFUN.qiniu.setBucketType(bucketType)  bucketType 默认值为 dkongjian
 * 设置七牛 uploadImgDataByObject    LMFUN.qiniu.uploadImgDataByObject(submitData,opts)  submitData 上传的参数
 *
 * 上传到七牛 LMFUN.qiniu.uploadByBase64(fileBase64 / fileBase64Array,{
        progress: 4,//进度条样式 -1不显示
        onStart: function () {

        },
        onProgress: function (percent, name, number, total) {

        },
        onFinish: function (info) {

        },
        onError: function (error) {

        }
        })
 */
;!(function (global) {

    //七牛配置
    var _qiniuConfig = {
        domain: $('meta[name="QINIU_DOMAIN"]').attr('content') || 'http://dkongjian.lmfun.cn/',
        tokenUrl: '/upload/genUpToken',
        bucketType: $('meta[name="QINIU_BUCKET"]').attr('content') || 'dkongjian'
    };


    //进度条默认配置
    var defaultOptions = {
        progress: 4,//进度条样式 -1不显示
        onStart: function () {

        },
        onStartOne: function (index) {

        },
        onProgress: function (index, percent, name, number, total) {

        },
        onFinish: function (infos) {
            console.log(infos);
        },
        onFinishOne: function (index, info) {

        },
        onError: function (error) {

        }
    };
    //进度条管理
    var progress = {
        config: {
            skin: ['', 'green', 'orange', 'red', 'blue'],
        },
        skin: 0,
        _obj: null,
        getTpl: function (files) {
            var LoopTpl = '   <tr class="template-upload file-no-{i} {hideClass}">' +
                '                <td class="preview">' +
                '                    <img src="{src}" onerror="this.src=\'http://dkongjian.lmfun.cn/system/images/qiniu-image-error.jpg?201712251314\'">' +
                '                </td>' +
                '                <td class="size">' +
                '                    <p> &nbsp;</p>' +
                '                    <div class="progress">' +
                '                        <span class="green progress-bar" style="width: 0%;"><span>0%</span></span>' +
                '                    </div>' +
                '                </td>' +
                '            </tr>';

            return '<div class="progress-warp">' +
                '    <div class="progress-content">' +
                '        <table class="table table-striped clearfix">' +
                '            <tbody class="files">' +
                (function (_files) {
                    var _LoopString = '';
                    $.each(_files, function (i, file) {
                        var _LoopTpl = LoopTpl;
                        _LoopTpl = _LoopTpl.replace(/\{i\}/g, i);
                        _LoopTpl = _LoopTpl.replace(/\{src\}/g, file);
                        _LoopTpl = _LoopTpl.replace(/\{hideClass\}/g, i<=2?'':'hide');
                        _LoopString += _LoopTpl;
                    });
                    return _LoopString;
                })(files) +
                '            </tbody>' +
                '        </table>' +
                '    </div>' +
                '</div>';
            //return '<div class="progress-warp"><div class="progress"><span class="{class}"><span>20%</span></span></div><div class="progress-text">文件上传中...</div></div>'.replace('{class}', this.config.skin[this.skin]);
        },
        initCss: function () {
            if ($('#progressCss').size() == 0) {
                //加载css
                var link = document.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = '/styles/progress.css';
                link.id = 'progressCss';
                document.getElementsByTagName('head')[0].appendChild(link);
                link = null;
            }
        },
        init: function (skin, files) {
            this.initCss();
            //设置皮肤
            this.setSkin(skin);

            //初始化html
            if ($(".progress-warp").size() == 0) {
                try {
                    $('body').append(this.getTpl(files));
                } catch (e) {
                    console.trace('progress init error', e);
                }
            }

            //页面元素获取
            this._obj = $(".progress-warp");
            //显示
            this.show();
            //初始化进度
            this.setProgress(0, 1);

        },
        setSkin: function (skin) {
            this.skin = Math.min(4, parseInt(skin));
            //初始化html
            if ($(".progress-warp").size() == 1) {
                $(".progress-warp > .progress > span").removeClass().addClass(this.config.skin[this.skin]);
            }
        },
        show: function () {
            if (this._obj) this._obj.show();
        },
        hide: function () {
            if (this._obj) this._obj.hide();
        },
        remove: function () {
            if (this._obj) this._obj.remove();
        },
        setProgress: function (index, number, total) {
            var percent = (number / total * 100 | 0) + '%';
            var self = this;
            self._obj.find('.file-no-' + index).find('.progress-bar').width(percent).children('span').text(percent);
            if (percent == '100%') {
                setTimeout(function () {
                    self._obj.find('.file-no-' + index).addClass('hide').next('.template-upload.hide').removeClass('hide');
                    self._obj
                        .children('.progress-content')
                        .animate({
                            scrollTop: index * 97
                        }, 100);
                }, 200);
            }
        }
    };
    progress.initCss();
    var isBlob = function (blob) {
        return Object.prototype.toString.call(blob) === "[object Blob]" || Object.prototype.toString.call(blob) === "[object File]";
    };

    //获取文件后缀
    var getFileExt = function (base64) {
        var _ext;
        if (isBlob(base64)) {
            // video
            if (base64.type === 'video/mp4') {
                return 'mp4';
            }
            // picture
            _ext = base64.type.replace('image/', '');
            return _ext == 'png' ? 'png' : 'jpg';
        }
        if (base64.split(';base64,')[0].indexOf("data:video/") != -1) {
            return 'mp4';
        }
        _ext = base64.split(';base64,')[0].replace('data:image/', '');
        return _ext == 'png' ? 'png' : 'jpg';
    };


    //获取文件内容
    var getFileContent = function (base64) {
        if (isBlob(base64)) {
            return base64;
        }
        return base64.split(';base64,')[1];
    };
    //补零
    var right2word = function (string) {
        if (!isNaN(string)) {
            string = string.toString();
        }
        return ('0' + string).substr(string.length - 1);
    };
    //获取文件名
    var getFileName = function (fileBase64) {
        var _ext = getFileExt(fileBase64);

        var path = (function () {
            var now = new Date();
            return now.getFullYear() + "/" + right2word(now.getMonth() + 1) + '/' + right2word(now.getDate()) + '/' + now.getTime()
        })();
        return path + '-' + Math.random().toString(36).substr(2) + '.' + _ext;
    };

    var formatResponsUrl = function (responsData) {
        return _qiniuConfig.domain + responsData.key;
    };


    //上传到七牛
    var uploadToQiniu = function (imageBase64, filename, QiniuToken, index, opts) {
        var defer = $.Deferred();
        var url = (function (filename) {
            var host = {
                https: "//up.qbox.me",
                http: "//up.qiniu.com"
            };
            var isHttps = location.href.indexOf("https") == 0;
            var path = isBlob(imageBase64) ? "" : "/putb64/-1/key/" + btoa(filename);
            return (isHttps ? host.https : host.http) + path;

        })(filename);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status != 200) {
                defer.reject(xhr);
            }
            if (xhr.readyState == 4 && xhr.status == 200) {
                var responsData = JSON.parse(xhr.responseText);
                if (!!responsData.error) {
                    defer.reject(responsData);
                }
                responsData.originSrc = formatResponsUrl(responsData);
                //opts.onFinishOne(index, responsData);
                defer.resolve(responsData);

            }
        };
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                var percent = (e.loaded / e.total * 100 | 0) + '%';
                opts.onProgress(index, percent, filename, e.loaded, e.total);
                if (parseInt(opts.progress) >= 0) {
                    progress.setProgress(index, e.loaded, e.total);
                }
            }
        };
        xhr.open("POST", url, true);
        if (isBlob(imageBase64)) {
            var formData = new FormData();
            formData.append('key', filename);
            formData.append('token', QiniuToken);
            formData.append('file', imageBase64);
            formData.append('accept', 'application/json');
            xhr.send(formData);
        } else {
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Authorization", "UpToken " + QiniuToken);
            xhr.send(imageBase64);
        }
        return defer.promise();
    };

    // 缓存数据
    var cacheData = [];
    //上传列队
    var uploadQueue = function (fileBase64s, QiniuToken, opts) {
        var index = 0;
        var total = fileBase64s.length;
        var isUploadedAll = function () {
            return total == index + 1
        };
        var allResponsData = [];
        var upload = function () {
            if (index >= total) {
                progress.remove();
                opts.onFinish(allResponsData);
                return;
            }
            var fileBase64 = fileBase64s[index];
            opts.onStartOne(index);
            // 该图片是否已经上传成功，如果已经上传调用使用缓存数据
            if(!!cacheData[index] && cacheData[index].fileBase64 === fileBase64) {
                allResponsData[index] = cacheData[index].originSrc;
                return upload(index++);
            }
            $.when(uploadToQiniu(getFileContent(fileBase64), getFileName(fileBase64), QiniuToken, index, opts))
                .done(function (responsData) {
                    console.log(index, responsData);
                    allResponsData[index] = responsData;
                    cacheData[index] = {
                        originSrc: responsData,
                        fileBase64: fileBase64
                    };
                    opts.onFinishOne(index, responsData);
                    if (!isUploadedAll()) {
                        upload(index++);
                    } else {
                        progress.remove();
                        opts.onFinish(allResponsData);
                    }
                })
                .fail(function (msg) {
                    opts.onError(msg);
                    if (!isUploadedAll()) {
                        upload(index++);
                    } else {
                        progress.remove();
                        opts.onFinish(allResponsData);
                    }
                });
        };
        setTimeout(upload, 0);
    };


    var judgeValueIsLocalImage = function (value) {
        if (!value) {
            return false;
        }
        return (typeof value === 'string' && value.indexOf('data:image/') === 0) || isBlob(value);
    };


    function _dataEach(obj, callback) {
        $.each(obj, function (k, v) {
            if (typeof v === 'object' && (!isBlob(v))) {
                _dataEach(v, callback); //递归遍历
            } else if (judgeValueIsLocalImage(v)) {
                callback(obj, k, v);
            }
        });
    }

    function getImages(originData) {
        var arr = [];
        _dataEach(originData, function (obj, k, v) {
            arr.push(v);
        });
        return arr;
    }

    function assignData(originData, imgUrlArr) {
        var i = 0;
        _dataEach(originData, function (obj, k) {
            obj[k] = imgUrlArr[i].originSrc;
            i++;
        });
        return originData;
    }

    //对外方法
    var qiniu = {
        /**
         * 设置七牛domain
         * @param domain  七牛domain
         */
        setDomain: function (domain) {
            if (domain) _qiniuConfig.domain = domain;
        },
        setTokenUrl: function (tokenUrl) {
            if (tokenUrl) _qiniuConfig.tokenUrl = tokenUrl;
        },
        setBucketType: function (bucketType) {
            if (bucketType) _qiniuConfig.bucketType = bucketType;
        },
        /**
         * 上传文件
         * @param files 上传文件base64编码 string/array
         * @param options
         */
        uploadByBase64: function (fileBase64s, options) {
            if (Object.prototype.toString.call(fileBase64s) != '[object Array]') {
                fileBase64s = [fileBase64s];
            }
            if (fileBase64s.length === 0) {
                options.onFinish([]);
                return false;
            }
            var opts = $.extend({}, defaultOptions, options);
            console.log(opts);
            if (parseInt(opts.progress) >= 0) {
                progress.init(opts.progress, fileBase64s);
            }
            $.ajax({
                type: 'post',
                url: _qiniuConfig.tokenUrl,
                data: {
                    bucketType: _qiniuConfig.bucketType
                },
                success: function (QiniuToken) {
                    opts.onStart();
                    uploadQueue(fileBase64s, QiniuToken, opts);
                },
                error: function (error) {
                    opts.onError(msg);
                    progress.remove();
                }
            });

        },
        /**
         * 上传文件
         * @param submitData 当前页面提交数据,自行遍历需要上传图片
         * @param options
         */
        uploadImgDataByObject: function (submitData, options) {
            var fileBase64s = getImages(submitData);
            var originSuccess = options.onFinish;
            if (fileBase64s.length === 0) {
                options.onFinish(submitData);
                return false;
            }
            options.onFinish = function (successData) {
                var finalData = assignData(submitData, successData);
                if ($.type(originSuccess) == 'function') {
                    originSuccess(finalData);
                } else {
                    console.log('onFinish', finalData);
                }
            };
            qiniu.uploadByBase64(fileBase64s, options);
        }
    };


    "function" == typeof define ? define(function () {
        return qiniu
    }) : "undefined" != typeof exports ? module.exports = qiniu : (global.LMFUN = global.LMFUN || {}, global.LMFUN['qiniu'] = qiniu);
})(window);
