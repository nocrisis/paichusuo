package com.police.pojo.entity.copstaff;

import com.alibaba.fastjson.annotation.JSONField;
import com.police.common.util.FastJsonUtil;
import com.police.pojo.entity.BasePO;

import java.util.Date;

public class CopInfoPO extends BasePO {

    @JSONField(name = "cop_id")
    String copId;

    @JSONField(name = "password")
    String password;

    @JSONField(name = "cop_name")
    String copName;

    @JSONField(name = "cop_sex")
    String copSex;

    @JSONField(name = "birthday",format = "yyyy-MM-dd HH:mm:ss")
    Date birthday;

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

    public String getCopName() {
        return copName;
    }

    public void setCopName(String copName) {
        this.copName = copName;
    }

    public String getCopSex() {
        return copSex;
    }

    public void setCopSex(String copSex) {
        this.copSex = copSex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
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
