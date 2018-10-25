package com.police.common.util;


import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 时间处理
 *
 * @author caspar.chen
 * @version 1.0
 */

public class DateFormart {

    private DateFormart() {

    }


    public static String format(Date date, String str) {
        if (null == date || StringUtils.isEmpty(str)) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(str);
        return sdf.format(date);
    }

    public static String buildDisplayStartDateAndEndDateToMinutes(Date startDate, Date endDate) {
        SimpleDateFormat CANONICAL_DATE = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat CANONICAL_YYYYMM = new SimpleDateFormat("yyyyMM");
        SimpleDateFormat CANONICAL_YYYY = new SimpleDateFormat("yyyy");

        //如果起止年月日相同则，展示为XX月XX日 XX点~ XX点（一天有效）
        DateTime startDateTime = new DateTime(startDate);
        DateTime endDateTime = new DateTime(endDate);
        if (CANONICAL_DATE.format(startDate).equals(CANONICAL_DATE.format(endDate))) {
            return String.format("%s年%s月%s日 %s:%s 至 %s:%s", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth(),
                    minuteOfHourDoubleZero(startDateTime.getHourOfDay()),
                    minuteOfHourDoubleZero(startDateTime.getMinuteOfHour()), minuteOfHourDoubleZero(endDateTime.getHourOfDay()),
                    minuteOfHourDoubleZero(endDateTime.getMinuteOfHour()));
        }

        //如果起止年月相同,起止日不同则，展示为XX月XX日 ~ XX日（多日有效）
        else if (CANONICAL_YYYYMM.format(startDate).equals(CANONICAL_YYYYMM.format(endDate))) {
            return String.format("%s年%s月%s日 %s:%s 至 %s日 %s:%s", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth(),
                    minuteOfHourDoubleZero(startDateTime.getHourOfDay()),
                    minuteOfHourDoubleZero(startDateTime.getMinuteOfHour()),
                    endDateTime.getDayOfMonth(),
                    minuteOfHourDoubleZero(endDateTime.getHourOfDay()),
                    minuteOfHourDoubleZero(endDateTime.getMinuteOfHour()));
        } else if (CANONICAL_YYYY.format(startDate).equals(CANONICAL_YYYY.format(endDate))) {
            return String.format("%s年%s月%s日 %s:%s 至 %s月%s日 %s:%s", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth(),
                    minuteOfHourDoubleZero(startDateTime.getHourOfDay()),
                    minuteOfHourDoubleZero(startDateTime.getMinuteOfHour()),
                    endDateTime.getMonthOfYear(), endDateTime.getDayOfMonth(),
                    minuteOfHourDoubleZero(endDateTime.getHourOfDay()),
                    minuteOfHourDoubleZero(endDateTime.getMinuteOfHour()));
        } else {
            return String.format("%s年%s月%s日 %s:%s 至 %s年%s月%s日 %s:%s", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth(),
                    minuteOfHourDoubleZero(startDateTime.getHourOfDay()),
                    minuteOfHourDoubleZero(startDateTime.getMinuteOfHour()),
                    endDateTime.getYear(), endDateTime.getMonthOfYear(),
                    endDateTime.getDayOfMonth(),
                    minuteOfHourDoubleZero(endDateTime.getHourOfDay()),
                    minuteOfHourDoubleZero(endDateTime.getMinuteOfHour()));
        }
    }

    private static String minuteOfHourDoubleZero(int minuteOfHour) {
        if (0 == minuteOfHour) {
            return "00";
        }
        if (String.valueOf(minuteOfHour).length() == 1) {
            return "0" + minuteOfHour;
        }
        return String.valueOf(minuteOfHour);
    }


}
