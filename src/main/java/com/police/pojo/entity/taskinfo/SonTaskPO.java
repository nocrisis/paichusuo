package com.police.pojo.entity.taskinfo;

import com.alibaba.fastjson.annotation.JSONField;
import com.police.pojo.entity.BasePO;


public class SonTaskPO extends BasePO {

    @JSONField(name = "cop_id")
    private String copId;

    @JSONField(name = "task_id")
    private String taskId;

    @JSONField(name = "son_task_id")
    private String sonTaskId;

    @JSONField(name = "task_area")
    private String taskArea;

    @JSONField(name = "place")
    private String place;

    @JSONField(name = "finish_time")
    private String finishTime;

    @JSONField(name = "is_finish")
    private String isFinish;

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

    public String getTaskArea() {
        return taskArea;
    }

    public void setTaskArea(String taskArea) {
        this.taskArea = taskArea;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(String finishTime) {
        this.finishTime = finishTime;
    }

    public String getIsFinish() {
        return isFinish;
    }

    public void setIsFinish(String isFinish) {
        this.isFinish = isFinish;
    }

    @Override
    public String toString() {
        return "SonTaskDTO{" +
                ", copId='" + copId + '\'' +
                ", taskId='" + taskId + '\'' +
                ", sonTaskId='" + sonTaskId + '\'' +
                ", taskArea='" + taskArea + '\'' +
                ", place='" + place + '\'' +
                ", finishTime='" + finishTime + '\'' +
                ", isFinish='" + isFinish + '\'' +
                '}';
    }
}
