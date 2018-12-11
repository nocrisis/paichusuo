$('.form_date').datetimepicker({
    format: 'yyyy-mm-dd HH:ii:ss',
    showSecond: true, //显示秒
    stepHour: 1,//设置步长
    stepMinute: 5,
    stepSecond: 30,
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1
});

var ajaxUrl = {
    'allocateSonTask': '/taskmanagement/sontask/allocatesontask'
};

function ajaxSubmit(submit_data) {
    $.ajax({
        url: ajaxUrl.allocateSonTask,
        type: 'POST',
        data: JSON.stringify(submit_data),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            layer.close(loadingIndex);
            if (data.code != 200) {
                return layer.Notify.error(data.error_msg || '创建主任务失败!')
            }
            layer.Notify.success('分配子任务成功!');
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

function getSubmitData() {
    var submitData = $('#addTaskForm').serializeObject();
    submitData.task_area = mainTask.taskArea;
    submitData.task_category = mainTask.taskCategory;
    submitData.cop_name = $('#cop_id').find("option:selected").text();
    return submitData;
}

function beforeSubmit(e) {
    loadingIndex = layer.load();
    $.when({})
        .then(ajaxSubmit(e))
        .fail(function (error) {
            layer.hide(loadingIndex);
            console.debug(error);
        });

    return false;
}

$('#submitForm').click(function () {
    beforeSubmit(getSubmitData())
});