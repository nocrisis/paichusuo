function time() {
    //获得显示时间的div
    t_div = document.getElementById('showtime');
    var now = new Date()
    //替换div内容
    t_div.innerHTML = "现在是" + now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日" + now.getHours() + "时" + now.getMinutes() + "分" + now.getSeconds() + "秒";
    //等待一秒钟后调用time方法，由于settimeout在time方法内，所以可以无限调用
    setTimeout(time, 1000);
}

layui.use(['layer', 'lmfTable'], function () {
    var layer = layui.layer;
    var $ = layui.$;
    var common_table = layui.lmfTable;

    var ajaxUrl = {
        getList: '/taskmanagement/sontask/listsontask',
        delete: '/taskmanagement/sontask/deletesontask'
    };

    var TABLE_CONFIG = {
        //数据请求地址
        url: ajaxUrl.getList,
        //数据渲染表
        elem: '#sontaskTableList',
        tableFilter: 'listShipments-table',
        //搜索form表单
        searchFilter: 'listShipments-search-box',
        where: {
            task_id: task_id,
            order: 'desc',
            sort_field: 'created_at'
        },
        page: true,
        limit: 20,
        //列表字段
        cols: [[
            {
                field: 'task_id',
                title: '子任务编号',
                valign: 'middle',
                align: 'left'
            },
            {
                field: 'son_task_id',
                title: '主任务编号',
                valign: 'middle',
                align: 'left'
            },
            {
                field: '',
                valign: 'middle',
                title: '任务类别',
                align: 'center',
                templet: function (row) {
                    if (row.task_category)
                        return taskCategory[row.task_category];
                }
            },
            {
                field: '',
                valign: 'middle',
                title: '完成情况',
                templet: function (row) {
                    return finishStatus[row.finish_status];
                }
            },
            {
                field: 'deadline',
                valign: 'middle',
                title: '截止时间',
            },
            {
                field: 'task_detail',
                valign: 'middle',
                title: '任务详情',
            },
            {
                field: '',
                valign: 'middle',
                title: '任务区域',
                templet: function (row) {
                    return taskArea[row.task_area];
                }
            },
            {
                field: '',
                valign: 'middle',
                title: '任务地点',
                templet: function (row) {
                    return place[row.place];
                }
            },
            {
                field: '',
                valign: 'middle',
                title: '任务负责人',
                templet: function (row) {
                    return row.cop_id + ' ' + row.cop_name;
                }
            },
            {
                field: 'finish_time',
                valign: 'middle',
                title: '完成时间',
            },
            {
                valign: 'middle',
                title: '操作',
                width: '200',
                resize: false,
                fixed: 'right',
                align: 'center',
                templet: '#operateTemplate'
            }
        ]
        ]
    };

    var $tableList = common_table(TABLE_CONFIG);

});

