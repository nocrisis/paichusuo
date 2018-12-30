package com.police.service.sontaskrecord;

import com.police.pojo.entity.sontaskrecord.FireControlRecord;

public interface CompletionStatusService {
    Integer countFinishedtask(String copId);                                //根据警员id，返回已完成任务数量
    Integer countunFinishedTask(String copId);                              //根据警员id，返回未完成任务数量
    Integer countAllFinishedTask(String copId);
}
