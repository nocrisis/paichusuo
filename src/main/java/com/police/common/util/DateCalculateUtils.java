package com.police.common.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

public class DateCalculateUtils {

    /**
     * 计算过期日期
     * @param beginAt   计算的起始日期
     * @param effectivePeriod    有效期（日）
     * @param endAt      有效结束时间
     * @return
     */
    public static Date getEndAt(Date beginAt, Integer effectivePeriod, Date endAt) {
        if(null == effectivePeriod || effectivePeriod == 0){
            return endAt;
        }
        Calendar beginAtCalendar = Calendar.getInstance();
        beginAtCalendar.setTime(beginAt);
        beginAtCalendar.add(Calendar.DAY_OF_YEAR, effectivePeriod);
        beginAt = getEndOfDay(beginAtCalendar);
        if(beginAt.after(endAt)){
            return endAt;
        }
        return beginAt;

    }

    public static Date getEndOfDay(Calendar beginAtCalendar){
        beginAtCalendar.set(Calendar.HOUR_OF_DAY, 23);
        beginAtCalendar.set(Calendar.MINUTE, 59);
        beginAtCalendar.set(Calendar.SECOND, 59);
        beginAtCalendar.set(Calendar.MILLISECOND, 0);
        return beginAtCalendar.getTime();
    }

    public static Date getStartOfDay(Date date) {
        LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(date.getTime()), ZoneId.systemDefault());
        LocalDateTime startOfDay = localDateTime.with(LocalTime.MIN);
        return Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
    }

    public static Date getStartAt(Date beginAt, Date verificationStartAt) {
        return verificationStartAt.after(beginAt) ? verificationStartAt : beginAt;
    }
}
