package com.police.service.sontaskrecord.impl;

import com.police.mapper.taskinfo.FireControlRecordMapper;
import com.police.mapper.taskinfo.SonTaskMapper;
import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.SonTaskDTO;
import com.police.pojo.entity.taskinfo.SonTaskPO;
import com.police.service.sontaskrecord.CompletionStatusService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CompletionStatusServiceImpl implements CompletionStatusService {
    @Autowired
    private SonTaskMapper sonTaskMapper;

    @Autowired
    private FireControlRecordMapper fireControlRecordMapper;

    @Override
    public Integer countFinishedTask(String copId){
        return sonTaskMapper.countFinishedTask(copId);
    }                                //根据警员id，返回已完成任务数量

    @Override
    public Integer countUnFinishedTask(String copId){
        return sonTaskMapper.countUnFinishedTask(copId);
    }                              //根据警员id，返回未完成任务数量

    @Override
    public Integer countAllFinishedTask(){
        return sonTaskMapper.countAllFinishedTask();
    }                                        //返回所有完成的任务数量

    @Override
    public Integer countAllUnFinishedTask(){
        return sonTaskMapper.countAllUnFinishedTask();
    }                                      //返回所有未完成的任务数量

    @Override
    public PageContentDTO listAllOverdueSonTask (SonTaskDTO pageableDTO){
        Integer total =  sonTaskMapper.countSonTask(pageableDTO);
        List< SonTaskPO > sonTaskPOList =sonTaskMapper.listAllOverdueSonTask(pageableDTO);
        return new PageContentDTO(total,sonTaskPOList);
    }           //返回所有超期未完成的子任务
}
