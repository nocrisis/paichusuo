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
        getList: '/CopStaffManagement/info/listcop',
        delete: '/CopStaffManagement/info/deleteCopStaff'
    };

    var TABLE_CONFIG = {
        //数据请求地址
        url: ajaxUrl.getList,
        //数据渲染表
        elem: '#mainTaskTableList',
        tableFilter: 'listShipments-table',
        //搜索form表单
        searchFilter: 'listShipments-search-box',
        where: {
            order: 'desc',
            sort_field: 'created_at'
        },
        page: true,
        limit: 20,
        //列表字段
        cols: [[
            {
                field: 'cop_id',
                title: '警员编号',
                valign: 'middle',
                align: 'left'
            },
            {
                field: 'cop_name',
                valign: 'middle',
                title: '警员姓名',
                align: 'center',
            },
            {
                field: 'birthday',
                valign: 'middle',
                title: '出生日期',
            },
            {
                field: 'flag',
                valign: 'middle',
                title: '标志',
            },
            {
                field: 'cop_sex',
                valign: 'middle',
                title: '性别',
            },
            {
                field: 'manage_area',
                valign: 'middle',
                title: '任务区域',
            }
        ]
        ]
    };

    var $tableList = common_table(TABLE_CONFIG);

});

