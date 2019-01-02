package com.police.controller.sontaskrecordmanagement.firecontrolmanagement;

import com.police.common.util.FastJsonUtil;
import com.police.common.util.ResultBuilder;
import com.police.controller.taskmanagent.sontask.SonTaskInfoController;
import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.SonTaskDTO;
import com.police.service.sontaskrecord.CompletionStatusService;
import com.police.service.sontaskrecord.FireControlRecordService;
import com.police.service.task.MainTaskInfoService;
import com.police.service.task.SonTaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("Completion")
public class CompletionStatusController {
    private static final Logger logger = LoggerFactory.getLogger(SonTaskInfoController.class);
    @Autowired
    private SonTaskService sonTaskService;

    @Autowired
    private MainTaskInfoService mainTaskInfoService;

    @Autowired
    private FireControlRecordService fireControlRecordService;

    @Autowired
    private CompletionStatusService completionStatusService;

    @RequestMapping(value = "/Status/{copId}.html", method = RequestMethod.POST)
    public String countTask(@PathVariable("copId") String copId, Model model){
        logger.info("获取sonTaskId={}的详情", copId);
        int n = completionStatusService.countFinishedTask(copId);
        int m = completionStatusService.countUnFinishedTask(copId);
        model.addAttribute("FinishedTask", n);
        model.addAttribute("UnFinishedTask", m);
        return "pages/completion/status";
    }

    @RequestMapping(value = "/Status.html", method = RequestMethod.POST)
    public String countTask(Model model){
        logger.info("获取sonTaskId={}的详情");
        int n = completionStatusService.countAllFinishedTask();
        int m = completionStatusService.countAllUnFinishedTask();
        model.addAttribute("AllFinishedTask", n);
        model.addAttribute("AllUnFinishedTask", m);
        return "pages/completion/status";
    }
    @ResponseBody
    @RequestMapping(value = "/listalloverduetask", method = RequestMethod.POST)
    public String listAllSonTask(@RequestBody String payload) {                                                       //获取所有子任务，放入list
        logger.info("获取所有超期未完成子任务列表， 请求参数：{}", payload);
        SonTaskDTO listTaskQueryParam = FastJsonUtil.toBean(payload, SonTaskDTO.class);
        PageContentDTO taskList = completionStatusService.listAllOverdueSonTask(listTaskQueryParam);
        return ResultBuilder.buildSuccess(taskList);
    }

}
