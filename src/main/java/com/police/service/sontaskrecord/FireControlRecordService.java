package com.police.service.sontaskrecord;

import com.police.pojo.dto.sontaskrecord.FireControlRecordDTO;
import com.police.pojo.entity.sontaskrecord.FireControlRecord;

public interface FireControlRecordService {
    Integer insertFireControlRecord(FireControlRecord fireControlRecord);
    FireControlRecord getFireControlRecord( String  sonTaskId);
    Integer deleteFireControlRecord( String sonTaskId);
    Integer countFireControlRecord(FireControlRecordDTO fireControlRecordDTO);
}
