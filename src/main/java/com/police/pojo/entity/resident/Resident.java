package com.police.pojo.entity.resident;

import com.alibaba.fastjson.annotation.JSONField;
import com.police.pojo.entity.BasePO;

import java.util.Date;

public class Resident extends BasePO {
    @JSONField(name = "cop_id")
    String copId;

    @JSONField(name = "taskId")
    String taskId;

    @JSONField(name = "sonTaskId")
    String sonTaskId;

    @JSONField(name = "village`")
    String village;

    @JSONField(name = "roomNum")
    String roomNum;

    @JSONField(name = "resideInfo")
    int resideInfo;

    @JSONField(name = "focus")
    int focus;

    @JSONField(name = "residenName")
    String residenName;

    @JSONField(name = "residentId")
    String residentId;

    @JSONField(name = "other")
    String other;

    public String getCopId() {
        return copId;
    }

    public void setCopId(String copId) {
        this.copId = copId;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getSonTaskId() {
        return sonTaskId;
    }

    public void setSonTaskId(String sonTaskId) {
        this.sonTaskId = sonTaskId;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getRoomNum() {
        return roomNum;
    }

    public void setRoomNum(String roomNum) {
        this.roomNum = roomNum;
    }

    public int getResideInfo() {
        return resideInfo;
    }

    public void setResideInfo(int resideInfo) {
        this.resideInfo = resideInfo;
    }

    public int getFocus() {
        return focus;
    }

    public void setFocus(int focus) {
        this.focus = focus;
    }

    public String getResidenName() {
        return residenName;
    }

    public void setResidenName(String residenName) {
        this.residenName = residenName;
    }

    public String getResidentId() {
        return residentId;
    }

    public void setResidentId(String residentId) {
        this.residentId = residentId;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
    }
}
