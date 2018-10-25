package com.police.mapper.taskinfo;

import com.police.pojo.dto.taskinfo.TaskInfoDTO;
import com.police.pojo.entity.taskinfo.TaskInfoPO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MainTaskInfoMapper {
    Integer insertMainTask(TaskInfoPO taskInfoPO);
    List<TaskInfoPO> listMainTask(TaskInfoDTO taskInfoDTO);
    TaskInfoPO getMainTask(TaskInfoPO taskInfoPO);
    Integer deleteMainTask(@Param("taskId") String taskId);
    Integer batchUpdateFinishStatus(@Param("taskIds") List<String> taskIds,@Param("finishStatus") String finishStatus);
    Integer updateMainTask(TaskInfoPO taskInfoPO);
    Integer countMainTask(TaskInfoDTO taskInfoDTO);

}
