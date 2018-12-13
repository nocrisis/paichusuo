package com.police.pojo.dto.copstaff;

import com.alibaba.fastjson.annotation.JSONField;
import com.police.common.util.FastJsonUtil;
import com.police.pojo.dto.BasePageableDTO;

import java.util.Date;

public class CopInfoDTO extends BasePageableDTO {
    @JSONField(name = "cop_id")
    String copId;

    @JSONField(name = "password")
    String password;

    @JSONField(name = "birthday")
    Date birthday;

    @JSONField(name = "cop_sex")
    String copSex;

    @JSONField(name = "cop_name")
    String copName;

    @JSONField(name = "flag")
    int flag;

    @JSONField(name = "manage_area")
    String manageArea;

    @JSONField(name = "finish_status")
    String finishStatus;

    public String getCopId() {
        return copId;
    }

    public void setCopId(String copId) {
        this.copId = copId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getCopSex() {
        return copSex;
    }

    public void setCopSex(String copSex) {
        this.copSex = copSex;
    }

    public String getCopName() {
        return copName;
    }

    public void setCopName(String copName) {
        this.copName = copName;
    }

    public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }

    public String getManageArea() {
        return manageArea;
    }

    public void setManageArea(String manageArea) {
        this.manageArea = manageArea;
    }

    public String getFinishStatus() {
        return finishStatus;
    }

    public void setFinishStatus(String finishStatus) {
        this.finishStatus = finishStatus;
    }

    @Override
    public String toString() {
        return FastJsonUtil.toJSONString(this);
    }
}
