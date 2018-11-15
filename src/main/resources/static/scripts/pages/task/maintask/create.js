$(function() {
    $('.form_datetime').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $('.form_date').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('.form_time').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });
});
var ajaxUrl={
    'createMaintask':'/taskmanagent/maintask/createmaintask'
}
function ajaxSubmit(submit_data) {
    $.ajax({
        url: ajaxUrl.createMaintask,
        type: 'POST',
        data: JSON.stringify(submit_data),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            layer.close(loadingIndex);
            if (data.code != 200) {
                return layer.Notify.error(data.error_msg || '创建主任务失败!')
            }
            layer.Notify.success('创建主任务成功!');
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
function beforeSubmit() {
    loadingIndex = layer.load();
    $.when({})
        .then(ajaxSubmit($('#addTaskForm').serializeObject()))
        .fail(function (error) {
            layer.hide(loadingIndex);
            console.debug(error);
        });

    return false;
}
$('#submitForm').click(function(e){
    beforeSubmit()
});