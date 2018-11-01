package com.police.common.enums;

public enum TaskFinishStatusEnum {
    TODO("待执行"),
    DOING("执行中"),
    INTERRUPTED("被中断"),
    DELAYED("被延迟"),
    FINISHED("已完成");

    private String stateInfo;

    private TaskFinishStatusEnum( String stateInfo) {
        this.stateInfo = stateInfo;
    }

    public String getStateInfo() {
        return stateInfo;
    }

}
