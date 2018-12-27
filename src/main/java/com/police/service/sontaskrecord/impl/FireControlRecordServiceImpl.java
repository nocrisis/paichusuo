package com.police.service.sontaskrecord.impl;

import com.police.common.enums.TaskFinishStatusEnum;
import com.police.mapper.taskinfo.FireControlRecordMapper;
import com.police.mapper.taskinfo.SonTaskMapper;
import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.sontaskrecord.FireControlRecordDTO;
import com.police.pojo.dto.taskinfo.SonTaskDTO;
import com.police.pojo.entity.sontaskrecord.FireControlRecord;
import com.police.pojo.entity.taskinfo.SonTaskPO;
import com.police.service.sontaskrecord.FireControlRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FireControlRecordServiceImpl implements FireControlRecordService {
    @Autowired
    private SonTaskMapper sonTaskMapper;

    @Autowired
    private FireControlRecordMapper fireControlRecordMapper;

    @Override
    public Integer insertFireControlRecord(FireControlRecord fireControlRecord) {
        //fireControlRecord.setFinishStatus(TaskFinishStatusEnum.TODO.name());
        return  fireControlRecordMapper.insertFireControlRecord(fireControlRecord);
    }

    @Override
    public Integer deleteFireControlRecord(String sontaskId) {
        return  fireControlRecordMapper.deleteFireControlRecord(sontaskId);
    }

    @Override
    public FireControlRecord getFireControlRecord(String sonTaskId) {
        return  fireControlRecordMapper.getFireControlRecord(sonTaskId);
    }

    @Override
    public Integer countFireControlRecord(FireControlRecordDTO fireControlRecordDTO) {
        return  fireControlRecordMapper.countFireControlRecord(fireControlRecordDTO);
    }
}
