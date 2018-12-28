package com.police.controller.sontaskrecordmanagement.firecontrolmanagement;

import com.alibaba.fastjson.JSON;
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

    @RequestMapping(value = "/getsontaskrecord/{sonTaskId}.html", method = RequestMethod.GET)
    public String getSonTask(@PathVariable("sonTaskId") String sonTaskId, Model model) {
        logger.info("获取任务获取sonTaskId={}的详情", sonTaskId);
        SonTaskPO sonTaskPO = sonTaskService.getSonTask(sonTaskId);
        TaskInfoPO taskInfoPO = mainTaskInfoService.getMainTaskInfo(sonTaskPO.getTaskId());
        FireControlRecord fireControlRecord = fireControlRecordService.getFireControlRecord(sonTaskId);
        model.addAttribute("sonTask", sonTaskPO);
        model.addAttribute("mainTask", taskInfoPO);
        model.addAttribute("fireControlRecord",fireControlRecord);
        //System.out.println("这是firecontrol的sontaskid："+fireControlRecord.getSonTaskId());
        return "pages/task/sontask/firerecord";
        //return "pages/record/sontaskrecord/getsontaskrecord";
    }
    @ResponseBody
    @RequestMapping(value = "/deletesontaskrecord", method = RequestMethod.POST)
    public String deleteSonTask(@RequestBody String payload) {
        logger.info("删除子任务，请求参数：{}", payload);
        String sonTaskId = JSON.parseObject(payload).getString("son_task_id");
        String taskId = JSON.parseObject(payload).getString("task_id");
        Integer resultColumn = fireControlRecordService.deleteFireControlRecord(sonTaskId);
        if (resultColumn != null) {
            /*TaskInfoPO taskInfoPO = new TaskInfoPO();
            taskInfoPO.setTaskId(taskId);
            taskInfoPO.setAllocateStatus(taskInfoPO.getAllocateStatus()-1);
            Integer setDeleteResult = mainTaskInfoService.updateMainTaskInfo(taskInfoPO);
            if (setDeleteResult != null) {
                return ResultBuilder.buildSuccess("删除子任务成功");
            }*/
            return ResultBuilder.buildSuccess("删除子任务记录成功                                           更新主任务同步失败");
        } else {
            return ResultBuilder.buildError("删除子任务记录失败");
        }
    }
}
