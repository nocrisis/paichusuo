package com.police.pojo.entity.sontaskrecord;

import com.alibaba.fastjson.annotation.JSONField;
import com.police.pojo.entity.BasePO;

import java.util.Date;

public class GamblingRecord extends BasePO {
    @JSONField(name = "son_task_id")
    private String sonTaskId;

    @JSONField(name = "task_id")
    private String taskId;

    @JSONField(name = "cop_id")
    private String copId;

    @JSONField(name = "place")
    private String place;

    @JSONField(name = "finish_time",format = "yyyy-MM-dd HH:mm:ss")
    private Date finishTime;

    @JSONField(name = "other")
    private String other;

    @JSONField(name = "gamblenum")
    private String gambleNum;

    @JSONField(name = "gambleamount")
    private String gambleAmount;

    public String getSonTaskId() {
        return sonTaskId;
    }

    public void setSonTaskId(String sonTaskId) {
        this.sonTaskId = sonTaskId;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getCopId() {
        return copId;
    }

    public void setCopId(String copId) {
        this.copId = copId;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Date getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(Date finishTime) {
        this.finishTime = finishTime;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
    }

    public String getGambleNum() {
        return gambleNum;
    }

    public void setGambleNum(String gambleNum) {
        this.gambleNum = gambleNum;
    }

    public String getGambleAmount() {
        return gambleAmount;
    }

    public void setGambleAmount(String gambleAmount) {
        this.gambleAmount = gambleAmount;
    }
}
