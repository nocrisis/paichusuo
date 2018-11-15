package com.police.service.task.impl;

import com.police.common.enums.TaskFinishStatusEnum;
import com.police.mapper.taskinfo.MainTaskInfoMapper;
import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.TaskInfoDTO;
import com.police.pojo.entity.taskinfo.TaskInfoPO;
import com.police.service.task.MainTaskInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainTaskInfoServiceImpl implements MainTaskInfoService {
    @Autowired
    private MainTaskInfoMapper mainTaskInfoMapper;

    @Override
    public Integer createMainTaskInfo(TaskInfoPO taskInfoPO) {
        taskInfoPO.setFinishStatus(TaskFinishStatusEnum.TODO.name());
        return mainTaskInfoMapper.insertMainTask(taskInfoPO);
    }

    @Override
    public Integer deleteMainTaskInfo(String taskId) {
        return mainTaskInfoMapper.deleteMainTask(taskId);
    }

    @Override
    public Integer updateMainTaskInfo(TaskInfoPO taskInfoPO) {
        return mainTaskInfoMapper.updateMainTask(taskInfoPO);
    }

    @Override
    public TaskInfoPO getMainTaskInfo(String taskId) {
        return mainTaskInfoMapper.getMainTask(taskId);
    }

    @Override
    public PageContentDTO listMainTaskInfo(TaskInfoDTO pageableDTO) {
        Integer total = mainTaskInfoMapper.countMainTask(pageableDTO);
        if(total==null){
            return PageContentDTO.emptyInstance();
        }
        List<TaskInfoPO> taskInfoPOList = mainTaskInfoMapper.listMainTask(pageableDTO);
        return  new PageContentDTO(total,taskInfoPOList);
    }

    @Override
    public Integer countMainTask(TaskInfoDTO taskInfoDTO) {
        return mainTaskInfoMapper.countMainTask(taskInfoDTO);
    }
}
