package com.police.common.util;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.joda.time.DateTime;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 时间处理
 *
 * @author caspar.chen
 * @version 1.0
 */

public class DateFormatter {

    private static final Log log = LogFactory.getLog(DateFormatter.class);

    private DateFormatter() {
        throw new IllegalStateException("Utility class");
    }

    public static final String YYYY_MM_DD_HHMMSS = "yyyy-MM-dd HH:mm:ss";
    public static final String YYYY_MM_DD = "yyyy-MM-dd";

    public static final SimpleDateFormat CANONICAL_DATE = new SimpleDateFormat(YYYY_MM_DD);
    public static final SimpleDateFormat CANONICAL_YYYYMM = new SimpleDateFormat("yyyyMM");
    public static final SimpleDateFormat CANONICAL_YYYY = new SimpleDateFormat("yyyy");

    public static String format(Date date, String str) {
        if (null == date || StringUtils.isEmpty(str)) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(str);
        return sdf.format(date);
    }

    public static Date parse(String strDate, String formatStr) {
        if (StringUtils.isEmpty(strDate) || StringUtils.isEmpty(formatStr)) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(formatStr);
        Date date = null;
        try {
            date = sdf.parse(strDate);
        } catch (ParseException e) {
            log.error("转换时间出错", e);
        }
        return date;
    }


    /**
     * 时间格式化
     * @param dataString
     * @return
     */
    public static Date paserYMDHMS(String dataString) {
        return parse(dataString, YYYY_MM_DD_HHMMSS);
    }

 
    public static String transferStartAndEndDateDisplay(Date startDate, Date endDate) {
        return format(startDate, "yyyy年MM月dd日HH:mm") + "-" + format(endDate, "yyyy年MM月dd日HH:mm");
    }


    public static String buildDisplayStartDateAndEndDate(Date startDate, Date endDate) {
        //如果起止年月日相同则，展示为XX月XX日 XX点~ XX点（一天有效）
        DateTime startDateTime = new DateTime(startDate);
        DateTime endDateTime = new DateTime(endDate);
        if (CANONICAL_DATE.format(startDate).equals(CANONICAL_DATE.format(endDate))) {
            return String.format("%s年%s月%s日", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth());
        }

        //如果起止年月相同,起止日不同则，展示为XX月XX日 ~ XX日（多日有效）
        else if (CANONICAL_YYYYMM.format(startDate).equals(CANONICAL_YYYYMM.format(endDate))) {
            return String.format("%s年%s月%s日 至 %s日", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth(),
                    endDateTime.getDayOfMonth());
        }
        //			%s年%s月%s日 ~%s月%s日
        else if (CANONICAL_YYYY.format(startDate).equals(CANONICAL_YYYY.format(endDate))) {
            return String.format("%s年%s月%s日 至 %s月%s日", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth(),
                    endDateTime.getMonthOfYear(), endDateTime.getDayOfMonth());
        }
        //			%s年%s月%s日~%s年%s月%s日
        else {
            return String.format("%s年%s月%s日 至 %s年%s月%s日", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth(),
                    endDateTime.getYear(), endDateTime.getMonthOfYear(), endDateTime.getDayOfMonth());
        }
    }

    public static String buildDisplayStartDateAndEndDateWithLine(Date startDate, Date endDate) {
        return format(startDate, YYYY_MM_DD) + " 至 " + format(endDate, YYYY_MM_DD);
    }

    public static String buildDisplayStartDateAndEndDateToMinutes(Date startDate, Date endDate) {
        //如果起止年月日相同则，展示为XX月XX日 XX点~ XX点（一天有效）
        DateTime startDateTime = new DateTime(startDate);
        DateTime endDateTime = new DateTime(endDate);
        if (CANONICAL_DATE.format(startDate).equals(CANONICAL_DATE.format(endDate))) {
            return String.format("%s年%s月%s日 %s:%s 至 %s:%s", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth(),
                    startDateTime.getHourOfDay(),
                    minuteOfHourDoubleZero(startDateTime.getMinuteOfHour()), endDateTime.getHourOfDay(),
                    minuteOfHourDoubleZero(endDateTime.getMinuteOfHour()));
        }

        //如果起止年月相同,起止日不同则，展示为XX月XX日 ~ XX日（多日有效）
        else if (CANONICAL_YYYYMM.format(startDate).equals(CANONICAL_YYYYMM.format(endDate))) {
            return String.format("%s年%s月%s日 %s:%s 至 %s日 %s:%s", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth(),
                    startDateTime.getHourOfDay(), minuteOfHourDoubleZero(startDateTime.getMinuteOfHour()),
                    endDateTime.getDayOfMonth(), endDateTime.getHourOfDay(),
                    minuteOfHourDoubleZero(endDateTime.getMinuteOfHour()));
        } else if (CANONICAL_YYYY.format(startDate).equals(CANONICAL_YYYY.format(endDate))) {
            return String.format("%s年%s月%s日 %s:%s 至 %s月%s日 %s:%s", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth(),
                    startDateTime.getHourOfDay(), minuteOfHourDoubleZero(startDateTime.getMinuteOfHour()),
                    endDateTime.getMonthOfYear(), endDateTime.getDayOfMonth(), endDateTime.getHourOfDay(),
                    minuteOfHourDoubleZero(endDateTime.getMinuteOfHour()));
        } else {
            return String.format("%s年%s月%s日 %s:%s 至 %s年%s月%s日 %s:%s", startDateTime.getYear(), startDateTime.getMonthOfYear(), startDateTime.getDayOfMonth(),
                    startDateTime.getHourOfDay(), startDateTime.getMinuteOfHour(),
                    endDateTime.getYear(), endDateTime.getMonthOfYear(), endDateTime.getDayOfMonth(),
                    endDateTime.getHourOfDay(), minuteOfHourDoubleZero(endDateTime.getMinuteOfHour()));
        }

    }

    private static String minuteOfHourDoubleZero(int minuteOfHour) {
        if (0 == minuteOfHour) {
            return "00";
        }
        if (String.valueOf(minuteOfHour).length() == 1) {
            return "0" + minuteOfHour;
        }
        return minuteOfHour + "";
    }


}
