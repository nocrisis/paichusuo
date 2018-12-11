package com.police.pojo.dto.taskinfo;

import com.alibaba.fastjson.annotation.JSONField;
import com.police.pojo.dto.BasePageableDTO;

import java.util.Date;

public class SonTaskDTO extends BasePageableDTO {
    @JSONField(name = "son_task_id")
    private String sonTaskId;

    @JSONField(name = "task_id")
    private String taskId;

    @JSONField(name = "task_category")
    private  String taskCategory;

    @JSONField(name = "task_detail")
    private String taskDetail;

    @JSONField(name = "cop_id")
    private String copId;

    @JSONField(name = "cop_name")
    private String copName;

    @JSONField(name = "task_area")
    private String taskArea;

    @JSONField(name = "place")
    private String place;

    @JSONField(name = "deadline")
    private Date deadline;

    @JSONField(name = "delay_deadline")
    private Date delayDeadline;

    @JSONField(name = "finish_time")
    private Date finishTime;

    @JSONField(name = "finish_status")
    private String finishStatus;

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

    public String getTaskCategory() {
        return taskCategory;
    }

    public void setTaskCategory(String taskCategory) {
        this.taskCategory = taskCategory;
    }

    public String getTaskDetail() {
        return taskDetail;
    }

    public void setTaskDetail(String taskDetail) {
        this.taskDetail = taskDetail;
    }

    public String getCopId() {
        return copId;
    }

    public void setCopId(String copId) {
        this.copId = copId;
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

    public Date getDeadline() { return deadline; }

    public void setDeadline(Date deadline) { this.deadline = deadline; }

    public Date getDelayDeadline() { return delayDeadline; }

    public void setDelayDeadline(Date delayDeadline) { this.delayDeadline = delayDeadline; }

    public Date getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(Date finishTime) {
        this.finishTime = finishTime;
    }

    public String getFinishStatus() { return finishStatus; }

    public void setFinishStatus(String finishStatus) { this.finishStatus = finishStatus; }

    public String getCopName() {
        return copName;
    }

    public void setCopName(String copName) {
        this.copName = copName;
    }

    @Override
    public String toString() {
        return "SonTaskDTO{" +
                "sonTaskId='" + sonTaskId + '\'' +
                ", taskId='" + taskId + '\'' +
                ", taskCategory='" + taskCategory + '\'' +
                ", taskDetail='" + taskDetail + '\'' +
                ", copId='" + copId + '\'' +
                ", copName='" + copName + '\'' +
                ", taskArea='" + taskArea + '\'' +
                ", place='" + place + '\'' +
                ", deadline=" + deadline +
                ", delayDeadline=" + delayDeadline +
                ", finishTime=" + finishTime +
                ", finishStatus='" + finishStatus + '\'' +
                '}';
    }
}
