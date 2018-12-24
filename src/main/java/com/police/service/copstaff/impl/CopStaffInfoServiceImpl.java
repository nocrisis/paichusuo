package com.police.service.copstaff.impl;

import com.police.common.enums.TaskFinishStatusEnum;
import com.police.mapper.taskinfo.CopStaffInfoMapper;
import com.police.pojo.dto.PageContentDTO;
import com.police.pojo.dto.copstaff.CopInfoDTO;
import com.police.pojo.entity.copstaff.CopInfoPO;
import com.police.service.copstaff.CopStaffInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CopStaffInfoServiceImpl implements CopStaffInfoService {
    @Autowired
    private CopStaffInfoMapper copStaffInfoMapper;
    @Override
    public Integer createCopStaffInfo(CopInfoPO copInfoPO) {
        copInfoPO.setFinishStatus(TaskFinishStatusEnum.TODO.name());
        return copStaffInfoMapper.createCopStaffInfo(copInfoPO);
    }
    @Override
    public Integer deleteCopStaffInfo(String copId) {
        return copStaffInfoMapper.deleteCopStaffInfo(copId);
    }

    @Override
    public Integer updateCopStaffInfo(CopInfoPO copInfoPO) {
        return copStaffInfoMapper.updateCopStaffInfo(copInfoPO);
    }

    @Override
    public CopInfoPO getCopStaffInfo(String copInfoPO) {
        return copStaffInfoMapper.getCopStaffInfo(copInfoPO);
    }

    @Override
    public PageContentDTO listCopStaffInfo(CopInfoDTO pageableDTO) {
        Integer total = copStaffInfoMapper.countCopStaffInfo(pageableDTO);
        System.out.println("total="+total);
        if(total==null){
            return PageContentDTO.emptyInstance();
        }
        List<CopInfoPO> taskInfoPOList = copStaffInfoMapper.listCopStaffInfo(pageableDTO);

        return  new PageContentDTO(total,taskInfoPOList);
    }

    @Override
    public Integer countCopStaff(CopInfoDTO copInfoDTO) {
        return copStaffInfoMapper.countCopStaffInfo(copInfoDTO);
    }
}
