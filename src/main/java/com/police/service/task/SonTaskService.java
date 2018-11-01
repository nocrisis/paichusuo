package com.police.service.task;

import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.SonTaskDTO;
import com.police.pojo.entity.taskinfo.SonTaskPO;

public interface SonTaskService {
    Integer createSonTask (SonTaskPO sonTaskPO);

    Integer deleteSonTask (String taskId);

    Integer updateSonTask (SonTaskPO sonTaskPO);

    SonTaskPO getSonTask (SonTaskPO sonTaskPO);

    PageContentDTO listSonTask (SonTaskDTO pageableDTO);

    Integer countSonTask(SonTaskDTO SonTaskDTO);
}
