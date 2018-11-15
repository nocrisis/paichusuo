/**
 * Created by andy on 2018/6/4.
 */

layui.define(['table', 'form', 'layer', 'laytpl'], function (exports) {
    var table = layui.table;
    var form = layui.form;
    var $ = layui.$;
    var layer = layui.layer;
    var laytpl = layui.laytpl;
    
    
    var _config = {
        elem: '',
        searchFilter: 'search-box',
        tableFilter: 'operate',
        where: {
            sort_order: 'desc',
            sort_key: 'created_at'
        },
        limit: 10,
        limits: [10, 20, 30, 50],
        
        text: {
            none: '当前没有数据'
        },
        cols: []
    };
    
    var colVisibleCtrl = {
        _settingCheckIndex: {},
        init: function (tableKey, cols) {
            var that = this;
            var _settingCheckIndex = layui.data('tableColSetting', {
                    key: tableKey
                }) || '';
            that._settingCheckIndex[tableKey] = _settingCheckIndex;
            
            return that.setVisible(tableKey, cols);
            
        },
        settingCheckIndex: function (tableKey, _settingCheckIndex) {
            this._settingCheckIndex[tableKey] = _settingCheckIndex.slice(0);
            layui.data('tableColSetting', {
                key: tableKey,
                value: _settingCheckIndex.slice(0)
            })
        },
        setVisible: function (tableKey, cols) {
            var that = this;
            return cols
                .map(function (col) {
                    if (col.fixed == 'left' || col.fixed == 'right' || col.type == 'checkbox') {
                        col.visible = true;
                        return col;
                    }
                    if (that._settingCheckIndex[tableKey] == '') {
                        col.visible = $.type(col.visible) == 'undefined' ? true : !!col.visible;
                        return col;
                    }
                    if (that._settingCheckIndex[tableKey].indexOf(col.title + '') >= 0) {
                        col.visible = true;
                        return col;
                    }
                    col.visible = false;
                    return col;
                    
                });
        },
        sortCols: function (tableKey, cols) {
            var orderKeys = layui.data('tableOrderKeys', {
                key: tableKey
            });
            if (!orderKeys) {
                return cols;
            }
            if (orderKeys.length == 0) {
                return cols;
            }
            
            cols.sort(function (firstCol, secondCol) {
                return orderKeys.indexOf($.trim(firstCol.title)) - orderKeys.indexOf($.trim(secondCol.title))
            });
         
            var orderFixedKeys = ["left", undefined, null, '', "right"];
            cols.sort(function (firstCol, secondCol) {
                return orderFixedKeys.indexOf(firstCol.fixed) - orderFixedKeys.indexOf(secondCol.fixed)
            });
            if (cols.length > 0 && cols.slice(-1)[0].title == '操作') {
                cols[cols.length - 1].undraggable = true;
            }
            return cols
        },
        getCols: function (tableKey, cols) {
            return this.sortCols(tableKey, cols.filter(function (col) {
                return col.visible === true;
            }));
        }
    };
    
    
    var TableCtrl = function (tableConfig, operateEvents) {
        
        this.tableIns = null;
        this.checkStatus = function () {
            return table.checkStatus(this.tableIns.config.id)
        };
        this.render = function () {
            this.tableIns = table.render(this._CONFIG);
            return this;
        };
        this.reload = function (options) {
            this._CONFIG = $.extend({}, this._CONFIG, options);
            this.tableIns = table.render(this._CONFIG);
            return this;
        };
        this.reloadWithKeepPage = function (options) {
            var pageConfig = {
                page: {
                    curr: this.tableIns.config.page.curr
                }
            };
            return this.reload($.extend({}, pageConfig, options));
        };
        return this.init(tableConfig, operateEvents)
    };
    
    
    TableCtrl.prototype = {
        _CONFIG: {},
        _OPT_EVENTS: {},
        init: function (tableConfig, operateEvents) {
            
            this._CONFIG = this.config = $.extend({}, _config, tableConfig);
            
            //this.newCols = layui.data('newCols').newCols || this._CONFIG.cols[0];
            
            this._CONFIG._defaultCols = [colVisibleCtrl.init(this._CONFIG.elem, this._CONFIG.cols[0].slice(0))];
            
            this._CONFIG.cols = [colVisibleCtrl.getCols(this._CONFIG.elem, this._CONFIG._defaultCols[0])];
            
            
            // console.log(this._CONFIG.cols);
            this._OPT_EVENTS = $.extend({}, operateEvents);
            this.bindEvents();
            this.render();
            form.render();
            return this;
        },
        
        bindEvents: function () {
            var that = this;
            
            //点击设置按钮事件
            var settingContent = '<div class="layui-row">' +
                '<form class="layui-form setting-form" lay-filter="setting-form">' +
                '{{# d.forEach(function(col,i){ ' +
                ' var checked = col.visible === true ?"checked ":"";' +
                'var disabled = (col.fixed == "left" || col.fixed == "right" || col.type == "checkbox"  ) ?"disabled":""; ' +
                '}}' +
                '<div class="layui-col-sm3">' +
                '  <label>' +
                '    <input name="settingCheck[]" type="checkbox" lay-skin="primary" lay-ignore value="{{ col.title }}" title="{{ col.title }}" {{ disabled }} {{ checked }} > ' +
                '  {{ col.title }}' +
                '  </label>' +
                '</div>' +
                '{{# }) }}' +
                '<input type="submit" value="提交" lay-submit lay-filter="setting-form" class="layui-hide">' +
                '</form>' +
                '</div>';
            
            $(that._CONFIG.elem).prev('.layui-table-toolbox').find('[lay-filter="setting"]').on('click', function () {
                var _settingContent = laytpl(settingContent).render(that._CONFIG._defaultCols[0]);
                layer.open({
                    type: 1,
                    title: "自定义列表项",
                    btn: ['确定', '取消'],
                    area: ['600px', '300px'],
                    content: _settingContent,
                    resize: false,
                    scrollbar: false,
                    shadeClose: false,
                    shade: [0.3, '#000'],
                    success: function () {
                        layui.use(['form'], function () {
                            
                            form.on('submit(setting-form)', function (data) {
                                data.field.settingCheck = data.field.settingCheck.filter(function (field) {
                                    return field != '';
                                });
                                colVisibleCtrl.settingCheckIndex(that._CONFIG.elem, data.field.settingCheck || []);
                                
                                that._CONFIG._defaultCols[0] = colVisibleCtrl.setVisible(that._CONFIG.elem, that._CONFIG._defaultCols[0]);
                                
                                that._CONFIG.cols[0] = colVisibleCtrl.getCols(that._CONFIG.elem, that._CONFIG._defaultCols[0]);
                                that.tableIns.reload(that._CONFIG);
                                return false;
                            });
                            form.render();
                            
                        });
                        
                    },
                    yes: function (index) {
                        $('.layui-layer-content .setting-form [lay-submit]').click();
                        layer.close(index);
                    }
                });
            });
            
            
            // 注册表格查询事件
            form.on('submit(' + that._CONFIG.searchFilter + ')', function (data) {
                
                //todo 到底要不要保留之前传来的 参数
                that._CONFIG.where = $.extend({}, _config.where, data.field);
                that._CONFIG.page = {
                    curr: 1
                };
                that.tableIns.reload(that._CONFIG);
                layer.closeAll();
                return false;
            });
            
            
            // 拖动列事件
            table.on('sortable(' + that._CONFIG.tableFilter + ')', function (object) {
                
                var orderKeys = object.data.map(function (res) {
                    return $.trim(res.title);
                });
                
                layui.data('tableOrderKeys', {
                    key: that._CONFIG.elem,
                    value: orderKeys
                });
            });
            
            // 注册表格排序事件
            table.on('sort(' + that._CONFIG.tableFilter + ')', function (object) {
                that._CONFIG.where = $.extend({}, _config.where, {
                    order: object.type,
                    sort_field: object.field
                });
                that.tableIns.reload(that._CONFIG);
                return false;
            });
            
            
            // 注册表格操作事件
            table.on('tool(' + that._CONFIG.tableFilter + ')', function (obj) {
                var layEvent = obj.event;
                if (that._OPT_EVENTS[layEvent] && $.isFunction(that._OPT_EVENTS[layEvent])) {
                    that._OPT_EVENTS[layEvent](obj);
                }
            });
            
            //查询更多按钮事件
            $('[lay-filter="' + that._CONFIG.searchFilter + '"]').on('click', '.btn-search-more', function (event) {
                    var searchForm = $(this).parents('.layui-form').find('.more-search-form');
                    var state = searchForm.attr('data-state');
                    if (state == 'hide') {
                        searchForm
                            .removeClass('layui-hide')
                            .attr('data-state', 'show')
                            .find(':checkbox,:radio,select,textarea').attr('data-ignore-hidden', 'false');
                        $(this).html('收起 <i class="layui-icon layui-icon-up"></i>');
                        
                    } else {
                        searchForm
                            .addClass('layui-hide')
                            .attr('data-state', 'hide')
                            .find(':checkbox,:radio,select,textarea').attr('data-ignore-hidden', 'true');
                        $(this).html('更多搜索 <i class="layui-icon layui-icon-down"></i>');
                    }
                })
                .find('.more-search-form[data-state="hide"]')
                .find(':checkbox,:radio,select,textarea').attr('data-ignore-hidden', 'true');
        }
    }
    ;
    
    
    exports('lmfTable', function (tableConfig, operateEvents) {
        return new TableCtrl(tableConfig, operateEvents)
    });
});

