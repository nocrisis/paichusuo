package com.police.service.task.impl;

import com.police.common.enums.TaskFinishStatusEnum;
import com.police.mapper.taskinfo.SonTaskMapper;
import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.TaskInfoDTO;
import com.police.pojo.entity.taskinfo.TaskInfoPO;
import com.police.service.task.SonTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SonTaskServiceImpl implements SonTaskService {
    @Autowired
    private SonTaskMapper sonTaskMapper;

    @Override
    public Integer createSonTask(TaskInfoPO taskInfoPO) {
        taskInfoPO.setFinishStatus(TaskFinishStatusEnum.TODO.name());
        return  sonTaskMapper.insertMainTask(taskInfoPO);
    }

    @Override
    public Integer deleteSonTask(String taskId) {
        return  sonTaskMapper.deleteMainTask(taskId);
    }

    @Override
    public Integer updateSonTask(TaskInfoPO taskInfoPO) {
        return  sonTaskMapper.updateMainTask(taskInfoPO);
    }

    @Override
    public TaskInfoPO getSonTask(TaskInfoPO taskInfoPO) {
        return  sonTaskMapper.getMainTask(taskInfoPO);
    }

    @Override
    public PageContentDTO listSonTask(TaskInfoDTO pageableDTO) {
        Integer total =  sonTaskMapper.countMainTask(pageableDTO);
        if(total!=null){
            return PageContentDTO.emptyInstance();
        }
        List<TaskInfoPO> taskInfoPOList =  sonTaskMapper.listMainTask(pageableDTO);
        return  new PageContentDTO(total,taskInfoPOList);
    }

    @Override
    public Integer countMainTask(TaskInfoDTO taskInfoDTO) {
        return  sonTaskMapper.countMainTask(taskInfoDTO);
    }
}
