package com.police.mapper.taskinfo;

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
    Integer countSonTask(SonTaskDTO sonTaskDTO);
}
