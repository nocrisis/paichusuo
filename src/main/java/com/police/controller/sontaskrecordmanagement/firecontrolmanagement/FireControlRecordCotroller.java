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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
    @RequestMapping(value = "/insert/{son_task_id}.html", method = RequestMethod.GET)
    public String allocateSonTask(@PathVariable("son_task_id") String sonTaskId, Model model) {
        logger.info("分配任务获取taskId={}的详情", sonTaskId);
        SonTaskPO taskInfoPO = sonTaskService.getSonTask(sonTaskId);
        model.addAttribute("sonTask", taskInfoPO);
        return "pages/task/record/create";
    }

    @ResponseBody
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String insertFireControlRecord(@RequestBody String payload) {
        logger.info("添加任务记录， 请求参数：{}", payload);
        FireControlRecord sonTask = FastJsonUtil.toBean(payload, FireControlRecord.class);
        Integer resultColumn = fireControlRecordService.insertFireControlRecord(sonTask);
        if (resultColumn != null) {
                return ResultBuilder.buildSuccess("添加成功");
        } else {
            return ResultBuilder.buildError("添加失败");
        }
    }
}
