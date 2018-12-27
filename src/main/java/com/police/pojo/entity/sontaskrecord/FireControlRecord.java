package com.police.pojo.entity.sontaskrecord;

import com.alibaba.fastjson.annotation.JSONField;
import com.police.pojo.entity.BasePO;
import com.police.pojo.entity.taskinfo.SonTaskPO;

import java.util.Date;

public class FireControlRecord extends BasePO{
    //SonTaskPO sonTaskPO;
    @JSONField(name = "fire_id")
    private String fireId;

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

    @JSONField(name = "f1")
    int f1;

    @JSONField(name = "f2")
    int f2;

    @JSONField(name = "f3")
    int f3;

    @JSONField(name = "f4")
    int f4;

    @JSONField(name = "f5")
    int f5;

    @JSONField(name = "f6")
    int f6;

    @JSONField(name = "f7")
    int f7;

    @JSONField(name = "f8")
    int f8;

    @JSONField(name = "f9")
    int f9;

    @JSONField(name = "f10")
    int f10;

    @JSONField(name = "f11")
    int f11;

    @JSONField(name = "f12")
    int f12;

    @JSONField(name = "f13")
    int f13;

    @JSONField(name = "ft1")
    String ft1;

    @JSONField(name = "ft2")
    String ft2;

    @JSONField(name = "ft3")
    String ft3;

    @JSONField(name = "ft4")
    String ft4;

    @JSONField(name = "ft5")
    String ft5;

    @JSONField(name = "ft6")
    String ft6;

    @JSONField(name = "ft7")
    String ft7;

    @JSONField(name = "ft8")
    String ft8;

    @JSONField(name = "ft9")
    String ft9;

    @JSONField(name = "ft10")
    String ft10;

    @JSONField(name = "ft11")
    String ft11;

    @JSONField(name = "ft12")
    String ft12;

    @JSONField(name = "ft13")
    String ft13;


    public int getF1() {
        return f1;
    }

    public void setF1(int f1) {
        this.f1 = f1;
    }

    public int getF2() {
        return f2;
    }

    public void setF2(int f2) {
        this.f2 = f2;
    }

    public int getF3() {
        return f3;
    }

    public void setF3(int f3) {
        this.f3 = f3;
    }

    public int getF4() {
        return f4;
    }

    public void setF4(int f4) {
        this.f4 = f4;
    }

    public int getF5() {
        return f5;
    }

    public void setF5(int f5) {
        this.f5 = f5;
    }

    public int getF6() {
        return f6;
    }

    public void setF6(int f6) {
        this.f6 = f6;
    }

    public int getF7() {
        return f7;
    }

    public void setF7(int f7) {
        this.f7 = f7;
    }

    public int getF8() {
        return f8;
    }

    public void setF8(int f8) {
        this.f8 = f8;
    }

    public int getF9() {
        return f9;
    }

    public void setF9(int f9) {
        this.f9 = f9;
    }

    public int getF10() {
        return f10;
    }

    public void setF10(int f10) {
        this.f10 = f10;
    }

    public int getF11() {
        return f11;
    }

    public void setF11(int f11) {
        this.f11 = f11;
    }

    public int getF12() {
        return f12;
    }

    public void setF12(int f12) {
        this.f12 = f12;
    }

    public int getF13() {
        return f13;
    }

    public void setF13(int f13) {
        this.f13 = f13;
    }

    public String getFt1() {
        return ft1;
    }

    public void setFt1(String ft1) {
        this.ft1 = ft1;
    }

    public String getFt2() {
        return ft2;
    }

    public void setFt2(String ft2) {
        this.ft2 = ft2;
    }

    public String getFt3() {
        return ft3;
    }

    public void setFt3(String ft3) {
        this.ft3 = ft3;
    }

    public String getFt4() {
        return ft4;
    }

    public void setFt4(String ft4) {
        this.ft4 = ft4;
    }

    public String getFt5() {
        return ft5;
    }

    public void setFt5(String ft5) {
        this.ft5 = ft5;
    }

    public String getFt6() {
        return ft6;
    }

    public void setFt6(String ft6) {
        this.ft6 = ft6;
    }

    public String getFt7() {
        return ft7;
    }

    public void setFt7(String ft7) {
        this.ft7 = ft7;
    }

    public String getFt8() {
        return ft8;
    }

    public void setFt8(String ft8) {
        this.ft8 = ft8;
    }

    public String getFt9() {
        return ft9;
    }

    public void setFt9(String ft9) {
        this.ft9 = ft9;
    }

    public String getFt10() {
        return ft10;
    }

    public void setFt10(String ft10) {
        this.ft10 = ft10;
    }

    public String getFt11() {
        return ft11;
    }

    public void setFt11(String ft11) {
        this.ft11 = ft11;
    }

    public String getFt12() {
        return ft12;
    }

    public void setFt12(String ft12) {
        this.ft12 = ft12;
    }

    public String getFt13() {
        return ft13;
    }

    public void setFt13(String ft13) {
        this.ft13 = ft13;
    }

    public String getFireId() {
        return fireId;
    }

    public void setFireId(String fireId) {
        this.fireId = fireId;
    }

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

    @Override
    public String toString() {
        return "FireControlRecord{" +
                ", fireId='" + fireId + '\'' +
                "sonTaskId='" + sonTaskId + '\'' +
                ", taskId='" + taskId + '\'' +
                ", copId='" + copId + '\'' +
                ", finishTime=" + finishTime +
                ", place='" + place + '\'' +
                ", other='" + other + '\'' +
                ", f1='" + f1 + '\'' +                  //安全疏散通道
                ", f2='" + f2 + '\'' +                   //疏散指示标志
                ", f3='" + f3 + '\'' +                  //应急照明
                ", f4='" + f4 + '\'' +                   //安全出口
                ", f5='" + f5 + '\'' +                  //消防车通道
                ", f6='" + f6 + '\'' +                  //消防水源
                ", f7='" + f7 + '\'' +                  //消防设施、器材、安全标志
                ", f8='" + f8 + '\'' +                  //乱拉线
                ", f9='" + f9 + '\'' +                  //可燃气
                ", f10='" + f10 + '\'' +                 //液化气钢瓶
                ", f11='" + f11 + '\'' +                 //灭火器
                ", f12='" + f12 + '\'' +                  //建筑物安全隐患
                ", f13='" + f13 + '\'' +                    //易燃易爆品
                ", ft1='" + ft1 + '\'' +
                ", ft2='" + ft2 + '\'' +
                ", ft3='" + ft3 + '\'' +
                ", ft4='" + ft4 + '\'' +
                ", ft5='" + ft5 + '\'' +
                ", ft6='" + ft6 + '\'' +
                ", ft7='" + ft7 + '\'' +
                ", ft8='" + ft8 + '\'' +
                ", ft9='" + ft9 + '\'' +
                ", ft10='" + ft10 + '\'' +
                ", ft11='" + ft11 + '\'' +
                ", ft12='" + ft12 + '\'' +
                ", ft13='" + ft13 + '\'' +

                '}';
    }
}
