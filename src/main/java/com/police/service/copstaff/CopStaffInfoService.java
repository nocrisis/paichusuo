package com.police.service.copstaff;

import com.police.pojo.dto.copstaff.CopInfoDTO;
import com.police.pojo.entity.copstaff.CopInfoPO;
import com.police.pojo.dto.PageContentDTO;



public interface CopStaffInfoService {
    Integer createCopStaffInfo(CopInfoPO copInfoPO);

    Integer deleteCopStaffInfo(String copId);

    Integer updateCopStaffInfo(CopInfoPO copInfoPO);

    CopInfoPO getCopStaffInfo(String copInfoPO);

    PageContentDTO listCopStaffInfo(CopInfoDTO pageableDTO);

    Integer countCopStaff(CopInfoDTO copInfoDTO);
}
