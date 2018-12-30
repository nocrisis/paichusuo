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

    @RequestMapping(value = "/insert/{son_task_id}.html", method = RequestMethod.GET)
    public String allocateSonTask(@PathVariable("son_task_id") String sonTaskId, Model model) {                     //根据子任务id定位子任务
        logger.info("分配任务获取taskId={}的详情", sonTaskId);
        SonTaskPO taskInfoPO = sonTaskService.getSonTask(sonTaskId);
        model.addAttribute("sonTask", taskInfoPO);
        return "pages/task/record/create";
    }

    @ResponseBody
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String insertFireControlRecord(@RequestBody String payload) {                                        //添加子任务记录，数据由前端传入
        logger.info("添加任务记录， 请求参数：{}", payload);
        FireControlRecord sonTask = FastJsonUtil.toBean(payload, FireControlRecord.class);                        //json转成record对象
        Integer resultColumn = fireControlRecordService.insertFireControlRecord(sonTask);
        if (resultColumn != null) {
            SonTaskPO sonTaskPO = sonTaskService.getSonTaskByCopId(JSON.parseObject(payload).getString("son_task_id"));
            sonTaskPO.setFinishTime(JSON.parseObject(payload).getTimestamp("finishTime"));
            sonTaskPO.setFinishStatus("FINISHED");
            sonTaskService.updateSonTask(sonTaskPO);
                return ResultBuilder.buildSuccess("添加成功");
        } else {
            return ResultBuilder.buildError("添加失败");
        }
    }

    @RequestMapping(value = "/getsontaskrecord/{sonTaskId}.html", method = RequestMethod.GET)
    public String getSonTask(@PathVariable("sonTaskId") String sonTaskId, Model model) {                            //根据sontaskid查找子任务记录，放入model
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
    public String deleteSonTask(@RequestBody String payload) {                                                  //从payload中获取子任务id，删除任务记录
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
            return ResultBuilder.buildSuccess("删除子任务记录成功                                           下面是更新主任务同步失败");
        } else {
            return ResultBuilder.buildError("删除子任务记录失败");
        }
    }
}
