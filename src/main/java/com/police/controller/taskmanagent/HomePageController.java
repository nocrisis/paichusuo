package com.police.controller.taskmanagent;

import com.alibaba.fastjson.JSON;
import com.police.common.util.FastJsonUtil;
import com.police.common.util.ResultBuilder;
import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.SonTaskDTO;
import com.police.pojo.dto.taskinfo.TaskInfoDTO;
import com.police.pojo.entity.taskinfo.TaskInfoPO;
import com.police.service.task.MainTaskInfoService;
import com.police.service.task.SonTaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("homepage")
public class HomePageController {
    private static final Logger logger = LoggerFactory.getLogger(HomePageController.class);
//    @Autowired
//    private MainTaskInfoService mainTaskInfoService;
//
//    @Autowired
//    private SonTaskService sonTaskService;
//
//    @ResponseBody
//    @RequestMapping(value = "/createmaintask", method = RequestMethod.POST)
//    public String createMainTaskInfo(@RequestBody String payload) {
//        logger.info("获取主任务列表， 请求参数：{}", payload);
//        TaskInfoPO taskInfo = FastJsonUtil.toBean(payload, TaskInfoPO.class);
//        Integer resultColumn = mainTaskInfoService.createMainTaskInfo(taskInfo);
//        if (resultColumn != null) {
//            return ResultBuilder.buildSuccess("创建主任务成功");
//        } else {
//            return ResultBuilder.buildError("创建主任务失败");
//        }
//    }
//
//    @ResponseBody
//    @RequestMapping(value = "/listmaintask",method = RequestMethod.POST)
//    public String listMainTaskInfo(@RequestBody String payload) {
//        logger.info("获取主任务列表， 请求参数：{}", payload);
//        TaskInfoDTO listTaskQueryParam = FastJsonUtil.toBean(payload, TaskInfoDTO.class);
//        PageContentDTO taskList = mainTaskInfoService.listMainTaskInfo(listTaskQueryParam);
//        return ResultBuilder.buildSuccess(taskList);
//    }

    @RequestMapping(value = "/load.html", method = RequestMethod.GET)
    public String loadHomePage() {
        return "pages/index";
    }


//
//    @ResponseBody
//    @RequestMapping(value = "/deletemaintask", method = RequestMethod.POST)
//    public String deleteMainTask(@RequestBody String payload){
//        logger.info("删除主任务，请求参数：{}", payload);
//        String taskId = JSON.parseObject(payload).getString("task_id");
//        Integer resultColumn = mainTaskInfoService.deleteMainTaskInfo(taskId);
//        if (resultColumn != null) {
//            return ResultBuilder.buildSuccess("删除主任务成功");
//        } else {
//            return ResultBuilder.buildError("删除主任务失败");
//        }
//    }
//
//    @ResponseBody
//    @RequestMapping(value = "/updatemaintask", method = RequestMethod.POST)
//    public String updateMainTask(@RequestBody String payload){
//        logger.info("更新主任务入参；{}", payload);
//        TaskInfoPO taskInfo = FastJsonUtil.toBean(payload, TaskInfoPO.class);
//        Integer resultColumn = mainTaskInfoService.updateMainTaskInfo(taskInfo);
//        if (resultColumn != null) {
//            return ResultBuilder.buildSuccess("更新主任务成功");
//        } else {
//            return ResultBuilder.buildError("更新主任务失败");
//        }
//    }
//
//    @RequestMapping(value = "createmaintask.html", method = RequestMethod.GET)
//    public String createBundle(Model model) {
//        return "pages/task/maintask/create";
//    }
//
//
//
//    @ResponseBody
//    @RequestMapping(value = "/edit/{taskId}.html", method = RequestMethod.GET)
//    public String getMainTask(@PathVariable("taskId") String taskId, Model model){
//        TaskInfoPO taskInfoPO = mainTaskInfoService.getMainTaskInfo(taskId);
//        logger.info("获取taskId={}的详情", taskId);
//        SonTaskDTO listTaskQueryParam =new SonTaskDTO();
//        listTaskQueryParam.setTaskId(taskId);
//        PageContentDTO sonTaskList = sonTaskService.listSonTask(listTaskQueryParam);
//        model.addAttribute("mainTask",taskInfoPO);
//        return "pages/task/maintask/edit";
//    }



}
