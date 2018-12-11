package com.police.pojo.dto.taskinfo;

import com.alibaba.fastjson.annotation.JSONField;
import com.police.common.util.FastJsonUtil;
import com.police.pojo.dto.BasePageableDTO;
import org.springframework.stereotype.Service;

import java.util.Date;

public class TaskInfoDTO  extends BasePageableDTO {
    @JSONField(name = "task_id")
    private String taskId;

    @JSONField(name = "task_category")
    private  String taskCategory;

    @JSONField(name = "issue_start_at")
    private Date issueStartAt;

    @JSONField(name = "issue_end_at")
    private Date issueEndAt;

    @JSONField(name = "deadline_start_at")
    private Date deadlineStartAt;

    @JSONField(name = "deadline_end_at")
    private Date deadlineEndAt;


    @JSONField(name = "task_detail")
    private String taskDetail;

    @JSONField(name = "task_area")
    private String taskArea;

    @JSONField(name = "publisher")
    private String publisher;

    @JSONField(name = "finish_status")
    private String finishStatus;

    @JSONField(name = "allocate_status")
    private int allocateStatus;


    public String getTaskId() { return taskId; }

    public void setTaskId(String taskId) { this.taskId = taskId; }

    public String getTaskCategory() {
        return taskCategory;
    }

    public void setTaskCategory(String taskCategory) {
        this.taskCategory = taskCategory;
    }

    public Date getIssueStartAt() {
        return issueStartAt;
    }

    public void setIssueStartAt(Date issueStartAt) {
        this.issueStartAt = issueStartAt;
    }

    public Date getIssueEndAt() {
        return issueEndAt;
    }

    public void setIssueEndAt(Date issueEndAt) {
        this.issueEndAt = issueEndAt;
    }

    public Date getDeadlineStartAt() {
        return deadlineStartAt;
    }

    public void setDeadlineStartAt(Date deadlineStartAt) {
        this.deadlineStartAt = deadlineStartAt;
    }

    public Date getDeadlineEndAt() {
        return deadlineEndAt;
    }

    public void setDeadlineEndAt(Date deadlineEndAt) {
        this.deadlineEndAt = deadlineEndAt;
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

    public int getAllocateStatus() { return allocateStatus; }

    public void setAllocateStatus(int allocateStatus) { this.allocateStatus = allocateStatus; }

    @Override
    public String toString() {
        return FastJsonUtil.toJSONString(this);
    }
}
