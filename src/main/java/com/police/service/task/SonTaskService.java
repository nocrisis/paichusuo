package com.police.service.task;

import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.SonTaskDTO;
import com.police.pojo.entity.taskinfo.SonTaskPO;

public interface SonTaskService {
    Integer createSonTask (SonTaskPO sonTaskPO);

    Integer deleteSonTask (String sonTaskId);

    Integer updateSonTask (SonTaskPO sonTaskPO);

    SonTaskPO getSonTask (String sonTaskId);

    PageContentDTO listSonTask (SonTaskDTO pageableDTO);

    Integer countSonTask(SonTaskDTO SonTaskDTO);

    PageContentDTO listAllSonTask (SonTaskDTO pageableDTO);


}
