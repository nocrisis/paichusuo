package com.police.pojo.entity;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;


public class BasePO {

    @JSONField(name="id")
    protected Integer id;

    @JSONField(name = "created_at",format = "yyyy-MM-dd HH:mm:ss")
    protected Date createdAt;

    @JSONField(name = "created_by")
    private String createdBy;

    @JSONField(name = "update_at",format = "yyyy-MM-dd HH:mm:ss")
    private Date updateAt;

    @JSONField(name = "updated_by")
    private String updatedBy;

    @JSONField(name = "archive")
    private String archive;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updatedAt) {
        this.updateAt = updatedAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public String getArchive() {
        return archive;
    }

    public void setArchive(String archive) {
        this.archive = archive;
    }

}
