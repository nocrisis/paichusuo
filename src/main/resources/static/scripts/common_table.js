/**
 * Created by andy on 2017/12/4.
 */

function common_table(config) {
    var $searchBox = $(config.SEARCH_FORM);
    var $table = $(config.DATA_TABLE);
    var table_config = {
        url: config.DATA_URL,
        method: 'post',
        dataType: 'json',
        cache: false,
        clickToSelect: true,
        queryParams: config.queryParams || function (params) {
            var temp = {};
            if ($searchBox.length > 0) {
                temp = $searchBox.serializeObject();
            }

            if (params.sort && params.order) {
                temp.sort_key = params.sort;
                temp.sort_order = params.order;
            }
            temp.page_size = params.limit;
            temp.page_no = (params.offset / params.limit) + 1;

            return temp;
        },
        columns: config.COLUMNS || [],
        sortStable: true,
        maintainSelected: !!config.maintainSelected,
        silentSort: false,
        sortOrder: config.SORT_ORDER || "desc",
        sortName: config.ORDER || 'created_at',
        contentType: 'application/json',
        pagination: true,
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        pageNumber: 1,
        pageSize: 20,
        sidePagination: "server",
        responseHandler: function (res) {
            if (res.code != 200) {
                return {
                    "total": 0,
                    "rows": []
                }
            }
            return {
                "total": res.data.total,
                "rows": res.data.content || []
            }
        }
    };

    if (config.buttonCtrl && config.buttonCtrlOptions) {
        table_config.buttonCtrl = config.buttonCtrl;
        table_config.buttonCtrlOptions = config.buttonCtrlOptions;
    }
    if (config.responseHandler) {
        table_config.responseHandler = config.responseHandler;
    }

    if (config.pageSize) {
        table_config.pageSize = config.pageSize;
    }
    if(config.formatNoMatches){
        table_config.formatNoMatches = config.formatNoMatches;
    }

    $table.bootstrapTable(table_config);
    //搜索项事件监听
    $searchBox
    //查询按钮
        .on('submit', function () {
            $searchBox.children('input').trigger('blur');
            $table.bootstrapTable('refreshOptions', {pageNumber: 1});
            return false;
        });
}
