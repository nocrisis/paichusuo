package com.police.mapper.taskinfo;

import com.police.pojo.dto.sontaskrecord.FireControlRecordDTO;
import com.police.pojo.entity.sontaskrecord.FireControlRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface FireControlRecordMapper {
    Integer insertFireControlRecord(FireControlRecord fireControlRecord);
    FireControlRecord getFireControlRecord(@Param("sonTaskId") String  sonTaskId);
    Integer deleteFireControlRecord(@Param("sonTaskId") String sonTaskId);
    Integer countFireControlRecord(FireControlRecordDTO fireControlRecordDTO);
}
