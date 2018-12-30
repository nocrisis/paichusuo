package com.police.service.task.impl;

import com.police.common.enums.TaskFinishStatusEnum;
import com.police.mapper.taskinfo.SonTaskMapper;
import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.SonTaskDTO;
import com.police.pojo.entity.taskinfo.SonTaskPO;
import com.police.service.task.SonTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SonTaskServiceImpl implements SonTaskService {
    @Autowired
    private SonTaskMapper sonTaskMapper;

    @Override
    public Integer createSonTask(SonTaskPO sonTaskPO) {
        sonTaskPO.setFinishStatus(TaskFinishStatusEnum.TODO.name());
        return  sonTaskMapper.insertSonTask(sonTaskPO);
    }

    @Override
    public Integer deleteSonTask(String taskId) {
        return  sonTaskMapper.deleteSonTask(taskId);
    }

    @Override
    public Integer updateSonTask(SonTaskPO sonTaskPO) {
        return  sonTaskMapper.updateSonTask(sonTaskPO);
    }

    @Override
    public Integer updateSonTaskFinish(SonTaskPO sonTaskPO) {
        return  sonTaskMapper.updateSonTaskFinish(sonTaskPO);
    }

    @Override
    public SonTaskPO getSonTask(String sonTaskId) {
        return  sonTaskMapper.getSonTask(sonTaskId);
    }

    @Override
    public PageContentDTO listSonTask(SonTaskDTO pageableDTO) {
        Integer total =  sonTaskMapper.countSonTask(pageableDTO);
        if(total==null){
            return PageContentDTO.emptyInstance();
        }
        List<SonTaskPO> sonTaskPOList =  sonTaskMapper.listSonTask(pageableDTO);
        return  new PageContentDTO(total,sonTaskPOList);
    }

    @Override
    public PageContentDTO listAllSonTask(SonTaskDTO pageableDTO) {
        Integer total =  sonTaskMapper.countSonTask(pageableDTO);
        if(total==null){
            return PageContentDTO.emptyInstance();
        }
        List<SonTaskPO> sonTaskPOList =  sonTaskMapper.listAllSonTask(pageableDTO);
        return  new PageContentDTO(total,sonTaskPOList);
    }
    @Override
    public SonTaskPO getSonTaskByCopId(String copId){
        return  sonTaskMapper.getSonTaskByCopId(copId);
    }

    @Override
    public Integer countSonTask(SonTaskDTO SonTaskDTO) {
        return  sonTaskMapper.countSonTask(SonTaskDTO);
    }
}
