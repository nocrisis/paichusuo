package com.police.controller.taskmanagent.maintask;

import com.alibaba.fastjson.JSON;
import com.police.common.util.FastJsonUtil;
import com.police.common.util.ResultBuilder;
import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.TaskInfoDTO;
import com.police.pojo.entity.taskinfo.TaskInfoPO;
import com.police.service.task.MainTaskInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("taskmanagent/maintask")
public class MainTaskInfoController {
    private static final Logger logger = LoggerFactory.getLogger(MainTaskInfoController.class);
    @Autowired
    private MainTaskInfoService mainTaskInfoService;

    @ResponseBody
    @RequestMapping(value = "/createmaintask", method = RequestMethod.POST)
    public String createMainTaskInfo(@RequestBody String payload) {
        logger.info("获取主任务列表， 请求参数：{}", payload);
        TaskInfoPO taskInfo = FastJsonUtil.toBean(payload, TaskInfoPO.class);
        Integer resultColumn = mainTaskInfoService.createMainTaskInfo(taskInfo);
        if (resultColumn != null) {
            return ResultBuilder.buildSuccess("创建主任务成功");
        } else {
            return ResultBuilder.buildError("创建主任务失败");
        }
    }

    @ResponseBody
    @RequestMapping(value = "/listmaintask",method = RequestMethod.POST)
    public String listMainTaskInfo(@RequestBody String payload) {
        logger.info("获取购物车列表， 请求参数：{}", payload);
        TaskInfoDTO listTaskQueryParam = FastJsonUtil.toBean(payload, TaskInfoDTO.class);
        PageContentDTO taskList = mainTaskInfoService.listMainTaskInfo(listTaskQueryParam);
        return ResultBuilder.buildSuccess(taskList);
    }




    @ResponseBody
    @RequestMapping(value = "/deletemaintask", method = RequestMethod.POST)
    public String deleteMainTask(@RequestBody String payload){
        logger.info("删除主任务，请求参数：{}", payload);
        String taskId = JSON.parseObject(payload).getString("task_id");
        Integer resultColumn = mainTaskInfoService.deleteMainTaskInfo(taskId);
        if (resultColumn != null) {
            return ResultBuilder.buildSuccess("删除主任务成功");
        } else {
            return ResultBuilder.buildError("删除主任务失败");
        }
    }

    @ResponseBody
    @RequestMapping(value = "/updatemaintask", method = RequestMethod.POST)
    public String updateMainTask(@RequestBody String payload){
        logger.info("更新主任务入参；{}", payload);
        TaskInfoPO taskInfo = FastJsonUtil.toBean(payload, TaskInfoPO.class);
        Integer resultColumn = mainTaskInfoService.updateMainTaskInfo(taskInfo);
        if (resultColumn != null) {
            return ResultBuilder.buildSuccess("更新主任务成功");
        } else {
            return ResultBuilder.buildError("更新主任务失败");
        }
    }

//    @RequestMapping(value = "/lottery/edit/{promotionUid}.html", method = RequestMethod.GET)
//    public String updateSelectionLottery(@PathVariable("promotionUid") String promotionUid, Model model) {
//
//
//        model.addAttribute("lotteryPromotion", JSONObject.parseObject(FastJsonUtils.toJSONString(lotteryPromotion)));
//        model.addAttribute("shopInfo", shopInfo);
//        return "selections/lottery/edit";
//    }
    @ResponseBody
    @RequestMapping(value = "/getmaintask", method = RequestMethod.GET)
    public String getMainTask(@RequestBody String payload){
        logger.info("获取主任务，请求参数：{}", payload);
        TaskInfoPO taskInfoQueryParam = FastJsonUtil.toBean(payload, TaskInfoPO.class);
        TaskInfoPO taskInfoPO;
        taskInfoPO = mainTaskInfoService.getMainTaskInfo(taskInfoQueryParam);
        if(taskInfoPO!=null){
            return ResultBuilder.buildSuccess(taskInfoPO);
        }
        else {
            return ResultBuilder.buildError("获取该条主任务失败");
        }
    }


}
