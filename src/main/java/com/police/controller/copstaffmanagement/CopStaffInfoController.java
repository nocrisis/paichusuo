package com.police.controller.copstaffmanagement;

import com.alibaba.fastjson.JSON;
import com.police.common.util.FastJsonUtil;
import com.police.common.util.ResultBuilder;
import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.copstaff.CopInfoDTO;
import com.police.pojo.entity.copstaff.CopInfoPO;
import com.police.pojo.entity.taskinfo.SonTaskPO;
import com.police.pojo.entity.taskinfo.TaskInfoPO;
import com.police.service.copstaff.CopStaffInfoService;
import com.police.service.task.MainTaskInfoService;
import com.police.service.task.SonTaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("CopStaffManagement/info")
public class CopStaffInfoController {
    private static final Logger logger = LoggerFactory.getLogger(CopStaffInfoController.class);
    @Autowired
    private CopStaffInfoService copStaffInfoService;

    @Autowired
    private SonTaskService sonTaskService;

    @Autowired
    private MainTaskInfoService mainTaskInfoService;

    @ResponseBody
    @RequestMapping(value = "/createcopstaff", method = RequestMethod.POST)
    public String createCopStaff(@RequestBody String payload) {                                     //新建警员
        logger.info("获取警员列表，2 请求参数：{}", payload);
        CopInfoPO copInfoPO = FastJsonUtil.toBean(payload, CopInfoPO.class);
        Integer resultColumn = copStaffInfoService.createCopStaffInfo(copInfoPO);                   //创建
        if (resultColumn != null) {
            return ResultBuilder.buildSuccess("创建成功");
        } else {
            return ResultBuilder.buildError("创建失败");
        }
    }

    @ResponseBody
    @RequestMapping(value = "/listcop",method = RequestMethod.POST)
    public String listCopStaff(@RequestBody String payload) {                                   //获取警员列表

        logger.info("获取警员列表， 请求参数：{}", payload);
        CopInfoDTO listTaskQueryParam = FastJsonUtil.toBean(payload, CopInfoDTO.class);
        //System.out.println("listTaskQueryParam="+listTaskQueryParam.getCopId());
        PageContentDTO taskList = copStaffInfoService.listCopStaffInfo(listTaskQueryParam);
        return ResultBuilder.buildSuccess(taskList);
    }

    @RequestMapping(value = "/coplist.html", method = RequestMethod.GET)                                              //匹配，跳转警员信息页面
    public String listCopStaffPage(Model model) {
        return "pages/copinfo/coplist";
    }

    @ResponseBody
    @RequestMapping(value = "/deletecopstaff", method = RequestMethod.POST)                                         //删除警员
    public String deleteCopStaff(@RequestBody String payload){

        logger.info("删除警员，请求参数：{}", payload);
        String copId = JSON.parseObject(payload).getString("cop_id");
        Integer resultColumn = copStaffInfoService.deleteCopStaffInfo(copId);
        if (resultColumn != null) {
            return ResultBuilder.buildSuccess("删除成功");
        } else {
            return ResultBuilder.buildError("删除失败");
        }
    }

    @ResponseBody
    @RequestMapping(value = "/updatecopstaff", method = RequestMethod.POST)                                         //更新警员信息
    public String updateCopStaff(@RequestBody String payload){
        logger.info("更新入参；{}", payload);
        CopInfoPO copInfoPO = FastJsonUtil.toBean(payload, CopInfoPO.class);
        Integer resultColumn = copStaffInfoService.updateCopStaffInfo(copInfoPO);
        if (resultColumn != null) {
            return ResultBuilder.buildSuccess("更新成功");
        } else {
            return ResultBuilder.buildError("更新失败");
        }
    }

    /*@RequestMapping(value = "createmaintask.html", method = RequestMethod.GET)
    public String createBundle(Model model) {
        return "pages/task/sontask/create";
    }*/


    @RequestMapping(value = "/edit/{cop_id}.html", method = RequestMethod.GET)
    public String getMainTask(@PathVariable("cop_id") String copId, Model model){                                   //根据警员id查找警员名下接受的任务
        logger.info("获取copId={}的详情", copId);
        SonTaskPO sonTaskPO = sonTaskService.getSonTaskByCopId(copId);
        CopInfoPO copInfoPO = copStaffInfoService.getCopStaffInfo(copId);
        TaskInfoPO taskInfoPO = mainTaskInfoService.getMainTaskInfo(sonTaskPO.getTaskId());
        model.addAttribute("sonTask", sonTaskPO);
        model.addAttribute("mainTask", taskInfoPO);
        model.addAttribute("copstaff",copInfoPO);
        return "pages/task/sontask/edit";
    }

}

