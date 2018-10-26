package com.police.common.enums;

public enum TaskCategoryEnum {
    SEXY("扫黄排查"),
    FIRE("消防安全排查"),
    DRUGS("毒品排查"),
    GAMBLE("赌博排查"),
    RESIDENT("户口排查"),
    FOCUS_PEOPLE("重点关注人口排查");

    private String categoryInfo;

    private TaskCategoryEnum( String categoryInfo) {
        this.categoryInfo = categoryInfo;
    }

    public String getCategoryInfo() {
        return categoryInfo;
    }
}
