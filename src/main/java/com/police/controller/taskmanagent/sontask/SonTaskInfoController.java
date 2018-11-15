package com.police.controller.taskmanagent.sontask;

import com.alibaba.fastjson.JSON;
import com.police.common.util.FastJsonUtil;
import com.police.common.util.ResultBuilder;
import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.SonTaskDTO;
import com.police.pojo.entity.taskinfo.SonTaskPO;
import com.police.service.task.SonTaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("taskmanagent/sontask")
public class SonTaskInfoController {
    private static final Logger logger = LoggerFactory.getLogger(SonTaskInfoController.class);
    @Autowired
    private SonTaskService sonTaskService;

    @ResponseBody
    @RequestMapping(value = "/createsontask", method = RequestMethod.POST)
    public String createSonTask(@RequestBody String payload) {
        logger.info("获取子任务列表， 请求参数：{}", payload);
        SonTaskPO sonTask = FastJsonUtil.toBean(payload, SonTaskPO.class);
        Integer resultColumn = sonTaskService.createSonTask(sonTask);
        if (resultColumn != null) {
            return ResultBuilder.buildSuccess("创建子任务成功");
        } else {
            return ResultBuilder.buildError("创建子任务失败");
        }
    }

    @ResponseBody
    @RequestMapping(value = "/listsontask",method = RequestMethod.POST)
    public String listSonTask(@RequestBody String payload) {
        logger.info("获取子任务列表， 请求参数：{}", payload);
        SonTaskDTO listTaskQueryParam = FastJsonUtil.toBean(payload, SonTaskDTO.class);
        PageContentDTO taskList = sonTaskService.listSonTask(listTaskQueryParam);
        return ResultBuilder.buildSuccess(taskList);
    }


    @ResponseBody
    @RequestMapping(value = "/deletesontask", method = RequestMethod.POST)
    public String deleteSonTask(@RequestBody String payload){
        logger.info("删除子任务，请求参数：{}", payload);
        String taskId = JSON.parseObject(payload).getString("task_id");
        Integer resultColumn = sonTaskService.deleteSonTask(taskId);
        if (resultColumn != null) {
            return ResultBuilder.buildSuccess("删除子任务成功");
        } else {
            return ResultBuilder.buildError("删除子任务失败");
        }
    }



    @ResponseBody
    @RequestMapping(value = "/updatesontask", method = RequestMethod.POST)
    public String updateSonTask(@RequestBody String payload){
        logger.info("更新子任务入参；{}", payload);
        SonTaskPO sonTask = FastJsonUtil.toBean(payload, SonTaskPO.class);
        Integer resultColumn = sonTaskService.updateSonTask(sonTask);
        if (resultColumn != null) {
            return ResultBuilder.buildSuccess("更新子任务成功");
        } else {
            return ResultBuilder.buildError("更新子任务失败");
        }
    }

    @RequestMapping(value = "/createsontask.html", method = RequestMethod.GET)
    public String createBundle(Model model) {
        return "pages/task/sontask/create";
    }


    @ResponseBody
    @RequestMapping(value = "/getsontask/{sonTaskId}.html", method = RequestMethod.GET)
    public String getSonTask(@PathVariable("sonTaskId") String sonTaskId, Model model){
        SonTaskPO sonTaskPO = sonTaskService.getSonTask(sonTaskId);
        model.addAttribute("sonTask",sonTaskPO);
        return "pages/task/sontask/edit";
    }


}
