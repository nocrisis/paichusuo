package com.police.service.task;

import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.TaskInfoDTO;
import com.police.pojo.entity.taskinfo.TaskInfoPO;

public interface MainTaskInfoService {
    Integer createMainTaskInfo(TaskInfoPO TaskInfoPO);

    Integer deleteMainTaskInfo(String taskId);

    Integer updateMainTaskInfo(TaskInfoPO TaskInfoPO);

    TaskInfoPO getMainTaskInfo(TaskInfoPO TaskInfoPO);

    PageContentDTO listMainTaskInfo(TaskInfoDTO pageableDTO);

    Integer countMainTask(TaskInfoDTO MainTaskDTO);
}
