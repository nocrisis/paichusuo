package com.police.common.util;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateUtils {

    public static Date getStartTimeOfDay(Date date) {
        Calendar day = Calendar.getInstance();
        day.setTime(date);
        day.set(Calendar.HOUR_OF_DAY, 0);
        day.set(Calendar.MINUTE, 0);
        day.set(Calendar.SECOND, 0);
        day.set(Calendar.MILLISECOND, 0);

        return day.getTime();
    }

    public static boolean isNowBetweenDateRange(Date start, Date end) {
        Date now = new Date();
        return now.after(start) && now.before(end);
    }
    
    public static boolean isDatePassed(Date date) {
    		Date now = new Date();
    		return now.after(date);
    }


    /**
     * 把一个日期按分为单位的单位推迟或提前
     *
     * @param date    日期
     * @param minutes 延期 的分钟数， 正整数往后推,负数往前移动
     * @return
     */
    public static Date postponeMinutes(Date date, int minutes) {
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        calendar.add(Calendar.MINUTE, minutes);
        return calendar.getTime();
    }

    /**
     * 把一个日期按天的单位推迟或提前
     *
     * @param date 日期
     * @param days 延期 的天数， 正整数往后推,负数往前移动
     * @return
     */
    public static Date postponeDay(Date date, int days) {
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, days);
        return calendar.getTime();
    }
}
