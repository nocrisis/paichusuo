package com.police.mapper.taskinfo;

import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.taskinfo.SonTaskDTO;
import com.police.pojo.entity.taskinfo.SonTaskPO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SonTaskMapper {
    Integer insertSonTask(SonTaskPO sonTaskPO);
    List<SonTaskPO> listSonTask(SonTaskDTO sonTaskDTO);
    List<SonTaskPO> listAllSonTask(SonTaskDTO sonTaskDTO);
    SonTaskPO getSonTask(@Param("sonTaskId") String  sonTaskId);
    Integer deleteSonTask(@Param("sonTaskId") String sonTaskId);
    Integer batchUpdateFinishStatus(@Param("sonTaskIds") List<String> sonTaskId,@Param("finishStatus") String finishStatus);
    Integer updateSonTask(SonTaskPO sonTaskPO);
    Integer updateSonTaskFinish(SonTaskPO sonTaskPO);
    Integer countSonTask(SonTaskDTO sonTaskDTO);
    SonTaskPO getSonTaskByCopId(@Param("copId") String  copId);


    Integer countFinishedTask(@Param("sonTaskId") String copId);                                //根据警员id，返回已完成任务数量
    Integer countUnFinishedTask(@Param("sonTaskId") String copId);                              //根据警员id，返回未完成任务数量
    Integer countAllFinishedTask();                                         //返回所有完成的任务数量
    Integer countAllUnFinishedTask();                                       //返回所有未完成的任务数量
    List<SonTaskPO> listAllOverdueSonTask (SonTaskDTO sonTaskDTO);           //返回所有超期未完成的子任务
}
