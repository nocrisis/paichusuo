package com.police.pojo.dto.taskinfo;

import com.alibaba.fastjson.annotation.JSONField;
import com.police.common.util.FastJsonUtil;
import com.police.pojo.dto.BasePageableDTO;

import java.util.Date;

public class TaskInfoDTO  extends BasePageableDTO {
    @JSONField(name = "task_id")
    String taskId;

    @JSONField(name = "task_category")
    String taskCategory;

    @JSONField(name = "issue_time")
    Date issueTime;

    @JSONField(name = "deadline")
    Date deadline;

    @JSONField(name = "task_detail")
    String taskDetail;

    @JSONField(name = "task_area")
    String taskArea;

    @JSONField(name = "publisher")
    String publisher;

    @JSONField(name = "finish_status")
    String finishStatus;

    public String getTaskId() { return taskId; }

    public void setTaskId(String taskId) { this.taskId = taskId; }

    public String getTaskCategory() {
        return taskCategory;
    }

    public void setTaskCategory(String taskCategory) {
        this.taskCategory = taskCategory;
    }

    public Date getIssueTime() {
        return issueTime;
    }

    public void setIssueTime(Date issueTime) {
        this.issueTime = issueTime;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getTaskDetail() {
        return taskDetail;
    }

    public void setTaskDetail(String taskDetail) {
        this.taskDetail = taskDetail;
    }

    public String getTaskArea() {
        return taskArea;
    }

    public void setTaskArea(String taskArea) {
        this.taskArea = taskArea;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
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
