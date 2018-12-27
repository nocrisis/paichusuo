package com.police.controller.sontaskrecordmanagement.firecontrolmanagement;

import com.police.common.util.FastJsonUtil;
import com.police.common.util.ResultBuilder;
import com.police.controller.taskmanagent.sontask.SonTaskInfoController;
import com.police.pojo.entity.sontaskrecord.FireControlRecord;
import com.police.pojo.entity.taskinfo.SonTaskPO;
import com.police.pojo.entity.taskinfo.TaskInfoPO;
import com.police.service.sontaskrecord.FireControlRecordService;
import com.police.service.task.MainTaskInfoService;
import com.police.service.task.SonTaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("sontaskrecordmanagement/firecontrol")
public class FireControlRecordCotroller {
    private static final Logger logger = LoggerFactory.getLogger(SonTaskInfoController.class);
    @Autowired
    private SonTaskService sonTaskService;

    @Autowired
    private MainTaskInfoService mainTaskInfoService;

    @Autowired
    private FireControlRecordService fireControlRecordService;

    @ResponseBody
    @RequestMapping(value = "/allocatesontask", method = RequestMethod.POST)
    @Transactional
    public String insertFireControlRecord(@RequestBody String payload) {
        logger.info("添加任务记录， 请求参数：{}", payload);
        FireControlRecord sonTask = FastJsonUtil.toBean(payload, FireControlRecord.class);
        Integer resultColumn = fireControlRecordService.insertFireControlRecord(sonTask);
        if (resultColumn != null) {
            /*TaskInfoPO taskInfoPO = new TaskInfoPO();
            taskInfoPO.setTaskId(sonTask.getTaskId());
            taskInfoPO.setAllocateStatus(taskInfoPO.getAllocateStatus()+1);
            Integer setAllocateResult = mainTaskInfoService.updateMainTaskInfo(taskInfoPO);
            if (setAllocateResult != null) {*/
                return ResultBuilder.buildSuccess("添加成功");
           // }
            //return ResultBuilder.buildError("修改主任务分配状态失败");
        } else {
            return ResultBuilder.buildError("添加失败");
        }
    }
}
