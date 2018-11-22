$(function() {
    $('.form_date').datetimepicker({
        language:  'zh-CN',
        todayBtn:  1,
        minView: "month", //选择日期后，不会再跳转去选择时分秒
        format: "Y-m-d", //选择日期后，文本框显示的日期格式
        timepicker:false,
        autoclose: true
    });
    $('.form_time').datetimepicker({
        language:  'zh-CN',
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });
});
$(function () {
    var ajaxUrl = {
        'editMainTask': '/taskmanagent/maintask/updatemaintask'
    };

    var submitSet = {
        getAjaxSumitData: function () {
            var submit_data = $('#editTaskForm').serializeObject();
            console.log(submit_data);
            return submit_data;
        },
        ajaxSubmit: function (submit_data) {
            $.ajax({
                url: ajaxUrl.editMainTask,
                type: 'POST',
                data: JSON.stringify(submit_data),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data) {
                    layer.close(loadingIndex);
                    if (data.code != 200) {
                        return layer.Notify.error(data.errorMsg || '编辑主任务失败!')
                    }
                    layer.Notify.success('编辑主任务成功!');

                    setTimeout(function () {
                        window.location.href = "/homepage/load.html";
                    }, 3000);


                },
                error: function (error) {
                    layer.Notify.error('暂时无法连接服务器,请稍候再试!');
                    layer.close(loadingIndex);
                }
            });
        }
    }



    $('#updateSubmit').click(function () {
        loadingIndex = layer.load();

        $.when({})
            .then(submitSet.getAjaxSumitData)
            .then(submitSet.ajaxSubmit)
            .fail(function (error) {
                layer.hide(loadingIndex);
                console.debug(error);
            });

        return false;
    })
});